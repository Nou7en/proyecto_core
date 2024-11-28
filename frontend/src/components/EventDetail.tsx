"use client";

import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import { useParams, useRouter } from 'next/navigation';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  budget: number;
  description?: string;
  asistentes: Asistente[];
}

interface Asistente {
  id: number; 
  name: string;
  country: string;
  email?: string;
  phone?: string;
}

const EventDetail = () => {
  // Tipificación para el ID del evento con un valor predeterminado vacío.
  const params = useParams();
  const id = params?.id as string | undefined;

  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(`/events/${id}/full-details`);
          setEvent(response.data);
        } else {
          setError('No se ha proporcionado un ID de evento válido.');
        }
      } catch (error) {
        setError('Error al obtener detalles del evento.');
        console.error('Error fetching event details:', error);
      }
    };
    fetchEventDetails();
  }, [id]);

  if (!event) {
    return <p>{error || 'Cargando detalles del evento...'}</p>;
  }

  const handleCreateMenu = async () => {
    try {
      // Lógica para crear el menú para el evento
      const response = await axios.post(`/events/${event.id}/menu`);
      alert('Menú creado con éxito.');
      console.log('Menu created:', response.data);
    } catch (error) {
      console.error('Error creating menu:', error);
      alert('Error al crear el menú. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{event.name}</h1>
      <p><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Ubicación:</strong> {event.location}</p>
      <p><strong>Presupuesto:</strong> ${event.budget}</p>
      <p><strong>Descripción:</strong> {event.description || 'N/A'}</p>

      <h2 style={styles.subtitle}>Asistentes ({event.asistentes.length})</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Nombre</th>
            <th style={styles.tableHeader}>País</th>
            <th style={styles.tableHeader}>Correo Electrónico</th>
            <th style={styles.tableHeader}>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {event.asistentes.map((asistente) => (
            <tr key={asistente.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{asistente.name}</td>
              <td style={styles.tableCell}>{asistente.country}</td>
              <td style={styles.tableCell}>{asistente.email || 'N/A'}</td>
              <td style={styles.tableCell}>{asistente.phone || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button style={styles.createButton} onClick={handleCreateMenu}>
        Crear Menú para este Evento
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as 'collapse',
    marginBottom: '20px',
  },
  tableHeader: {
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '10px',
    textAlign: 'left' as 'left',
  },
  tableRow: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #dee2e6',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left' as 'left',
  },
  createButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default EventDetail;
