import {RouteObject, useRoutes} from "react-router-dom";
import {voterRoutes} from "./voter/voterRoutes";
import {organizerRoutes} from "./organizer/organizerRoutes";
import {defaultRoutes} from "./landing/defaultRoutes";
import {useContext} from "react";
import {HubContext} from "./provider/HubContextProvider";

export default function AppRoutes() {
    const hub = useContext(HubContext);

    // Solange der Hub nicht verbunden ist (und weitere Initialisierung laeuft),
    // sind nur die Default-Routes mit der Landing Page und der Benutzerregistrierung verfuegbar.
    // Verhindert gleichzeitig Deep Links, ausser auf '/join/:eventId'.

    let routes: RouteObject[] = defaultRoutes;
    if (hub) {
        routes = [...voterRoutes, ...organizerRoutes, ...routes];
    }

    return useRoutes(routes);
}
