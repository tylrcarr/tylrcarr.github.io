import React from "react";
import {Dialog,} from "@mui/material";
import {PhotoSlider} from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import {DataType} from "react-photo-view/dist/types";

type PhotoModalProps = {
    onClose: () => void;
    photos: string[];
    text: string;
};

export const PhotoModal: React.FC<PhotoModalProps> = ({onClose, photos, text}) => {

    const images: DataType[] = photos.map((photo, index) => ({key: index, src: photo}));
    return (
        <Dialog fullScreen open={!!photos} onClose={onClose}>
            <PhotoSlider
                images={images}
                toolbarRender={() => text}
                visible={true}
                onClose={onClose}
            />

        </Dialog>
    );
};
