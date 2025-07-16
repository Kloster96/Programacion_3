import React, { createContext, useState, useEffect, useContext } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
        const [user, setUser] = useState(() => {
            try {
                const storedUser = localStorage.getItem('user');
                return storedUser ? JSON.parse(storedUser) : null;
            } catch (error) {
                console.error('Error al parsear el usuario de localStorage:', error);
                return null;
            }
        });
        const [token, setToken] = useState(() => localStorage.getItem('token') || null);
        const [loading, setLoading] = useState(true);
        useEffect(() => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }
            if (token) {
                localStorage.setItem('token', token);
            } else {
                localStorage.removeItem('token');
            }
            setLoading(false);
        }, [user, token]);

        const login = (userData, tokenData) => {
            setUser(userData);
            setToken(tokenData);
        };

        const logout = () => {
            setUser(null);
            setToken(null);
        };

        const authContextValue = {
            user,
            token,
            loading,
            isAuthenticated: !!user,
            login,
            logout,
        };

        return ( 
            <AuthContext.Provider value = { authContextValue } > 
                { children } 
            </AuthContext.Provider> );
        }

        export const useAuth = () => {
            return useContext(AuthContext);
        };