import ROUTES from "./routes";
import { Route, Routes } from "react-router-dom";

import { AuthPage, NotFoundPage } from "../pages";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.AUTH} element={<AuthPage />} />
            <Route path={ROUTES.NOT_FOUND_ROUTE} element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;
