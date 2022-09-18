import OrganizerEventLayout from "./OrganizerEventLayout";
import OrganizerEventDashboard from "./OrganizerEventDashboard";
import VoterEventSession from "../voter/VoterEventSession";
import Loading from "../landing/Loading";
import OrganizerEventSetup from "./OrganizerEventSetup";

export const organizerRoutes = [
    { path: "organizer", element: <OrganizerEventDashboard /> },
    {
        path: "organizer/events/:eventId",
        element: <OrganizerEventLayout />,
        children: [
            {  path: "setup", element: <OrganizerEventSetup/> },
            {  path: "live", element: <Loading text="implementing..."/> },
            {  path: "results", element: <Loading text="implementing..."/> },
        ]
    }
]
