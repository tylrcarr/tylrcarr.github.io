import {useEffect, useMemo, useState} from "react";

type DogPhoto = {
    thumbnail: string;
    thumbnailWidth: number;
    thumbnailHeight: number;
    full: string;
    fullWidth: number;
    fullHeight: number;
};

export const useDogPhotos = () => {
    const [dogPhotos, setDogPhotos] = useState<DogPhoto[]>([]);

    useEffect(() => {
        fetch("/public-photos/dogs/photos.json") // Adjust the path if needed
            .then((res) => res.json())
            .then((data: DogPhoto[]) => setDogPhotos(data))
            .catch((err) => console.error("Error fetching dog photos:", err));
    }, []);

    return useMemo(
        () => [...dogPhotos].sort((a, b) => b.thumbnail.localeCompare(a.thumbnail)),
        [dogPhotos]
    );
};