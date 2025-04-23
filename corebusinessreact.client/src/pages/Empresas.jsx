import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
    Container, Paper, Typography, Card, CardContent, CardActions,
    Avatar, Button, Stack, Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
    Snackbar, Alert
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

const Empresas = () => {
    const [empresas, setEmpresas] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [nuevaEmpresa, setNuevaEmpresa] = useState({
        Nombre: "",
        Direccion: "",
        Telefono: "",
    });

    const [empresaAEliminar, setEmpresaAEliminar] = useState(null);
    const [abrirModalEliminar, setAbrirModalEliminar] = useState(false);

    const [snackbarAbierto, setSnackbarAbierto] = useState(false);
    const [snackbarMensaje, setSnackbarMensaje] = useState("");

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const obtenerEmpresas = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                const storedUserId = storedUser ? JSON.parse(storedUser).user_id : null;

                if (!user || !user.user_id || user.user_id !== storedUserId) {
                    console.warn("Usuario no autenticado o el ID no coincide.");
                    return;
                }

                const response = await axios.get(`/api/Empresas/usuario/${user.user_id}`);
                setEmpresas(response.data);
            } catch (error) {
                console.error("Error al obtener empresas:", error);
            }
        };

        obtenerEmpresas();
    }, [user]);

    const manejarAbrirModal = () => setAbrirModal(true);
    const manejarCerrarModal = () => setAbrirModal(false);
    const navigate = useNavigate();
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setNuevaEmpresa((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        const usuarioID = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).user_id : null;

        if (!usuarioID) {
            console.error("No se encontró el usuario en el localStorage.");
            return;
        }

        const nuevaEmpresaConUsuario = {
            ...nuevaEmpresa,
            UsuarioID: usuarioID
        };

        try {
            const response = await axios.post("/api/Empresas", nuevaEmpresaConUsuario);
            setEmpresas([...empresas, response.data]);
            setNuevaEmpresa({ Nombre: "", Direccion: "", Telefono: "" });
            manejarCerrarModal();
            setSnackbarMensaje("Empresa creada exitosamente.");
            setSnackbarAbierto(true);
        } catch (error) {
            console.error("Error al crear la empresa:", error);
        }
    };

    const confirmarEliminacion = (empresa) => {
        setEmpresaAEliminar(empresa);
        setAbrirModalEliminar(true);
    };

    const cancelarEliminacion = () => {
        setEmpresaAEliminar(null);
        setAbrirModalEliminar(false);
    };

    const eliminarEmpresa = async () => {
        if (!empresaAEliminar) return;

        try {
            await axios.delete(`/api/Empresas/${empresaAEliminar.EmpresaID}`);
            setEmpresas(empresas.filter(e => e.EmpresaID !== empresaAEliminar.EmpresaID));
            cancelarEliminacion();
            setSnackbarMensaje("Empresa eliminada correctamente.");
            setSnackbarAbierto(true);
        } catch (error) {
            console.error("Error al eliminar la empresa:", error);
        }
    };

    return (
        <Container>
            <Paper sx={{ p: 6, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                    Mis Empresas
                </Typography>

                {empresas.length === 0 ? (
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        No tenés empresas registradas.
                    </Typography>
                ) : (
                    <Grid container spacing={3}>
                        {empresas.map((empresa) => (
                            <Grid item xs={12} sm={6} md={4} key={empresa.EmpresaID}>
                                <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                    <CardContent>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar>{empresa.Nombre?.charAt(0)}</Avatar>
                                            <Typography variant="h6">{empresa.Nombre}</Typography>
                                        </Stack>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<BusinessIcon />}
                                            fullWidth
                                            onClick={() => navigate(`/empresa/${empresa.EmpresaID}`)}
                                        >
                                            Ver
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            fullWidth
                                            onClick={() => confirmarEliminacion(empresa)}
                                        >
                                            Eliminar
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                )}
                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            p: 2,
                            border: "2px dashed #1976d2",
                            color: "#1976d2",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            "&:hover": {
                                backgroundColor: "#f0f4ff",
                            },
                        }}
                        onClick={manejarAbrirModal}
                    >
                        <BusinessRoundedIcon sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h6">Agregar Empresa</Typography>
                    </Card>
                </Grid>
            </Paper>

            {/* Modal para agregar empresa */}
            <Dialog open={abrirModal} onClose={manejarCerrarModal}>
                <DialogTitle>Agregar Nueva Empresa</DialogTitle>
                <DialogContent>
                    <form onSubmit={manejarEnvio}>
                        <TextField
                            name="Nombre"
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            value={nuevaEmpresa.Nombre}
                            onChange={manejarCambio}
                            sx={{ mb: 2 }}
                        />

                        <DialogActions>
                            <Button onClick={manejarCerrarModal} color="secondary">
                                Cancelar
                            </Button>
                            <Button type="submit" color="primary">
                                Crear
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Modal de confirmación de eliminación */}
            <Dialog open={abrirModalEliminar} onClose={cancelarEliminacion}>
                <DialogTitle>¿Estás seguro?</DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Querés eliminar la empresa <strong>{empresaAEliminar?.Nombre}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelarEliminacion} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={eliminarEmpresa} color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar de feedback (creación/eliminación) */}
            <Snackbar
                open={snackbarAbierto}
                autoHideDuration={3000}
                onClose={() => setSnackbarAbierto(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={() => setSnackbarAbierto(false)} severity="success" sx={{ width: '100%' }}>     
                    {snackbarMensaje}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Empresas;
