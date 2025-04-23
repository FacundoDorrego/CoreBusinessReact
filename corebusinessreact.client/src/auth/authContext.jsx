import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../auth/supabaseClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Función para obtener el perfil de un usuario
    const getUserProfile = async (authUser) => {
        const { data: perfil, error: perfilError } = await supabase
            .from("usuarios")
            .select("*, roles(nombre)")
            .eq("user_id", authUser.id)
            .single();

        if (perfil) {
            return {
                ...perfil,
                email: authUser.email,
                last_sign_in_at: authUser.last_sign_in_at,
            };
        } else {
            console.error("Error obteniendo perfil:", perfilError);
            return null;
        }
    };

    // useEffect para obtener el perfil al cargar la aplicación
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);

            const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

            if (authUser) {
                const profile = await getUserProfile(authUser);
                setUser(profile);
            } else {
                console.error("Error obteniendo usuario:", authError);
                setUser(null);
            }

            setLoading(false);
        };

        fetchProfile();
    }, []);

    const logoutUser = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const loginUser = async (authUser) => {
        const profile = await getUserProfile(authUser);
        setUser(profile);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logoutUser, loginUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
