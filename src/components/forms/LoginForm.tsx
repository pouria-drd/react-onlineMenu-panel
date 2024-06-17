import axios from "axios";
import ROUTES from "../../router/routes";

import { Button, Card, Input } from "../ui";
import { ChangeEvent, useState } from "react";
import { useToast } from "../ui/toast/ToastProvider";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [searchParams] = useSearchParams();

    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

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
        setIsAuthenticating(true);
        try {
            // Send login request to API
            const response = await axios.post<LoginResponse>(
                `${import.meta.env.VITE_API_URL}auth/token/`,
                loginData
            );

            if (response.status === 200) {
                // Call login function to update tokens and authentication status
                login(response.data.access, response.data.refresh);

                // Redirect to nextUrl if provided, otherwise navigate to dashboard
                const nextUrl = searchParams.get("next");
                if (nextUrl) {
                    navigate(nextUrl);
                } else {
                    navigate(ROUTES.DASHBOARD);
                }
            }
            showToast("خوش آمدید!", "success");
        } catch (error) {
            showToast(
                "نام کاربری / رمز عبور نادرست  می‌باشد!",
                "danger",
                "خطا"
            );
            // console.error("Login failed", error); // Log error message if login fails
        }
        setIsAuthenticating(false);
    };

    return (
        <Card title="ورود">
            <Input
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleInputChange}
                placeholder="نام کاربری"
            />
            <Input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                placeholder="رمز عبور"
            />
            <Button
                className="w-full"
                onClick={handleLogin}
                disabled={
                    isAuthenticating ||
                    !(
                        loginData.username.length > 3 &&
                        loginData.password.length > 8
                    )
                }>
                ورود
            </Button>
        </Card>
    );
};

export default LoginForm;
