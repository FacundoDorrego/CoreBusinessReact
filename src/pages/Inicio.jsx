// src/pages/Inicio.jsx
import React from "react";
import { Container, Paper, Typography } from "@mui/material";

const Inicio = () => (
    <Container>
        <Paper sx={{ p: 3 }}>
            <Typography variant="h4">Inicio</Typography>
            <Typography>Bienvenido al panel de control.</Typography>
        </Paper>
    </Container>
);
export default Inicio;
