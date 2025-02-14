// src/redux/sagas/markersSaga.ts

import { all, call, put, takeLatest } from 'redux-saga/effects';
import imageCompression from 'browser-image-compression';
import { addMarker, setMarkers } from '../slices/markersSlice';
import { LatLng, LeafletMarker } from '../../types/Leaflet';
import { supabase } from '../../supabaseClient';

// Action type constants
export const FETCH_MARKERS_REQUEST = 'markers/fetchMarkersRequest';
export const ADD_MARKER_REQUEST = 'markers/addMarkerRequest';
export const ADD_MARKER_FAILURE = 'markers/addMarkerFailure';

// Action creators
export const fetchMarkersRequest = () => ({ type: FETCH_MARKERS_REQUEST });

export const addMarkerRequest = (payload: {
    content: string; // base64 PNG string
    position: LatLng;
    author?: string; // New field: author (default is anonymous)
}) => ({
    type: ADD_MARKER_REQUEST,
    payload,
});

export const addMarkerFailure = (error: string) => ({
    type: ADD_MARKER_FAILURE,
    payload: error,
});

// Helper: Convert a base64 data URL to a Blob
export function dataURLtoBlob(dataUrl: string): Blob {
    const [header, base64Data] = dataUrl.split(',');
    const mimeMatch = header.match(/:(.*?);/);
    if (!mimeMatch) {
        throw new Error('Invalid data URL');
    }
    const mime = mimeMatch[1];
    const binary = atob(base64Data);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
}

// Helper: Get image dimensions from a Blob
export function getImageDimensions(blob: Blob): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = URL.createObjectURL(blob);
    });
}

// Worker saga: Fetch markers from Supabase
export function* fetchMarkers() {
    try {
        const { data, error } = yield call(() => supabase.from('markers').select('*'));
        if (error) {
            yield put({ type: 'markers/fetchMarkersFailure', payload: error.message });
        } else {
            const markers: LeafletMarker[] = data.map((item: any) => ({
                id: item.id,
                height: item.height,
                width: item.width,
                content: item.content,
                position: [item.lat, item.lng],
                author: item.author,
                created_at: item.created_at,
            }));
            yield put(setMarkers(markers));
        }
    } catch (err: any) {
        yield put({ type: 'markers/fetchMarkersFailure', payload: err.message });
    }
}

// Worker saga: Compress, upload image, and insert marker into Supabase
export function* addMarkerSaga(action: ReturnType<typeof addMarkerRequest>) {
    try {
        const { content, position, author } = action.payload;
        const BUCKET_NAME = 'tylrcarr';
        const FILE_PATH = `images/${Date.now()}.png`;
        const MAX_DIMENSION = 200;

        // 1. Convert base64 string to Blob
        const originalBlob: Blob = dataURLtoBlob(content);
        // 2. Convert Blob to File (needed by imageCompression)
        const originalFile = new File([originalBlob], 'temp.png', {
            type: originalBlob.type,
            lastModified: Date.now(),
        });
        // 3. Compress the image using browser-image-compression
        const compressionOptions = {
            maxWidthOrHeight: MAX_DIMENSION,
            useWebWorker: true,
        };
        const compressedFile: File = yield call(
            imageCompression,
            originalFile,
            compressionOptions
        );
        // 4. Get new image dimensions for proper rendering
        const { width, height } = yield call(getImageDimensions, compressedFile);
        // 5. Upload the compressed image to Supabase Storage
        const { error: uploadError } = yield call(() =>
            supabase.storage.from(BUCKET_NAME).upload(FILE_PATH, compressedFile)
        );
        if (uploadError) {
            yield put(addMarkerFailure(uploadError.message));
            return;
        }
        // 6. Retrieve public URL for the uploaded image (synchronous)
        const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(FILE_PATH);
        const publicUrl = urlData.publicUrl;
        // 7. Build the marker payload (do not include id; Supabase auto-generates it)
        const newMarkerPayload = {
            height,
            width,
            content: publicUrl,
            lat: position[0],
            lng: position[1],
            author: author || 'anonymous', // use provided author or default
        };
        // 8. Insert the marker into Supabase and retrieve the inserted row
        const { data: insertedData, error: insertError } = yield call(() =>
            supabase.from('markers').insert(newMarkerPayload).select()
        );
        if (insertError) {
            yield put(addMarkerFailure(insertError.message));
            return;
        }
        const insertedMarker = insertedData[0];
        const newMarker: LeafletMarker = {
            id: insertedMarker.id,
            height: insertedMarker.height,
            width: insertedMarker.width,
            content: insertedMarker.content,
            position: [insertedMarker.lat, insertedMarker.lng],
            author: insertedMarker.author,
            created_at: insertedMarker.created_at,
        };
        // 9. Update Redux state using the slice action
        yield put(addMarker(newMarker));
    } catch (error: any) {
        yield put(addMarkerFailure(error.message));
    }
}

// Root saga: Combine watchers
export function* markersSaga() {
    yield all([
        takeLatest(FETCH_MARKERS_REQUEST, fetchMarkers),
        takeLatest(ADD_MARKER_REQUEST, addMarkerSaga),
    ]);
}
