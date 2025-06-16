import React,{useState, useEffect} from "react";
import ListaTarjetas from "./listaTarjetas";
const API_URL = import.meta.env.VITE_API_BASE_URL;


const traerPersonas = () => {
    const [personas, setPersonas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPersonas = async () => {
            try{
                console.log('Intentando obtener personas de:', API_URL);
                const response = await fetch(API_URL);
                console.log('Respuesta recibida (objeto Response):', response);
                if(!response.ok){
                    throw new error(`HTTP Error, status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Datos recibidos de la API (después de .json()):', data);
                if(Array.isArray(data)){
                    setPersonas(data);
                } else{
                    throw new Error('Los datos recibidos no son un array. Formato inesperado de la API.');
                }
                
            } catch(error){
                setError(error);
                console.error('Error al obtener las Personas: ',error);
            } finally{
                setLoading(false);
            }
        };
        fetchPersonas();
    }, []);
    if(loading){
        return <p>Cargando personas ....</p>;
    }
    if(error){
        return <p>Error al cargar personas: {error.message}</p>;
    }
    return (
        <div>
            <h1>Listado de Personas</h1>
            <ListaTarjetas personas={personas}></ListaTarjetas>
        </div>
    );
};

export default traerPersonas;