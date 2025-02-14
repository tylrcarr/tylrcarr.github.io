import {ReactNode} from "react";

export type AppRoute = {
    id: string;
    path: string;
    label: string;
    icon: ReactNode;
    element: ReactNode;
    hideFromMainNav?: boolean;
}
