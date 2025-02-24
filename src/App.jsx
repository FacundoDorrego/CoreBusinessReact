import { useEffect, useState } from "react";
import { getData } from "./api"; // Importar la función

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData().then(setData).catch(console.error);
    }, []);

    return (
        <div>
            <h1>Datos desde la API</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.nombre}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
