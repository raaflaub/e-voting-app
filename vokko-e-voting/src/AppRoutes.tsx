import { useRoutes } from "react-router-dom";
import {voterRoutes} from "./voter/voterRoutes";
import {organizerRoutes} from "./organizer/organizerRoutes";
import {defaultRoutes} from "./landing/defaultRoutes";

export default function AppRoutes() {
    return useRoutes([...voterRoutes, ...organizerRoutes, ...defaultRoutes]);
}
