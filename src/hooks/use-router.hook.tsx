import React, {createContext, ReactNode, useContext, useState} from "react";
import {HOME_ROUTE, ROUTES} from "../constants/routes";

export type Route = {
    id: string;
    label: string;
    icon: ReactNode;
    render: () => ReactNode;
}

type RouteState = {
    current: Route;
    setCurrent: (routeId: string) => void;
}

const RouteContext = createContext<RouteState>({
    current: HOME_ROUTE,
    setCurrent: () => {
    },
});

type Props = {
    children?: React.ReactNode;
}

const RouteProvider: React.FC<Props> = ({children}) => {
    const [routeState, setRouteState] = useState<RouteState>({
        current: HOME_ROUTE,
        setCurrent: routeId => {
            setRouteState(prev => ({
                ...prev,
                current: ROUTES.find(route => route.id === routeId) || prev.current || HOME_ROUTE
            }))
        },
    });
    return (
        <RouteContext.Provider value={routeState}>
            {children}
        </RouteContext.Provider>
    );
};

const useRouter = () => useContext(RouteContext);

export {RouteContext, RouteProvider, useRouter};
