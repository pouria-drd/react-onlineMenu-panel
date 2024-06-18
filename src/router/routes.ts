const categoriesUrl = "/categories";

const ROUTES = {
    AUTH: "/",
    NOT_FOUND_ROUTE: "/*",
    // Private routes
    DASHBOARD: "/dashboard",
    PROTECTED: "/protected",
    CATEGORY_DETAIL: categoriesUrl,
};

export default ROUTES;
