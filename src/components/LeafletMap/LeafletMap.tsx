// src/components/LeafletMap/index.tsx

import React from 'react';
import {ImageOverlay, MapContainer, Rectangle, TileLayer, useMapEvents, ZoomControl,} from 'react-leaflet';
import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import L, {LeafletMouseEvent} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {LeafletMarker} from '../../types/Leaflet';

// Fix for default icon issues in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapWrapper = styled(Box)(({theme}) => ({
    height: '100vh',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        height: '50vh',
    },
}));

// Component to handle map click events
const MapClickHandler: React.FC<{ onMapClick: (e: LeafletMouseEvent) => void }> = ({
                                                                                       onMapClick,
                                                                                   }) => {
    useMapEvents({
        click: onMapClick,
    });
    return null;
};

// Helper to calculate image bounds (you may adjust this if needed)
function calculateImageBounds(
    center: [number, number],
    widthDegrees: number,
    heightDegrees: number
): [[number, number], [number, number]] {
    const [lat, lng] = center;
    const southWest: [number, number] = [lat - heightDegrees / 2, lng - widthDegrees / 2];
    const northEast: [number, number] = [lat + heightDegrees / 2, lng + widthDegrees / 2];
    return [southWest, northEast];
}

export const LeafletMap: React.FC<{
    markers?: LeafletMarker[];
    onMapClick?: (e: LeafletMouseEvent) => void;
    backgroundImageUrl?: string;
}> = ({markers = [], onMapClick, backgroundImageUrl}) => {
    return (
        <MapWrapper>
            <MapContainer
                center={[0, 0]}
                zoom={0}
                crs={L.CRS.Simple}
                maxBounds={[[-2500, -2500], [2500, 2500]]}
                maxBoundsViscosity={1.0}
                style={{height: '100%', width: '100%'}}
                zoomControl={false}
                minZoom={-2}
            >
                <ZoomControl position="bottomright" />
                {/* Background image overlay */}
                {backgroundImageUrl && (
                    <TileLayer
                        minZoom={-2}
                        url={backgroundImageUrl}
                        bounds={[[-3000, -3000], [3000, 3000]]}
                    />
                )}
                <Rectangle
                    bounds={[[-3000, -3000], [3000, 3000]]}
                    pathOptions={{color: 'saddlebrown', fill: false, stroke: true, weight: 50}}
                />

                {markers.map((marker) => {
                    const bounds = calculateImageBounds(marker.position, marker.width, marker.height);
                    return (
                        <ImageOverlay
                            interactive
                            key={marker.id}
                            url={marker.content}
                            bounds={bounds}
                            eventHandlers={{
                                mouseover: (e) => {
                                    const tooltipContent = `<div style="text-align:center;">
                      <strong>Author:</strong> ${marker.author}<br/>
                    <strong>Date:</strong> ${new Date(marker.created_at).toLocaleString()}
                  </div>`;
                                    // Bind and open the tooltip on hover
                                    e.target.bindTooltip(tooltipContent, {
                                        direction: 'top',
                                        offset: [0, -10],
                                        opacity: 0.9,
                                    }).openTooltip();
                                },
                                mouseout: (e) => {
                                    // Close and unbind the tooltip on mouse out
                                    e.target.closeTooltip();
                                    e.target.unbindTooltip();
                                },
                            }}
                        />
                    );
                })}

                {onMapClick && <MapClickHandler onMapClick={onMapClick} />}
            </MapContainer>
        </MapWrapper>
    );
};
