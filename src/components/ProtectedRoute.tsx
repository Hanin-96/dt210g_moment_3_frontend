import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    //Finns användare i state dvs inloggad?
    const { user } = useAuth();

    //Finns ej användare, redirect till login sida
    if (!user) {
        return <Navigate to="/login" replace />
    } 

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute