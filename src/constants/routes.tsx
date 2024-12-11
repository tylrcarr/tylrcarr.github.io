import React from "react";
import {Route} from "../hooks/use-router.hook";
import {HomePage} from "../pages/HomePage";
import {PhotosPage} from "../pages/PhotosPage";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import HouseIcon from '@mui/icons-material/House';
import BuildIcon from '@mui/icons-material/Build';
import {ToolsPage} from "../pages/ToolsPage";
import {AboutPage} from "../pages/AboutPage";
import ContactPageIcon from '@mui/icons-material/ContactPage';

const HOME_ROUTE: Route = {
    id: "home",
    label: "Home",
    icon: <HouseIcon />,
    render: () => <HomePage />,
};

const PHOTOS_ROUTE: Route = {
    id: "photos",
    label: "Photos",
    icon: <PhotoCameraIcon />,
    render: () => <PhotosPage />,
};

const TOOLS_ROUTE: Route = {
    id: "tools",
    label: "Tools",
    icon: <BuildIcon />,
    render: () => <ToolsPage />,
};
const ABOUT_ROUTE: Route = {
    id: "about",
    label: "About Me",
    icon: <ContactPageIcon />,
    render: () => <AboutPage />,
}

const ROUTES: Route[] = [
    HOME_ROUTE,
    PHOTOS_ROUTE,
    // TOOLS_ROUTE,
    ABOUT_ROUTE
];

export {ROUTES, HOME_ROUTE};
