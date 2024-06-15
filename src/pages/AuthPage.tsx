import { useState, ChangeEvent } from "react";
import { Button, Input } from "../components/ui";
import axiosInstance from "../axios/axiosInstance";

function AuthPage() {
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

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post<LoginResponse>(
                "auth/token/",
                loginData
            );
            console.log(response.data);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="flex items-center justify-center h-svh">
            <div
                className="shadow flex flex-col items-center justify-center gap-2
                rounded-lg mx-auto w-fit p-4">
                <h1>Login</h1>
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
                <Button onClick={handleLogin} className="w-full">
                    Login
                </Button>
            </div>
            +
        </div>
    );
}

export default AuthPage;
