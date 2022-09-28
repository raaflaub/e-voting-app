import VoterEventDashboard from "./VoterEventDashboard";
import VoterEventContainer from "./VoterEventContainer";
import VoterEventResults from "./VoterEventResults";

export const voterRoutes = [
    { path: "voter", element: <VoterEventDashboard /> },
    { path: "voter/event-session/:eventId", element: <VoterEventContainer /> },
    { path: "voter/event-results/:eventId", element: <VoterEventResults /> },
]
