// src/auth/AuthProvider.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para redirección
import { AuthContext } from "../auth/authContext";
import { CircularProgress } from "@mui/material";
import { supabase } from "../auth/supabaseClient";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Solo se usa para cargar el perfil
    const navigate = useNavigate();

    // useEffect para gestionar la carga del perfil y la redirección
    useEffect(() => {
        const fetchPerfil = async () => {
            setLoading(true);

            const {
                data: { user: authUser },
                error: authError,
            } = await supabase.auth.getUser();

            if (authUser) {
                const { data: perfil, error: perfilError } = await supabase
                    .from("usuarios")
                    .select("*")
                    .eq("user_id", authUser.id)
                    .single();

                const { data: rolData, error: rolError } = await supabase
                    .from("roles")
                    .select("nombre")
                    .eq("id", perfil.rol_id)
                    .single();

                if (perfil) {
                    setUser({
                        ...perfil,
                        rol_nombre: rolData?.nombre,
                        email: authUser.email,
                        last_sign_in_at: authUser.last_sign_in_at,
                    });
                } else {
                    console.error("Error obteniendo perfil:", perfilError);
                    setUser(null);
                }
            } else {
                console.error("Error obteniendo usuario:", authError);
                setUser(null);
            }

            setLoading(false);
        };

        fetchPerfil(); // Llamada para cargar el perfil
    }, [navigate]);

    const loginUser = (perfil) => {
        setUser(perfil);
        localStorage.setItem("user", JSON.stringify(perfil)); // Guarda el perfil en localStorage
        navigate("/"); // Redirige al dashboard o cualquier otra ruta protegida
    };

    const logoutUser = async () => {
        await supabase.auth.signOut(); // Llama a la función logout de Supabase
        setUser(null);
        localStorage.removeItem("user"); // Elimina el perfil de localStorage
        navigate("/login"); // Redirige al login después de cerrar sesión
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
            {loading ? (
                <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
