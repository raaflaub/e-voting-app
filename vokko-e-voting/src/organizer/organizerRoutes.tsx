import OrganizerEventDetails from "./OrganizerEventDetails";
import OrganizerEventDashboard from "./OrganizerEventDashboard";

export const organizerRoutes = [
    { path: "organizer", element: <OrganizerEventDashboard /> },
    {
        path: "organizer/events/:eventId",
        element: <OrganizerEventDetails />,
    }
]
