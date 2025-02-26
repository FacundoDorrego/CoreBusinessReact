// src/pages/Perfil.jsx
import React from "react";
import { Container, Paper, Typography } from "@mui/material";

const Perfil = () => (
    <Container>
        <Paper sx={{ p: 3 }}>
            <Typography variant="h4">Perfil</Typography>
            <Typography>Información del usuario.</Typography>
        </Paper>
    </Container>
);

export default Perfil;
