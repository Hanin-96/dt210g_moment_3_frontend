import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
    {
        //Huvudrouting
        path: "/",
        element: <Layout />,
        children: [
            {
                //Huvudrouting
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },

        ]

    }


]);

export default router;
