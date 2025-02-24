import { useState } from 'react';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import axios from 'axios';

function App() {
    const [productos, setProductos] = useState([]); // Estado para almacenar los productos

    // Función que hace la solicitud a la API
    const fetchProductos = async () => {
        try {
            const response = await axios.get('/api/Productos'); // Cambia esto por la URL de tu API
            setProductos(response.data); // Guarda los productos en el estado
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>CoreBusiness con API hecho en REACT usando Material UI!</h1>
            <Button variant="contained" color="primary" onClick={fetchProductos}>
                ¡Clic aquí para obtener productos!
            </Button>

            <div style={{ marginTop: '20px' }}>
                <h2>Productos</h2>
                {productos.length > 0 ? (
                    <Grid container spacing={2}>
                        {productos.map((producto) => (
                            <Grid item xs={12} sm={6} md={4} key={producto.ProductoID}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{producto.Nombre}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {producto.Descripcion}
                                        </Typography>
                                        <Typography variant="h5" color="primary">
                                            ${producto.Precio}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Stock: {producto.Stock}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography>No se han encontrado productos.</Typography>
                )}
            </div>
        </div>
    );
}

export default App;
