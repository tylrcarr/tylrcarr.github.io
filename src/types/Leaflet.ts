// Define Marker Types
export type MarkerType = 'note' | 'image' | 'drawing';

// Define LatLng type
export type LatLng = [number, number];


// Define the Marker interface using type
export type LeafletMarker = {
    id: string;
    height: number;
    width: number;
    content: string;
    position: [number, number];
    author: string;
    created_at: string;
};

