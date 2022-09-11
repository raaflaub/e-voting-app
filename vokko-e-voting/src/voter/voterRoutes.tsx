import VoterEventDashboard from "./VoterEventDashboard";
import VoterEventSession from "./VoterEventSession";
import VoterEventResults from "./VoterEventResults";

export const voterRoutes = [
    { path: "voter", element: <VoterEventDashboard /> },
    { path: "voter/event-session/:eventId", element: <VoterEventSession /> },
    { path: "voter/event-results/:eventId", element: <VoterEventResults /> },
]
