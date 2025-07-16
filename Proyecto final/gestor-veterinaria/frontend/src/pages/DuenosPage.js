import React, { useEffect, useState, useCallback } from "react";
import DuenoForm from '../components/DuenoForm';
import EditDuenoForm from "../components/EditDuenoForm";

function DuenoPage() {
    const [duenos, setDuenos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingDueno, setEditingDueno] = useState(null)
    const API_URL = process.env.REACT_APP_API_URL;

    const fetchDuenos = useCallback(async () => {
        try{
            setLoading(true);
            const response = await fetch(`${API_URL}/duenos`);
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDuenos(data);
        } catch ( err ){
            setError(err);
        } finally {
            setLoading(false);
        }
    },[API_URL]);

    useEffect(() => {
        fetchDuenos();
    },[fetchDuenos]);

    const handleDuenoAdded = (newDueno) => {
        setDuenos((prevDuenos) => [...prevDuenos,newDueno]);
    };

    const handleDuenoUpdated = (updatedDueno) => {
        setDuenos((prevDuenos) => 
            prevDuenos.map((dueno) => (dueno.id === updatedDueno.id ? updatedDueno : dueno))
        );
        setEditingDueno(null);
    };

    const handleCancelEdit = () => {
        setEditingDueno(null);
    };

    const handleEditDueno = (dueno) => {
        setEditingDueno(dueno);
    };

    const handleDeleteDueno = async (id) => {
        console.log('DEBUG (DuenosPage - handleDeleteDueno): ID recibido para eliminar:', id);
        if(window.confirm(`Estas seguro de eliminar al dueño con ID ${id}?`)){
            try{
                const response = await fetch(`${API_URL}/duenos/${id}`,{method: 'DELETE'});
                if(!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }
                setDuenos((prevDuenos) => prevDuenos.filter((dueno) => dueno.id !== id));
                alert('Dueño eliminado exitosamente.');
            } catch (err){
                console.error('Error al eliminar dueño:', err);
                alert(`Error al eliminar dueño: ${err.message}`);
            }
        }
    };

    if (loading) {
        return <div className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md"><p className="text-center text-gray-700">Cargando dueños...</p></div>;
    }

    if (error) {
        return <div className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md"><p className="text-center text-red-500">Error al cargar dueños: {error.message}</p></div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg mt-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Gestión de Dueños de Mascotas</h1>

            {editingDueno ? (
                <EditDuenoForm
                    dueno={editingDueno}
                    onDuenoUpdated={handleDuenoUpdated}
                    onCancelEdit={handleCancelEdit}
                />
            ) : (
                <DuenoForm onDuenoAdded= {handleDuenoAdded} />
            )}

            <hr className="my-8 border-t-2 border-gray-200 w-4/5 mx-auto" />

            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Lista de Dueños Registrados:</h2>
            {duenos.length === 0 ? (
                <p className="text-center text-gray-600 italic">No hay dueños registrados aún. ¡Usa el formulario de arriba para añadir uno!</p>
            ) : (
                <ul className="space-y-4">
                    {duenos.map(dueno =>(
                        <li key={dueno.id} className="bg-gray-50 p-5 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <strong className="text-xl font-semibold text-blue-700">
                                {dueno.nombre} {dueno.apellido}
                            </strong> <span className="text-sm text-gray-500">(ID: {dueno.id})</span>
                            <br />
                            {dueno.email && <p className="text-gray-600 text-sm mt-1">Email: {dueno.email}</p>}
                            {dueno.telefono && <p className="text-gray-600 text-sm">Teléfono: {dueno.telefono}</p>}
                            {dueno.direccion && <p className="text-gray-600 text-sm">Dirección: {dueno.direccion}</p>}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                            <button onClick={() => handleEditDueno(dueno)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 shadow-md">
                                Editar
                            </button>
                            <button onClick={() => handleDeleteDueno(dueno.id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 shadow-md">
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

export default DuenoPage;