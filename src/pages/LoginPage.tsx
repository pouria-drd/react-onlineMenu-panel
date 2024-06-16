import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import axios from "axios";
import ROUTES from "../router/routes";

import { useAuth } from "../contexts/AuthContext";
import { REFRESH_KEY } from "../constance/constance";
import { Button, Card, Input } from "../components/ui";

function LoginPage() {
    const navigate = useNavigate();
    const { login, logout } = useAuth();
    const [searchParams] = useSearchParams();

    const [loginData, setLoginData] = useState<LoginData>({
        username: "",
        password: "",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Function to handle user login
    const handleLogin = async () => {
        try {
            // Send login request to API
            const response = await axios.post<LoginResponse>(
                `${import.meta.env.VITE_API_URL}auth/token/`,
                loginData
            );

            // Call login function to update tokens and authentication status
            login(response.data.access, response.data.refresh);

            // Redirect to nextUrl if provided, otherwise navigate to dashboard
            const nextUrl = searchParams.get("next");
            if (nextUrl) {
                navigate(nextUrl);
            } else {
                navigate(ROUTES.DASHBOARD);
            }
        } catch (error) {
            console.error("Login failed", error); // Log error message if login fails
        }
    };

    // Effect to check for refresh token on component mount
    useEffect(() => {
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
    }, []);

    return (
        <div className="flex items-center justify-center min-h-svh">
            <Card title="Login">
                <Input
                    type="text"
                    name="username"
                    value={loginData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                />
                <Input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                />
                <Button className="w-full" onClick={handleLogin}>
                    Login
                </Button>
            </Card>
        </div>
    );
}

export default LoginPage;
