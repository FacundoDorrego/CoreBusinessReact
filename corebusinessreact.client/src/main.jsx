import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Importa BrowserRouter
import App from "./App";
import { AuthProvider } from "./auth/authProvider"; // Si tienes un AuthProvider, usa esto

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router> {/* Asegúrate de envolver la app con Router */}
            <AuthProvider> {/* Envolver la app en AuthProvider si tienes uno */}
                <App />
            </AuthProvider>
        </Router>
    </React.StrictMode>
);