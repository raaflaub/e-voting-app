import OrganizerEventDetails from "./OrganizerEventDetails";
import OrganizerEventDashboard from "./OrganizerEventDashboard";
import VoterEventSession from "../voter/VoterEventSession";
import Loading from "../landing/Loading";
import OrganizerEventSetup from "./OrganizerEventSetup";

export const organizerRoutes = [
    { path: "organizer", element: <OrganizerEventDashboard /> },
    {
        path: "organizer/events/:eventId",
        element: <OrganizerEventDetails />,
    }
]
