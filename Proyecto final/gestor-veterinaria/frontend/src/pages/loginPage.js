import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({identifier, password}),
            });
            const data = await response.json();
            if( response.ok) {
                login(data.user, data.token);
                navigate('/');
            } else {
                setError(data.message || 'Error de inicio de sesión.');
            }
        } catch (err) {
            console.error('Error al conectar con el servidor:', err);
            setError('No se pudo conectar con el servidor.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Iniciando Sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email o Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            id="identifier"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <button 
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        >
                            Ingresar
                        </button>
                </form>
                <p className="mt-6 text-center text-gray-600 text-sm">
                    ¿No tienes cuenta? <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Registrate aquí</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;