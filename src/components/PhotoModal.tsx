// PhotoModal.tsx
import React from "react";
import { Dialog, GlobalStyles } from "@mui/material";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { DataType } from "react-photo-view/dist/types";
import { useTheme } from "@mui/material/styles";

type PhotoModalProps = {
    onClose: () => void;
    photos: string[];
    text: string;
};

export const PhotoModal: React.FC<PhotoModalProps> = ({ onClose, photos, text }) => {
    const theme = useTheme();

    const images: DataType[] = photos.map((photo, index) => ({ key: index, src: photo }));

    const customStyles = {
        ".PhotoView__PhotoWrap": {
            backgroundColor: theme.palette.background.default,
        },
    };

    return (
        <>
            <GlobalStyles styles={customStyles} />
            <Dialog
                fullScreen
                open={photos.length > 0}
                onClose={onClose}
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
            >
                <PhotoSlider
                    images={images}
                    toolbarRender={() => text}
                    visible={true}
                    onClose={onClose}
                />
            </Dialog>
        </>
    );
};
