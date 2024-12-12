import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {ROUTES} from "./constants/routes";

export const AppRouter: FC = () => (
    <Routes>
        {ROUTES.map(route => (
            <Route path={route.path} element={route.element} />
        ))}
    </Routes>
);
