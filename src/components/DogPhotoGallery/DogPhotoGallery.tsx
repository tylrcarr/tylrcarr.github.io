import React, {useState} from "react";
import Masonry from "react-masonry-css";
import Box from "@mui/material/Box";
import {PhotoModal} from "../PhotoModal";
import {useDogPhotos} from "../../hooks/use-dog-photos.hook";
import "./DogPhotoGallery.css";

export const DogPhotoGallery: React.FC = () => {
    const dogPhotos = useDogPhotos();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleOpenModal = (index: number) => setSelectedIndex(index);
    const handleCloseModal = () => setSelectedIndex(null);

    const breakpointColumns = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    return (
        <Box sx={{p: 0, m: 0}}>
            <Masonry
                breakpointCols={breakpointColumns}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {dogPhotos
                    .map((photo, index) => (
                        <Box
                            key={index}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {opacity: 0.9, transition: "opacity 0.3s"},
                            }}
                            onClick={() => handleOpenModal(index)}
                        >
                            <img
                                src={`/public-photos/${photo.thumbnail}`}
                                alt={`Dog ${index}`}
                                width={photo.thumbnailWidth}
                                height={photo.thumbnailHeight}
                                style={{
                                    display: "block",
                                    borderRadius: "4px",
                                    margin: 0,
                                    objectFit: "cover",
                                }}
                                loading="lazy"
                            />
                        </Box>
                    ))}
            </Masonry>

            {selectedIndex !== null && (
                <PhotoModal
                    onClose={handleCloseModal}
                    photos={dogPhotos.map((photo) => `/public-photos/${photo.full}`)}
                    selectedIndex={selectedIndex}
                />
            )}
        </Box>
    );
};
