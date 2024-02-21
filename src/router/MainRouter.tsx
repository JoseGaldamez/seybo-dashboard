import { RouterProvider } from "react-router-dom";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { useStore, Store } from "../global/store";

export const MainRoute = () => {
    const { authStatus }: Store = useStore();

    return (
        <RouterProvider router={authStatus === "authorized" ? PrivateRouter : PublicRouter} />
    )
}