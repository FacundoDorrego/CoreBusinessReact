import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { login } from "../auth/supabaseAuth"; // Llamada para login
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext"; // Importación correcta
 // Hook para acceso al contexto de autenticación

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { loginUser, user } = useAuth(); // Obtener usuario y loginUser desde el contexto

    // Si ya está logueado, redirigir directamente a la página principal
    useEffect(() => {
        if (user) {
            navigate("/"); // Redirigir a la página principal si ya hay sesión activa
        }
    }, [user, navigate]);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await login(email, password);
            // Asegúrate de que tanto auth.user como perfil existen
            if (data && data.auth && data.auth.user && data.perfil) {
                alert("Logueado con éxito 💪");

                // Combina la información de auth.user y perfil
                const userData = {
                    ...data.auth.user,
                    ...data.perfil,
                };

                // Inicia sesión y guarda el usuario
                loginUser(userData); // Pasa el usuario combinado a loginUser
            } else {
                console.error("No se obtuvo un perfil de usuario válido");
                setError("Error al obtener perfil.");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <Container component="main" maxWidth="xs">
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Iniciar Sesión
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Correo Electrónico"
                            variant="outlined"
                            fullWidth
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Contraseña"
                            variant="outlined"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? "Cargando..." : "Iniciar Sesión"}
                        </Button>
                    </Box>
                    {error && (
                        <Typography color="error" align="center" mt={2}>
                            {error}
                        </Typography>
                    )}
                    <Grid container justifyContent="center" mt={2}>
                        <Grid item>
                            <Typography variant="body2">
                                ¿No tienes cuenta?{" "}
                                <Button href="/registro" variant="text" color="primary">
                                    Regístrate
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}
