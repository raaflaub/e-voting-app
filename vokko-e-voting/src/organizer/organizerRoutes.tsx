import OrganizerLayout from "./OrganizerLayout";
import OrganizerMeetingOverview from "./OrganizerMeetingOverview";

export const organizerRoutes = [
    {
        element: <OrganizerLayout />,
        children: [
            { path: "organizer", element: <OrganizerMeetingOverview /> },
        ]
    }
]
