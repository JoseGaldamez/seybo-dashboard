import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/Login";

export const PublicRouter = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
]);