// src/containers/BulletinBoardContainer.tsx

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LeafletMap} from '../components/LeafletMap';
import {RootState} from '../redux/store';
import {Box, Typography} from '@mui/material';
import {addMarkerRequest, fetchMarkersRequest} from "../redux/sagas/markersSaga";
import {LatLng} from "../types/Leaflet";
import {DrawingModal, GeneratedImage} from "../components/DrawingModal";
import {BackButton} from "../components/BackButton";

export const BulletinBoardContainer: React.FC = () => {
    const dispatch = useDispatch();
    const markers = useSelector((state: RootState) => state.markers.markers);
    const [clickLocation, setClickLocation] = useState<LatLng | null>(null);

    useEffect(() => {
        // Dispatch action to fetch markers when the component mounts
        dispatch(fetchMarkersRequest());
    }, [dispatch]);

    const handleMapClick = (e: L.LeafletMouseEvent) => {
        setClickLocation([e.latlng.lat, e.latlng.lng]);
    };

    const onDrawingSave = (newMarkerData: GeneratedImage) => {
        if (clickLocation) {
            dispatch(addMarkerRequest({
                position: clickLocation,
                ...newMarkerData
            }));
        }
    }

    return (
        <Box sx={{height: '100vh', width: '100%', position: 'relative'}}>
            <DrawingModal onClose={() => setClickLocation(null)} open={!!clickLocation} onSave={onDrawingSave} />
            {!clickLocation && (<Box sx={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                zIndex: 9999,
                backgroundColor: "saddlebrown",
            }}>
                <Box sx={{position: 'absolute', left: 0}}>
                    <BackButton />
                </Box>
                <Typography variant="h4" align="center">
                    Bulletin Board
                </Typography>
            </Box>)}

            <div style={{width: "100vw"}}>
                <LeafletMap
                    markers={markers}
                    onMapClick={handleMapClick}
                    backgroundImageUrl={"/public-photos/assets/cork.jpg"}
                />
            </div>
        </Box>
    );
};
