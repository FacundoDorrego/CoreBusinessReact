import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const Productos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                // Realiza la solicitud a la API
                const response = await axios.get("/api/Productos");
                setProductos(response.data); // Asumiendo que la API devuelve los productos en un array
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };
        fetchProductos(); // Llama a la función que obtiene los productos
    }, []); // Solo se ejecuta una vez cuando el componente se monta

    return (
        <Container>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4">Productos</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Stock</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productos.map((producto) => (
                                <TableRow key={producto.ProductoID}>
                                    <TableCell>{producto.ProductoID}</TableCell>
                                    <TableCell>{producto.Nombre}</TableCell>
                                    <TableCell>{producto.Precio}</TableCell>
                                    <TableCell>{producto.Stock}</TableCell>
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
