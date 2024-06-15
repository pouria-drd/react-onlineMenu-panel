import ROUTES from "./routes";
import { Route, Routes } from "react-router-dom";

import { AuthPage, NotFoundPage, UnAuthorizedPage } from "../pages";

import ProtectedRoute from "./ProtectedRoute";
import ProtectedPage from "../pages/ProtectedPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.AUTH} element={<AuthPage />} />
            <Route path={ROUTES.NOT_FOUND_ROUTE} element={<NotFoundPage />} />
            <Route path={ROUTES.UNAUTHORIZED} element={<UnAuthorizedPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/protected" element={<ProtectedPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
