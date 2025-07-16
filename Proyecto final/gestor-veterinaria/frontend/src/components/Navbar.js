import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-lg w-full max-w-5xl mx-auto rounded-lg mt-4">
            <div className="flex gap-4">
                {isAuthenticated && (
                    <>
                        <Link to="/duenos" className="px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 bg-gray-700 hover:bg-blue-600">
                            Gestionar Dueños
                        </Link>
                        <Link to="/mascotas" className="px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 bg-gray-700 hover:bg-blue-600">
                            Gestionar Mascotas
                        </Link>
                        {user?.role === 'admin' && (
                            <Link to="/admin-dashboard" className="px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 bg-gray-700 hover:bg-blue-600">
                                Admin Dashboard
                            </Link>
                        )}
                    </>
                )}
            </div>

            <div className="flex gap-4 items-center">
                {isAuthenticated ? (
                    <>
                        <span className="text-gray-300">Hola, {user?.username || user?.email}!</span>
                        <button 
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 bg-red-600 hover:bg-red-700 text-white"
                            >
                                Cerrar Sesión
                            </button>
                    </>
                ) : (
                    <Link to="/login" className="px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 bg-green-600 hover:bg-green-700 text-white">
                        Iniciar Sesión
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;