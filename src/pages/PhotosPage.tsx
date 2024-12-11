import React, { useMemo, useState } from "react";
import { usePhotosLedger } from "../hooks/use-photos-ledger.hook";
import { ImageGallery } from "../components/ImageGallery";
import { PhotoModal } from "../components/PhotoModal";

export const PhotosPage = () => {
    const [dateToView, setDateToView] = useState<string | null>(null);
    const ledger = usePhotosLedger();

    const handleOpen = (date: string) => {
        setDateToView(date);
    };

    const handleClose = () => {
        setDateToView(null);
    };

    // Memoize the photo URLs to avoid unnecessary recalculations
    const photos = useMemo(
        () => (dateToView ? ledger[dateToView].files.map((file) => `/public-photos/${dateToView}/${file}`) : []),
        [dateToView, ledger]
    );

    // Memoize the text description
    const text = useMemo(
        () => (dateToView ? ledger[dateToView].text : ""),
        [dateToView, ledger]
    );

    return (
        <>
            <ImageGallery ledger={ledger} onImageClick={handleOpen} />
            {dateToView && (
                <PhotoModal
                    onClose={handleClose}
                    photos={photos} // Memoized photos
                    text={text} // Memoized text
                />
            )}
        </>
    );
};
