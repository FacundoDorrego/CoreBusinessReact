import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, Button, CircularProgress } from "@mui/material";

const Perfil = () => {
    const { user: perfil, loading, logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };

    if (loading) return <CircularProgress sx={{ mt: 4 }} />;
    if (!perfil) {
        return (
            <Typography color="error" sx={{ mt: 4 }}>
                No se pudo cargar el perfil. Inicia sesión nuevamente.
            </Typography>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Perfil
                </Typography>
                <Typography><strong>Email:</strong> {perfil.email}</Typography>
                <Typography><strong>Último inicio de sesión:</strong> {new Date(perfil.last_sign_in_at).toLocaleString()}</Typography>
                <Typography>Rol: {perfil.rol_nombre || "Sin rol"}</Typography>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </Paper>
        </Container>
    );
};

export default Perfil;
