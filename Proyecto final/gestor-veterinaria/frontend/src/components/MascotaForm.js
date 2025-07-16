import React, {useState, useEffect} from "react";

function MascotaForm({ onMascotaAdded }) {
    const [nombre, setNombre] = useState('');
    const [especie, setEspecie] = useState('');
    const [raza, setRaza] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [duenoId, setDuenoId] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [loadingForm, setLoadingForm] = useState(false);
    const [error, setError] = useState(null);
    const [duenos, setDuenos] = useState([]);
    const [loadingDuenos, setLoadingDuenos] = useState(true);
    const [errorDuenos, setErrorDuenos] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchDuenos = async () => {
            try{
                const response = await fetch(`${API_URL}/duenos`);
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDuenos(data);
                if(data.length > 0) {
                    setDuenoId(data[0].id);
                } else if(data.length === 0) {
                    setDuenoId('');
                }
            } catch (err){
                setErrorDuenos(err.message);
            } finally{
                setLoadingDuenos(false);
            }
        };
        fetchDuenos();
    }, [API_URL]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoadingForm(true);
        setError(null);
        const newMascota = {
            nombre,
            especie,
            raza: raza || null,
            fechaNacimiento: fechaNacimiento || null,
            duenoId: parseInt(duenoId,10),
            observaciones: observaciones || null
        };
        try{
            const response = await fetch(`${API_URL}/mascotas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMascota),
            });

            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const addedMascota = await response.json();
            onMascotaAdded(addedMascota.mascota || addedMascota);

            setNombre('');
            setEspecie('');
            setRaza('');
            setFechaNacimiento('');
            setObservaciones('');
        } catch(err) {
            console.error('Error al añadir mascota:',err);
            setError(err.message);
        } finally {
            setLoadingForm(false);
        }
    };

    if (loadingDuenos){
        return <p className="text-center text-gray-700">Cargando dueños para el formulario de mascotas...</p>;
    }

    if(errorDuenos){
        return <p className="text-red-500 text-center">Error al cargar dueños: {errorDuenos}</p>;
    }

    if (duenos.length === 0) {
        return (
            <p className="text-center text-gray-600">
                No hay dueños registrados.
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Añadir Nueva Mascota</h2>
            {error && <p className="text-red-500 text-center mb-4">Error:{error}</p>}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre:
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Especie:
                    <input type="text" value={especie} onChange={(e) => setEspecie(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Raza:
                    <input type="text" value={raza} onChange={(e) => setRaza(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha de Nacimiento:
                    <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Dueño:
                    <select value={duenoId} onChange={(e) => setDuenoId(e.target.value)} required className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        {duenos.map(dueno => (
                            <option key={dueno.id} value={dueno.id}>
                                {dueno.nombre} {dueno.apellido} (ID: {dueno.id})
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Observaciones:
                    <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-y" />
                </label>
            </div>
            <button type="submit" disabled={loadingForm} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-300">
                {loadingForm ? 'Añadiendo...' : 'Añadir Mascota'}
            </button>
        </form>
    );
}

export default MascotaForm;