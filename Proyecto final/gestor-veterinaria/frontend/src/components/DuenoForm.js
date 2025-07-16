import React, {useState} from "react";

function DuenoForm({onDuenoAdded}) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const newDueno = {nombre,apellido,telefono,email,direccion};
        try{
            const response = await fetch(`${API_URL}/duenos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDueno),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const addedDueno = await response.json();

            console.log('DEBUG (DuenoForm): Respuesta completa del backend al añadir dueño:', addedDueno);
            console.log('DEBUG (DuenoForm): Objeto "dueno" dentro de la respuesta:', addedDueno.dueno);

            onDuenoAdded(addedDueno.dueno);

            setNombre('');
            setApellido('');
            setTelefono('');
            setEmail('');
            setDireccion('');
        } catch(err) {
            console.error('Error en DuenoForm handleSubmit:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Añadir Nuevo Dueño</h2>
            {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre:
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Apellido:
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Teléfono:
                    <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Dirección:
                    <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
            </div>
            <button type="submit" disabled={loading} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-300">
                {loading ? 'Añadiendo...' : 'Añadir Dueño'}
            </button>
        </form>
    );
}

export default DuenoForm;