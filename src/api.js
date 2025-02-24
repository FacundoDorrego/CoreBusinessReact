import axios from 'axios';

const API_URL = 'http://localhost:5065/api';

export const getData = async () => {
    try {
        const response = await axios.get(`${API_URL}/tu-endpoint`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
    }
};
