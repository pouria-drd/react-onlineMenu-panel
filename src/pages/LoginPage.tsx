import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { REFRESH_KEY } from "../constance/constance";
import { useNavigate, useSearchParams } from "react-router-dom";

import axios from "axios";
import ROUTES from "../router/routes";
import LoginForm from "../components/forms/LoginForm";
import SpinnerCard from "../components/ui/spinner/SpinnerCard";

function LoginPage() {
    const navigate = useNavigate();
    const { login, logout } = useAuth();
    const [searchParams] = useSearchParams();

    const [isValidating, setIsValidating] = useState<boolean>(false);

    // Effect to check for refresh token on component mount
    useEffect(() => {
        setIsValidating(true);

        const refresh = localStorage.getItem(REFRESH_KEY); // Retrieve refresh token from localStorage
        if (refresh) {
            // If refresh token exists, attempt to refresh access token
            const refreshToken = async (refresh: string) => {
                try {
                    // Send refresh token request to API
                    const response = await axios.post<{ access: string }>(
                        `${import.meta.env.VITE_API_URL}auth/token/refresh/`,
                        { refresh }
                    );

                    // Call login function with new access token and existing refresh token
                    login(response.data.access, refresh);

                    // Redirect to nextUrl if provided, otherwise navigate to dashboard
                    const nextUrl = searchParams.get("next");
                    if (nextUrl) {
                        navigate(nextUrl);
                    } else {
                        navigate(ROUTES.DASHBOARD);
                    }
                } catch (error) {
                    logout(); // Logout user if refresh token request fails
                }
            };

            refreshToken(refresh); // Call refresh token function
        }

        setIsValidating(false);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-svh">
            {isValidating ? (
                <SpinnerCard title="لطفا صبر کنید..." />
            ) : (
                <LoginForm />
            )}
        </div>
    );
}

export default LoginPage;
