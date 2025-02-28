import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ImagePage from "./pages/ImagePage";
import ProtectedRoute from "./components/ProtectedRoute";
import MyPage from "./pages/MyPage";
import { ImagesProvider } from "./context/ImagesContext";

const router = createBrowserRouter([
    {
        //Huvudrouting
        path: "/",
        element: <Layout />,
        children: [
            {
                //Huvudrouting
                path: "/",
                element: (
                    <ImagesProvider>
                        <HomePage />
                    </ImagesProvider>
                ),
            },
            {
                path: ":id",
                element: (
                    <ImagesProvider>
                        <ImagePage />
                    </ImagesProvider>
                ),
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/mypage",
                element: (
                    <ImagesProvider>
                        <ProtectedRoute>
                            <MyPage />
                        </ProtectedRoute>
                    </ImagesProvider>
                )
            },

        ]

    }


]);

export default router;
