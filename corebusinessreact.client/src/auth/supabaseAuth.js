import { supabase } from './supabaseClient';
import axios from "axios";
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
        password,
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

    if (insertError) {
        console.error("Error insertando en usuarios:", insertError.message);
        throw insertError;
    }

    // Obtener el rol_id del usuario recién insertado
    const { data: perfil, error: perfilError } = await supabase
        .from("usuarios")
        .select("rol_id")
        .eq("user_id", user.id)
        .single();

    if (perfilError) {
        console.error("Error obteniendo perfil:", perfilError.message);
        throw perfilError;
    }

    // Ahora hacemos la llamada a la API con el ID de Supabase (user.id) y el rol_id
    try {
        const response = await axios.post("/api/Usuarios", {
            usuarioID: user.id,  // Usamos el ID que Supabase ha asignado al usuario
            nombreUsuario: nombre,
            rolid: perfil.rol_id, // Usamos el rol_id del perfil obtenido de Supabase
        });

        if (response.data.success) {
            return { user, rol_id: perfil.rol_id };  // Registro exitoso
        } else {
            throw new Error("Hubo un error al guardar los datos en el servidor.");
        }
    } catch (apiError) {
        console.error("Error en la llamada a la API:", apiError.message);
        throw apiError;
    }
}


export async function login(email, password) {
    // Autenticación con Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error("Error en el login:", error.message);
        throw error;
    }

    const user = data.user;

    try {
        // Obtener el perfil desde tu API usando el ID del usuario de Supabase
        const response = await axios.get(`/api/Usuarios/${user.id}`);

        const perfil = response.data.usuario;

        return {
            auth: data,      // Datos del login
            perfil: perfil   // Datos del usuario desde tu base
        };
    } catch (err) {
        console.error("Error al obtener el perfil:", err);
        throw new Error("Autenticación exitosa, pero no se pudo obtener el perfil.");
    }
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
        .single(); // Debería devolver solo un registro

    if (perfilError) {
        console.error("Error al obtener el perfil:", perfilError.message);
        throw perfilError;
    }
    if (perfilError || !perfil) {
        console.error("El perfil no existe o hubo un error", perfilError);
        // Cerrar sesión si el perfil no se encuentra
        await supabase.auth.signOut();
        // Redirigir al usuario a la página de login o mostrar un mensaje
    }

    return perfil; // Devuelve el perfil junto con los roles
}

export async function logout() {
    await supabase.auth.signOut();
}
