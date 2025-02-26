// src/pages/NoEncontrado.jsx
import React from "react";
import { Container, Paper, Typography } from "@mui/material";

const NoEncontrado = () => (
    <Container>
        <Paper sx={{ p: 3 }}>
            <Typography variant="h4">404</Typography>
            <Typography>Página no encontrada.</Typography>
        </Paper>
    </Container>
);

export default NoEncontrado;