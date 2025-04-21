import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container, Paper, Typography, TableContainer, Table, TableHead,
    TableRow, TableCell, TableBody, Button, Avatar, Box, Stack
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Productos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get("/api/Productos");
                setProductos(response.data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };
        fetchProductos();
    }, []);

    return (
        <Container>
            <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                    Productos
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: "#f4f6f8" }}>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productos.map((producto) => (
                                <TableRow key={producto.ProductoID} hover>
                                    <TableCell>
                                        <Avatar>{producto.Nombre.charAt(0)}</Avatar>
                                    </TableCell>
                                    <TableCell>{producto.Nombre}</TableCell>
                                    <TableCell>{producto.Precio}</TableCell>
                                    <TableCell>{producto.Stock}</TableCell>
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
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default Productos;
