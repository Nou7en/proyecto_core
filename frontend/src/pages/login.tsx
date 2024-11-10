import React from 'react';
import LoginForm from '../components/LoginForm'; // Ajusta la ruta si es necesario

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#01333d]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Iniciar Sesión</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
