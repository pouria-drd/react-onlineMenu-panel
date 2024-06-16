import ROUTES from "./routes";
import { Route, Routes } from "react-router-dom";

import { LoginPage, NotFoundPage, UnAuthorizedPage } from "../pages";

import ProtectedRoute from "./ProtectedRoute";
import { DashboardPage, ProtectedPage } from "../pages/private";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.AUTH} element={<LoginPage />} />
            <Route path={ROUTES.NOT_FOUND_ROUTE} element={<NotFoundPage />} />
            <Route path={ROUTES.UNAUTHORIZED} element={<UnAuthorizedPage />} />

            <Route element={<ProtectedRoute nextUrl={ROUTES.DASHBOARD} />}>
                <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            </Route>
            <Route element={<ProtectedRoute nextUrl={ROUTES.PROTECTED} />}>
                <Route path={ROUTES.PROTECTED} element={<ProtectedPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
