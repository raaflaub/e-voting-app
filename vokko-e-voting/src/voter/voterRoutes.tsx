import VoterLayout from "./VoterLayout";
import VoterMeetingOverview from "./VoterMeetingOverview";

export const voterRoutes = [
    {
        element: <VoterLayout />,
        children: [
            { path: "voter", element: <VoterMeetingOverview /> },
        ]
    }
]
