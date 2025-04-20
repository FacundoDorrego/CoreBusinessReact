import { useState } from "react";
import { TextField, Button, Box, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { register } from "../auth/supabaseAuth";
import axios from 'axios';
export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            // Llamada para registrar el usuario en Supabase
            const { user, rol_id } = await register(email, password, nombre);

            if (!user?.id) {
                throw new Error("No se pudo obtener el ID del usuario de Supabase");
            }

            // Ahora se hace la llamada a tu API con el ID de Supabase (user.id)
            const response = await axios.post("/api/Usuarios", {
                usuarioID: user.id,  // Usamos el ID que Supabase ha asignado al usuario
                nombreUsuario: nombre,
                rolid: rol_id,        // Asumimos que el rol se lo asignas directamente desde Supabase
            });

            if (response.status === 201) {
                alert("Cuenta creada con éxito 🎯");
            } else {
                alert("Hubo un problema al crear la cuenta.");
            }
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
