import ROUTES from "./routes";
import { useAuth } from "../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.UNAUTHORIZED} />;
};

export default ProtectedRoute;
