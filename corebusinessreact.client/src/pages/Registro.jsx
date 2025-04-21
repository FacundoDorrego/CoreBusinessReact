import { useState } from "react";
import { TextField, Button, Box, Typography, Container, Card, CardContent, CircularProgress } from "@mui/material";
import { useNavigate,Link } from "react-router-dom";
import { register } from "../auth/supabaseAuth";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleRegister = async () => {
        setLoading(true);
        setError(null);
        try {
            const { user, error } = await register(email, password, nombre);
            if (user) {
                alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
                navigate("/login");
            } else if (error) {
                setError(error.message);
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
                        Regístrate
                    </Typography>
                    <Box component="form" noValidate sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
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
                            color="secondary"
                            fullWidth
                            onClick={handleRegister}
                            disabled={loading}
                            sx={{ position: "relative" }}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
                            ) : (
                                "Registrarse"
                            )}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            component={Link}
                            to="/login"
                            disabled={loading}
                            sx={{ position: "relative" }}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
                            ) : (
                                "Volver"
                            )}
                        </Button>

                    </Box>
                    {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
                </CardContent>
            </Card>
        </Container>
    );
}
