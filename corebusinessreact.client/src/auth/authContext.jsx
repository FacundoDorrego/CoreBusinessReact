import { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../auth/supabaseClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);

            const {
                data: { user: authUser },
                error: authError,
            } = await supabase.auth.getUser();

            if (authUser) {
                const { data: perfil, error: perfilError } = await supabase
                    .from("usuarios")
                    .select("*, roles(nombre)")
                    .eq("user_id", authUser.id)
                    .single();

                if (perfil) {
                    setUser({
                        ...perfil,
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

        fetchProfile();
    }, []);

    const logoutUser = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };
    const loginUser = async (authUser) => {
        const { data: perfil, error: perfilError } = await supabase
            .from("usuarios")
            .select("*, roles(nombre)")
            .eq("user_id", authUser.id)
            .single();

        if (perfil) {
            setUser({
                ...perfil,
                email: authUser.email,
                last_sign_in_at: authUser.last_sign_in_at,
            });
        } else {
            console.error("Error obteniendo perfil al loguear:", perfilError);
            setUser(null);
        }
    };


    return (
        <AuthContext.Provider value={{ user, loading, logoutUser, loginUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


