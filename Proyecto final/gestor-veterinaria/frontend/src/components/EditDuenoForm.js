import React, { useState, useEffect } from 'react';

function EditDuenoForm({dueno, onDuenoUpdated, onCancelEdit}) {
    const [id, setId] = useState(dueno.id);
    const [nombre, setNombre] = useState(dueno.nombre);
    const [apellido,  setApellido] = useState(dueno.apellido);
    const [telefono, setTelefono] = useState(dueno.telefono || '');
    const [email, setEmail] = useState(dueno.email || '');
    const [direccion, setDireccion] = useState(dueno.direccion || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        setId(dueno.id);
        setNombre(dueno.nombre);
        setApellido(dueno.apellido);
        setTelefono(dueno.telefono || '');
        setEmail(dueno.email || '');
        setDireccion(dueno.direccion || '');
    },[dueno]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        const updatedDueno = {nombre, apellido, telefono, email, direccion};

        try{
            const response = await fetch(`${API_URL}/duenos/${id}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedDueno)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            onDuenoUpdated(data.dueno || data);
        }catch(err) {
            console.error('Error al actualizar  dueño:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md max-w-md mx-auto'>
            <h2 className='text-2xl font-semibold text-center text-gray-800 mb-6'>Editar Dueño (ID: {id})</h2>
            {error && <p className='text-red-500 text-center mb-4'>Error: {error}</p>}
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Nombre:
                    <input type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                </label>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Apellido:
                    <input type='text' value={apellido} onChange={(e) => setApellido(e.target.value)} required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                </label>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Teléfono:
                    <input type='text' value={telefono} onChange={(e) => setTelefono(e.target.value)} required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                </label>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Email:
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                </label>
            </div>
            <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Dirección:
                    <input type='text' value={direccion} onChange={(e) => setDireccion(e.target.value)} required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                </label>
            </div>
            <div className='flex justify-between gap-4'>
                <button type='submit' disabled={loading} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-1 transition-colors duration-300'>
                    {loading ? 'Guardando...' : 'Guardando cambios'}
                </button>
                <button type='button' onClick={onCancelEdit} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-1 transition-colors duration-300'>
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default EditDuenoForm;