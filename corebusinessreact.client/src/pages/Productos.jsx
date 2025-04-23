import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container, Paper, Typography, TableContainer, Table, TableHead,
    TableRow, TableCell, TableBody, Button, Avatar, Box, Stack
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams, useNavigate } from "react-router-dom";

const Productos = () => {
    const { empresaId } = useParams();
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`/api/Productos/empresa/${empresaId}`);
                setProductos(response.data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, [empresaId]);

    if (loading) {
        return (
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <Container>
            <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                {/* Botón de volver */}
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(`/empresa/${empresaId}`)}
                    sx={{ mb: 2 }}
                >
                    Volver al Dashboard
                </Button>


                <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                    Productos de la Empresa
                </Typography>

                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: "#f4f6f8" }}>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>SKU</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productos.length > 0 ? (
                                productos.map((producto) => (
                                    <TableRow key={producto.SKU} hover>
                                        <TableCell>
                                            <Avatar>{producto.Nombre.charAt(0)}</Avatar>
                                        </TableCell>
                                        <TableCell>{producto.Nombre}</TableCell>
                                        <TableCell>{producto.Precio}</TableCell>
                                        <TableCell>{producto.Stock}</TableCell>
                                        <TableCell>{producto.SKU}</TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                <Button variant="contained" color="primary" startIcon={<VisibilityIcon />}>
                                                    Ver Detalle
                                                </Button>
                                                <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
                                                    Eliminar
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No hay productos registrados para esta empresa.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default Productos;
