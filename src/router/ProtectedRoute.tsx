import ROUTES from "./routes";
import { useAuth } from "../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    nextUrl: string;
}

const ProtectedRoute = ({ nextUrl }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth();

    // Check if authenticated, otherwise redirect to unauthorized or login page with nextUrl
    if (!isAuthenticated) {
        return (
            <Navigate
                to={
                    ROUTES.AUTH +
                    (nextUrl ? `?next=${encodeURIComponent(nextUrl)}` : "")
                }
            />
        );
    }

    // If authenticated, render the nested routes (Outlet)
    return <Outlet />;
};

export default ProtectedRoute;

// const refreshToken = localStorage.getItem(
//     import.meta.env.VITE_REFRESH_KEY
// );

// if (!isAuthenticated && refreshToken) {
// }
