import ROUTES from "./routes";
import { useAuth } from "../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    nextUrl: string;
}

const ProtectedRoute = ({ nextUrl }: ProtectedRouteProps) => {
    const { isAuthorized } = useAuth();

    if (isAuthorized === null) {
        // Optionally render a loading spinner or a placeholder
        return <div>Loading...</div>;
    }

    // Check if authenticated, otherwise redirect to unauthorized or login page with nextUrl
    if (!isAuthorized) {
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
