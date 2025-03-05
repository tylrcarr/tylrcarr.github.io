import React from "react";
import {Container, Typography} from "@mui/material";
import {DogPhotoGallery} from "../components/DogPhotoGallery";

export const DogsPage: React.FC = () => {
    return (
        <div style={{height: "100dvh", overflowY: "auto"}}>
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    dogs (click for higher res)
                </Typography>
                <DogPhotoGallery/>
            </Container>
        </div>
    );
};
