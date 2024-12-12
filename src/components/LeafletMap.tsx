import React, { useEffect, useRef } from "react";
import L from "leaflet";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// noinspection TypeScriptValidateTypes
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

type LeafletMapProps = {
    lat: number;
    lng: number;
    zoom?: number;
    popupText?: string;
};

export const LeafletMap: React.FC<LeafletMapProps> = ({
                                                          lat,
                                                          lng,
                                                          zoom = 15,
                                                          popupText = "Photo taken here!",
                                                      }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // If map already exists, clean it up
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }

        // Initialize the map
        const map = L.map(mapRef.current).setView([lat, lng], zoom);
        mapInstanceRef.current = map;

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add Marker
        const marker = L.marker([lat, lng]);
        if (popupText) {
            marker.bindPopup(popupText);
        }
        marker.addTo(map);

        return () => {
            // Clean up the map instance
            map.remove();
            mapInstanceRef.current = null;
        };
    }, [lat, lng, zoom, popupText]);

    return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
};
