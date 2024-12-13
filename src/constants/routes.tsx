import React from "react";
import {AppRoute} from "../hooks/use-router.hook";
import {HomePage} from "../pages/HomePage";
import {PhotosPage} from "../pages/PhotosPage";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import HouseIcon from '@mui/icons-material/House';
import BuildIcon from '@mui/icons-material/Build';
import {ToolsPage} from "../pages/ToolsPage";
import {AboutPage} from "../pages/AboutPage";
import ContactPageIcon from '@mui/icons-material/ContactPage';

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
};


// const TOOLS_ROUTE: AppRoute = {
//     id: "tools",
//     path: "/tools",
//     label: "Tools",
//     icon: <BuildIcon />,
//     element: <ToolsPage />,
// };
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
    // TOOLS_ROUTE,
    // ABOUT_ROUTE
];

export {ROUTES, HOME_ROUTE};
