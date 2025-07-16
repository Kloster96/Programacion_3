import React from 'react';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

//import './index';

import LoginPage from './pages/loginPage';
import DuenosPage from './pages/DuenosPage'; 
import MascotasPage from './pages/MascotasPage';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';

const PrivateRoute = ({children, allowedRoles}) => {
  const { isAuthenticated, loading, user } = useAuth();
  if(loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Cargando...
      </div>
    );
  }

  if(!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if(allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-600">
        Acceso Denegado. No tienes los permisos necesarios.
      </div>
    );
  }
  return children;
};

const MainLayout = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-gray-800 p-4">
      <Navbar />
      <div className="flex-grow w-full max-w-5xl mx-auto p-4">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/"
            element={
              <PrivateRoute>
                <MainLayout>
                  <div className="p-8 text-center text-2xl font-bold">
                    ¡Bienvenido a la aplicación de Veterinaria!
                    <p className="text-lg font-normal mt-4">
                      Selecciona una opción en la barra de navegación.
                    </p>
                  </div>
                </MainLayout>
              </PrivateRoute>
            }
            />
            <Route path="/duenos"
              element={
                <PrivateRoute>
                  <MainLayout>
                    <DuenosPage/>
                  </MainLayout>
                </PrivateRoute>
              }
              />
              <Route path="/mascotas"
                element={
                  <PrivateRoute>
                    <MainLayout>
                      <MascotasPage />
                    </MainLayout>
                  </PrivateRoute>
                }
              />
              <Route path="/admin-dashboard"
                element={
                  <PrivateRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <div className="p-8 text-center text-2xl font-bold">
                        Dashboard de Administrador
                      </div>
                    </MainLayout>
                  </PrivateRoute>
                }
                />
                <Route path="*"
                  element={<Navigate to="/" replace />}
                  />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;