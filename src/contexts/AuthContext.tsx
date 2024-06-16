import api from "../api/axiosInstance";
import {
    useState,
    useContext,
    ReactNode,
    createContext,
    useLayoutEffect,
} from "react";
import { ACCESS_KEY, REFRESH_KEY } from "../constance/constance";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (access: string, refresh: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that manages authentication state and provides context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // State to manage token and authentication status
    const [token, setToken] = useState<string | null>(() => {
        return sessionStorage.getItem(ACCESS_KEY); // Retrieve token from sessionStorage
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        token !== null // Determine initial authentication status based on token presence
    );

    // Function to handle user login
    const login = (access: string, refresh: string) => {
        setTimeout(() => {
            setToken(access); // Set access token
            sessionStorage.setItem(ACCESS_KEY, access); // Store access token in sessionStorage
            localStorage.setItem(REFRESH_KEY, refresh); // Store refresh token in localStorage
            setIsAuthenticated(true); // Update authentication status
        }, 0);
    };

    // Function to handle user logout
    const logout = () => {
        setTimeout(() => {
            setToken(null); // Clear token
            sessionStorage.removeItem(ACCESS_KEY); // Remove access token from sessionStorage
            localStorage.removeItem(REFRESH_KEY); // Remove refresh token from localStorage
            setIsAuthenticated(false); // Update authentication status
        }, 0);
    };

    // Effect to intercept requests and add Authorization header with token
    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config) => {
            console.log("config", (config as any)._retry); // Log retry flag for debugging

            // Add Authorization header if token exists and request is not a retry
            config.headers.Authorization =
                !(config as any)._retry && token
                    ? `Bearer ${token}`
                    : config.headers.Authorization;

            return config;
        });

        // Cleanup function to remove interceptor
        return () => {
            api.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    // Effect to intercept responses and handle token refresh
    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response, // Pass through successful response
            async (error) => {
                const originalRequest = error.config; // Get original request config

                // Handle unauthorized (401) response
                if (error.response.status === 401) {
                    const refresh = localStorage.getItem(REFRESH_KEY); // Retrieve refresh token
                    if (!refresh) {
                        logout(); // Logout if refresh token is missing
                        return Promise.reject(error);
                    }

                    try {
                        // Request new access token using refresh token
                        const response = await api.post<{ access: string }>(
                            "auth/token/refresh/",
                            { refresh }
                        );

                        // Update Authorization header with new access token
                        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                        originalRequest._retry = true; // Set retry flag for original request

                        return api(originalRequest); // Retry original request with new token
                    } catch (error) {
                        logout(); // Logout on error
                    }
                }

                return Promise.reject(error); // Reject promise for other errors
            }
        );

        // Cleanup function to remove interceptor
        return () => {
            api.interceptors.response.eject(refreshInterceptor);
        };
    }, [token]);

    // Provide AuthContext with current authentication state and methods
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children} {/* Render children components */}
        </AuthContext.Provider>
    );
};

// Custom hook to conveniently access authentication context
export const useAuth = () => {
    const context = useContext(AuthContext); // Get authentication context
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider"); // Throw error if context is undefined
    }
    return context; // Return authentication context
};
