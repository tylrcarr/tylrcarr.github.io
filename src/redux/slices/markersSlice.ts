// src/redux/slices/markersSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {LeafletMarker} from "../../types/Leaflet";



// Define the MarkersState type
export type MarkersState = {
    markers: LeafletMarker[];
};

// Initialize the state
const initialState: MarkersState = {
    markers: [],
};

// Create the slice
const markersSlice = createSlice({
    name: 'markers',
    initialState,
    reducers: {
        addMarker: (state, action: PayloadAction<LeafletMarker>) => {
            state.markers.push(action.payload);
        },
        removeMarker: (state, action: PayloadAction<string>) => {
            state.markers = state.markers.filter(marker => marker.id !== action.payload);
        },
        updateMarker: (state, action: PayloadAction<LeafletMarker>) => {
            const index = state.markers.findIndex(marker => marker.id === action.payload.id);
            if (index !== -1) {
                state.markers[index] = action.payload;
            }
        },
        setMarkers: (state, action: PayloadAction<LeafletMarker[]>) => {
            state.markers = action.payload;
        },
    },
});

// Export actions
export const { addMarker, removeMarker, updateMarker, setMarkers } = markersSlice.actions;

// Export reducer
export const markersReducer = markersSlice.reducer;
