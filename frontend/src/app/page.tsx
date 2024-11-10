'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const router = useRouter();

    return (
        <div className="container">
            <h1>Bienvenido a Nuestra Plataforma</h1>
            <p>Selecciona una opción para continuar:</p>
            <button onClick={() => router.push('/login')} style={{ marginRight: '10px' }}>
                Iniciar Sesión
            </button>
            <button onClick={() => router.push('/events')}>
                Ver Lista de Eventos
            </button>
        </div>
    );
};

export default HomePage;
