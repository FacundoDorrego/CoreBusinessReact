import { useState } from "react";
import { TextField, Button, Box, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { register } from "../auth/supabaseAuth";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            await register(email, password, nombre);
            alert("Cuenta creada con éxito 🎯");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Crear Cuenta
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
                            color="primary"
                            fullWidth
                            onClick={handleRegister}
                            disabled={loading}
                        >
                            {loading ? "Cargando..." : "Registrarse"}
                        </Button>
                    </Box>
                    <Grid container justifyContent="center" mt={2}>
                        <Grid item>
                            <Typography variant="body2">
                                ¿Ya tienes cuenta?{" "}
                                <Button href="/login" variant="text" color="primary">
                                    Iniciar Sesión
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}
