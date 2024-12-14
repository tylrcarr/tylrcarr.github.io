import React from "react";
import {AppRoute} from "../hooks/use-router.hook";
import {HomePage} from "../pages/HomePage";
import {PhotosPage} from "../pages/PhotosPage";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PersonIcon from '@mui/icons-material/Person';
import HouseIcon from '@mui/icons-material/House';
import {ArtPage} from "../pages/ArtPage";
import {Build, MusicNote} from "@mui/icons-material";
import {MusicPage} from "../pages/MusicPage";
import {ToolsPage} from "../pages/ToolsPage";

const HOME_ROUTE: AppRoute = {
    id: "home",
    path: "/",
    label: "Home",
    icon: <HouseIcon />,
    element: <HomePage />,
};

const PHOTOS_ROUTE: AppRoute = {
    id: "photos",
    path: "/photos",
    label: "Photos",
    icon: <PhotoCameraIcon />,
    element: <PhotosPage />,
    hideFromMainNav: true
};

const ME_ROUTE: AppRoute = {
    id: "me",
    path: "/me",
    label: "Me",
    icon: <PersonIcon />, // Change this to another icon if you'd like
    element: <ArtPage />, // Assuming this is the component you'd still like to use
};

const MUSIC_ROUTE: AppRoute = {
    id: "music",
    path: "/music",
    label: "Music",
    icon: <MusicNote />,
    element: <MusicPage />,
    hideFromMainNav: true
};


const TOOLS_ROUTE: AppRoute = {
    id: "tools",
    path: "/tools",
    label: "Tools",
    icon: <Build />,
    element: <ToolsPage />,
    hideFromMainNav: true
};

// const ABOUT_ROUTE: AppRoute = {
//     id: "about",
//     path: "/about",
//     label: "About Me",
//     icon: <ContactPageIcon />,
//     element: <AboutPage />,
// }

const ROUTES: AppRoute[] = [
    HOME_ROUTE,
    PHOTOS_ROUTE,
    ME_ROUTE,
    MUSIC_ROUTE,
    TOOLS_ROUTE,
    // ABOUT_ROUTE
];

export {ROUTES, HOME_ROUTE};
