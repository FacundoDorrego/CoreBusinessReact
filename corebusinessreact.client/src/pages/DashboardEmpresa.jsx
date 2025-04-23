// src/pages/DashboardEmpresa.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Container,
    Typography,
    Paper,
    Stack,
    Divider,
    CircularProgress,
    Button
} from "@mui/material";
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';

const DashboardEmpresa = () => {
    const { id } = useParams();
    const navigate = useNavigate();  // Hook para navegar
    const [empresa, setEmpresa] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerEmpresa = async () => {
            try {
                const response = await axios.get(`/api/Empresas/${id}`);
                setEmpresa(response.data);
            } catch (error) {
                console.error("Error al obtener la empresa:", error);
            } finally {
                setCargando(false);
            }
        };

        obtenerEmpresa();
    }, [id]);

    if (cargando) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (!empresa) {
        return (
            <Container>
                <Typography variant="h6" color="error">
                    Empresa no encontrada.
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Paper sx={{ p: 4, mt: 2, borderRadius: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <BusinessRoundedIcon fontSize="large" color="primary" />
                    <Typography variant="h4">{empresa.Nombre}</Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1"><strong>SUPUESTAMENTE</strong>  aca iria un dashboard de la empresa</Typography>
                <Typography variant="body1"><strong>←</strong>  Pero anda el boton de productos en el sidebar O_o</Typography>
                {/* Aquí podés agregar secciones como productos, empleados, estadísticas, etc */}

                {/* Botón para salir de la empresa */}
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/empresas')}  // Redirige al listado de empresas
                >
                    Salir de la empresa
                </Button>
            </Paper>
        </Container>
    );
};

export default DashboardEmpresa;
