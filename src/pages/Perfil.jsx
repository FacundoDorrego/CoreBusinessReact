import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, CircularProgress, Button } from "@mui/material";
import { getPerfil, logout } from "../auth/supabaseAuth";

const Perfil = () => {
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const perfilData = await getPerfil();
                setPerfil(perfilData);
            } catch (error) {
                setError("No se pudo obtener el perfil. Asegúrate de estar autenticado.");
            } finally {
                setLoading(false);
            }
        };

        fetchPerfil();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/login"); // Redirigir al login tras cerrar sesión
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container>
            <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h4">Perfil</Typography>
                {perfil ? (
                    <>
                        <Typography>Nombre: {perfil.nombre}</Typography>
                        <Typography>Rol: {perfil.roles?.nombre || "Sin rol"}</Typography>
                        <Button variant="contained" color="secondary" onClick={handleLogout}>
                            Cerrar sesión
                        </Button>
                    </>
                ) : (
                    <Typography color="error">No se encontraron datos de perfil.</Typography>
                )}
            </Paper>
        </Container>
    );
};

export default Perfil;
