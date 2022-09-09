import DefaultLayout from "./DefaultLayout";
import UserRegistration from "./UserRegistration";
import Landing from "./Landing";

export const defaultRoutes = [
    {
        element: <DefaultLayout />,
        children: [
            { path: "register", element: <UserRegistration /> },
            { path: "*", element: <Landing /> },
        ]
    }
];
