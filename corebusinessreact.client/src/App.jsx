import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Añadimos Navigate para redirección
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Perfil from "./pages/Perfil";
import Registro from "./pages/Registro";
import Productos from "./pages/Productos"
import { useAuth } from "./auth/authContext"; // Importamos el hook de autenticación

const App = () => {
    const { user } = useAuth(); // Obtenemos el estado de usuario desde el contexto

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={user ? <Inicio /> : <Navigate to="/login" />} /> {/* Página de inicio */}
                <Route path="perfil" element={user ? <Perfil /> : <Navigate to="/login" />} /> {/* Redirigir si no está autenticado */}
                <Route path="productos" element={user ? <Productos /> : <Navigate to="/login" />} /> 
            </Route>

            {/* Redirección si ya está autenticado, no debería acceder a login ni registro */}
            <Route
                path="login"
                element={user ? <Navigate to="/perfil" /> : <Login />}
            />
            <Route
                path="registro"
                element={user ? <Navigate to="/perfil" /> : <Registro />}
            />
        </Routes>
    );
};

export default App;
