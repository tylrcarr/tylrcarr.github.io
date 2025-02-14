import {combineReducers} from "@reduxjs/toolkit";
import {markersReducer} from "./markersSlice";

export const rootReducer = combineReducers({
    markers: markersReducer
    // Add other reducers here
});
