import UserRegistrationProgress from "../user/UserRegistrationProgress";
import Landing from "./Landing";
import {Navigate} from "react-router-dom";

export const defaultRoutes = [
    { path: "/", element: <Landing /> },
    { path: "/join/:eventId", element: <UserRegistrationProgress /> },
    { path: "*", element: <Navigate replace to="/" /> }
];
