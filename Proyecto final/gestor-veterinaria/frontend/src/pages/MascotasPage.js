import React, {useEffect, useState, useCallback} from "react";
import MascotaForm from '../components/MascotaForm';
import EditMascotaForm from '../components/EditMascotaForm';

function MascotaPage() {
    const [mascotas, setMascotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingMascota, setEditingMascota] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;

    const fetchMascotas = useCallback(async () => {
        try{
            setLoading(true);
            const response = await fetch(`${API_URL}/mascotas`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMascotas(data);
        } catch(err){
            setError(err);
        } finally{
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchMascotas();
    }, [fetchMascotas]);

    const handleMascotaAdded = (newMascota) => {
        setMascotas((prevMascotas) => [...prevMascotas,newMascota]);
        alert('Mascota añadida exitosamente.');
    }

    const handleMascotaUpdated = (updatedMascota) => {
        setMascotas((prevMascotas) => {
            return prevMascotas.map((mascota) => (mascota.id === updatedMascota.id ? updatedMascota : mascota));
        });
        setEditingMascota(null);
        alert('Mascota actualizada exitosamente.');
    };

    const handleCancelEdit = () => {
        setEditingMascota(null);
    };

    const handleEditMascota = (mascota) => {
        setEditingMascota(mascota);
    };

    const handleDeleteMascota = async (id) => {
        if(window.confirm(`¿Estas seguro de que quieres eliminar a la mascota con id:${id}?`)){
            try{
                const response = await fetch(`${API_URL}/mascotas/${id}`, {
                    method: 'DELETE',
                });
                if(!response.ok) {
                    const errorData =await response.json();
                    throw new Error(errorData.message || `HTTP error! status:${response.status}`);
                }
                setMascotas((prevMascotas) => prevMascotas.filter((mascota) => mascota.id !== id));
                alert('Mascota eliminado exitosamente.');
            } catch(err) {
                console.error('Error al eliminar mascota:', err);
                alert(`Error al eliminar mascota: ${err.message}`);
            }
            
        }
    };
        
    if(loading) {
        return <div className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md"><p className="text-center text-gray-700">Cargando mascotas...</p></div>
    }
    

    if(error) {
        return <div className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md"><p className="text-center text-red-500">Error al cargar mascotas: {error.message}</p></div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg mt-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Gestión de Mascotas</h1>

            {editingMascota ? (
                <EditMascotaForm
                mascota={editingMascota}
                onMascotaUpdated={handleMascotaUpdated}
                onCancelEdit={handleCancelEdit}/>
            ) : (
                <MascotaForm onMascotaAdded={handleMascotaAdded}/>
            )}
            <hr className="my-8 border-t-2 border-gray-200 w-4/5 mx-auto"/>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Lista de Mascotas registrados</h2>
            {mascotas.length === 0 ? (
                <p className="text-center text-gray-600 italic">No hay mascotas registradas.</p>
            ) : (
                <ul className="space-y-4">
                    {mascotas.map(mascota => (
                        <li key={mascota.id} className="bg-gray-50 p-5 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <strong className="text-xl font-semibold text-purple-700">{mascota.nombre}</strong> <span className="text-sm text-gray-500">(ID: {mascota.id})</span>
                                <br />
                                <p className="text-gray-600 text-sm mt-1">Especie: {mascota.especie} {mascota.raza && `(${mascota.raza})`}</p>
                                {mascota.fechaNacimiento && <p className="text-gray-600 text-sm">Nacimiento: {new Date(mascota.fechaNacimiento).toLocaleDateString()}</p>}
                                {mascota.dueno && (
                                    <p className="text-gray-600 text-sm">Dueño: {mascota.dueno.nombre} {mascota.dueno.apellido} (ID: {mascota.dueno.id})</p>
                                )}
                                {mascota.observaciones && <p className="text-gray-600 text-sm">Observaciones: {mascota.observaciones}</p>}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                                <button onClick={() => handleEditMascota(mascota)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 shadow-md">
                                    Editar
                                </button>
                                <button onClick={() => handleDeleteMascota(mascota.id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 shadow-md">
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        );
}

export default MascotaPage;