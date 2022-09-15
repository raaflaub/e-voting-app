import DefaultLayout from "./DefaultLayout";
import UserRegistrationProgress from "../register/UserRegistrationProgress";
import Landing from "./Landing";

export const defaultRoutes = [
    {
        element: <DefaultLayout />,
        children: [
            { path: "*", element: <Landing /> },
        ]
    },
    { path: "join", element: <UserRegistrationProgress /> }
];
