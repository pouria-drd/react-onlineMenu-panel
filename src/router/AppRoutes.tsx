import ROUTES from "./routes";
import RouteGuard from "./RouteGuard";

import { Route, Routes } from "react-router-dom";
import { LoginPage, NotFoundPage } from "../pages";
import { CategoryDetail, DashboardPage, ProtectedPage } from "../pages/private";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.AUTH} element={<LoginPage />} />
            <Route path={ROUTES.NOT_FOUND_ROUTE} element={<NotFoundPage />} />

            {/* Private Pages */}
            <Route element={<RouteGuard nextUrl={ROUTES.DASHBOARD} />}>
                <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            </Route>
            <Route
                element={
                    <RouteGuard
                        nextUrl={ROUTES.CATEGORY_DETAIL + "/:categoryId"}
                    />
                }>
                <Route
                    path={ROUTES.CATEGORY_DETAIL + "/:categoryId"}
                    element={<CategoryDetail />}
                />
            </Route>
            <Route element={<RouteGuard nextUrl={ROUTES.PROTECTED} />}>
                <Route path={ROUTES.PROTECTED} element={<ProtectedPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
