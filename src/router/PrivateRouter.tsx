import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";

export const PrivateRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
]);