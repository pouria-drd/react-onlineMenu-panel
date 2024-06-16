import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ToastProvider } from "./components/ui/toast/ToastProvider.tsx";

import "./assets/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <ToastProvider>
                    <App />
                </ToastProvider>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
