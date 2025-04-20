import { useState, useContext } from "react";
import { TextField, Button, Box, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { login, getPerfil, supabase } from "../auth/supabaseAuth"; // Asegúrate de tener la función getPerfil

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null); // Estado para manejar errores
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para manejar si el usuario está autenticado

    const handleLogin = async () => {
        setLoading(true);
        setError(null); // Limpiar errores al intentar hacer login
        try {
            // Realizamos el login
            const data = await login(email, password);

            if (data) {
                alert("Logueado con éxito 💪");

                // Obtener perfil después del login
                const perfil = await getPerfil();

                if (perfil) {
                    setUserProfile(perfil); // Guardamos el perfil en el estado
                    setIsAuthenticated(true); // Cambiamos el estado de autenticación
                    console.log("Perfil del usuario:", perfil); // Muestra el perfil en la consola para verificar
                }
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

            {userProfile && (
                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <Typography variant="h6">Perfil del Usuario:</Typography>
                        <Typography variant="body1">
                            <strong>Nombre:</strong> {userProfile.nombre}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Rol:</strong> {userProfile.roles?.nombre}
                        </Typography>
                        <Typography variant="body1">
                            <strong>ID:</strong> {userProfile.user_id}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
}
