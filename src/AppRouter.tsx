import React, {FC} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {ROUTES} from "./constants/routes"; // Route definitions

export const AppRouter: FC = () => {
    const location = useLocation();

    return (
        <Routes location={location} key={location.key}>
            {ROUTES.map((route) => (
                <Route key={route.path} path={route.path} element={route.element}/>
            ))}
        </Routes>
    );
};
