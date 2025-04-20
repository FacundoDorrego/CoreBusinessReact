import { createClient } from "@supabase/supabase-js";

// Inicializar Supabase con las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * 
 * @param {string} email
 * @param {string} password
 * @param {string} nombre
 * @param {string} rol 
 */


export async function register(email, password, nombre) {
    // Crear el usuario en Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        console.error("Error en el registro:", error.message);
        throw error;
    }

    const user = data.user;
    if (!user) {
        throw new Error("No se pudo obtener el usuario después del registro.");
    }

    // Insertar en la tabla 'usuarios' con rol 2 (Usuario)
    const { error: insertError } = await supabase
        .from("usuarios")
        .insert([
            { user_id: user.id, nombre, rol_id: 2 } // Aquí asignamos el rol de usuario
        ]);

    //Aca hay que leer el id asignado y traerlo para copiar el usuario en mi bd

    if (insertError) {
        console.error("Error insertando en usuarios:", insertError.message);
        throw insertError;
    }

    return { user, rol_id: 2 };
}


export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    
    if (error) throw error;

    return data; 
}



export async function getPerfil() {
    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
        console.error("Error al obtener el usuario:", error.message);
        throw error;
    }

    if (!user || !user.user) {
        console.error("Usuario no autenticado.");
        throw new Error("Usuario no autenticado.");
    }

    const userId = user.user.id; // Aquí obtenemos el ID del usuario autenticado

    // Consultar el perfil en la base de datos
    const { data: perfil, error: perfilError } = await supabase
        .from("usuarios")
        .select("*, roles(nombre)") // Realiza un JOIN con la tabla de roles
        .eq("user_id", userId)
        .single();

    if (perfilError) {
        console.error("Error al obtener el perfil:", perfilError.message);
        throw perfilError;
    }

    return perfil;
}

export async function logout() {
    await supabase.auth.signOut();
}
