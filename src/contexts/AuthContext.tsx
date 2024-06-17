import api from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { ACCESS_KEY, REFRESH_KEY } from "../constance/constance";
import {
    useState,
    useContext,
    ReactNode,
    createContext,
    useLayoutEffect,
    useEffect,
} from "react";

interface AuthContextType {
    isAuthorized: boolean | null;
    logout: () => void;
    login: (access: string, refresh: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that manages authentication state and provides context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() =>
        sessionStorage.getItem(ACCESS_KEY)
    );
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        auth().catch(() => logout());
    }, [token]);

    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        return () => {
            api.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    const refreshToken = async () => {
        try {
            console.log("Refreshing");
            const refreshToken = localStorage.getItem(REFRESH_KEY);
            const response = await api.post("auth/token/refresh/", {
                refresh: refreshToken,
            });

            if (response.status === 200) {
                sessionStorage.setItem(ACCESS_KEY, response.data.access);

                login(response.data.access, refreshToken!);
                console.log("Refreshing  True");
            } else {
                logout();
                console.log("Refreshing  False");
            }
        } catch (error) {
            logout();
            console.log("Refreshing  Failed");
        }
    };

    const auth = async () => {
        if (!token) {
            setIsAuthorized(false);
            console.log("Auth  False");
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration && tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
            console.log("Auth  True");
        }
    };

    // Function to handle user login
    const login = (access: string, refresh: string) => {
        setTimeout(() => {
            setToken(access);
            sessionStorage.setItem(ACCESS_KEY, access);
            localStorage.setItem(REFRESH_KEY, refresh);
            setIsAuthorized(true);
        }, 0);
    };

    // Function to handle user logout
    const logout = () => {
        setTimeout(() => {
            setToken(null);
            sessionStorage.removeItem(ACCESS_KEY);
            localStorage.removeItem(REFRESH_KEY);
            setIsAuthorized(false);
        }, 0);
    };

    // Provide AuthContext with current authentication state and methods
    return (
        <AuthContext.Provider value={{ isAuthorized, login, logout }}>
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
