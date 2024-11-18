"use client";

import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  budget: number;
  description?: string;
}

const AdminEventCRUD = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
    budget: 0,
    description: '',
  });
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleCreateFormToggle = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (editEvent) {
      // Si estamos editando un evento existente, actualizamos `editEvent`
      setEditEvent((prev) =>
        prev ? { ...prev, [name]: name === 'budget' ? parseFloat(value) : value } : null
      );
    } else {
      // Si estamos creando un nuevo evento, actualizamos `newEvent`
      setNewEvent((prev) => ({
        ...prev,
        [name]: name === 'budget' ? parseFloat(value) : value,
      }));
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/events', newEvent);
      setEvents((prev) => [...prev, response.data]);
      setNewEvent({ name: '', date: '', location: '', budget: 0, description: '' });
      setShowCreateForm(false);
      setError('');
    } catch (error) {
      setError('Error al crear el evento. Por favor, verifica los datos.');
      console.error('Error creando el evento:', error);
    }
  };

  const handleEdit = (event: Event) => {
    // Formatear la fecha del evento a `yyyy-MM-dd` para que el input de tipo date la acepte
    const formattedDate = new Date(event.date).toISOString().split('T')[0];
    setEditEvent({ ...event, date: formattedDate });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEvent) return;
  
    try {
      // Convertir la fecha a ISO-8601 si es necesario
      const updatedEvent = {
        ...editEvent,
        date: new Date(editEvent.date).toISOString(), // Convierte la fecha a ISO-8601
      };
  
      await axios.put(`/events/${editEvent.id}`, updatedEvent);
      setEvents((prev) =>
        prev.map((event) => (event.id === editEvent.id ? updatedEvent : event))
      );
      setEditEvent(null);
      setError('');
    } catch (error) {
      setError('Error al editar el evento. Por favor, verifica los datos.');
      console.error('Error editing event:', error);
    }
  };
  

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/events/${id}`);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestión de Eventos</h1>
      <button style={styles.createButton} onClick={handleCreateFormToggle}>
        {showCreateForm ? 'Cancelar' : 'Añadir Evento'}
      </button>

      {showCreateForm && (
        <form onSubmit={handleCreateEvent} style={styles.form}>
          <h2>Crear Evento</h2>
          <div style={styles.formGroup}>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={newEvent.name}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Fecha:</label>
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Ubicación:</label>
            <input
              type="text"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Presupuesto:</label>
            <input
              type="number"
              name="budget"
              value={newEvent.budget}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Descripción:</label>
            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          {error && <p style={styles.errorText}>{error}</p>}
          <button type="submit" style={styles.submitButton}>
            Crear Evento
          </button>
        </form>
      )}

      {editEvent && (
        <form onSubmit={handleEditSubmit} style={styles.form}>
          <h2>Editar Evento</h2>
          <div style={styles.formGroup}>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={editEvent.name}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Fecha:</label>
            <input
              type="date"
              name="date"
              value={editEvent.date}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Ubicación:</label>
            <input
              type="text"
              name="location"
              value={editEvent.location}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Presupuesto:</label>
            <input
              type="number"
              name="budget"
              value={editEvent.budget}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Descripción:</label>
            <textarea
              name="description"
              value={editEvent.description}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          {error && <p style={styles.errorText}>{error}</p>}
          <button type="submit" style={styles.submitButton}>
            Guardar Cambios
          </button>
        </form>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Nombre</th>
            <th style={styles.tableHeader}>Fecha</th>
            <th style={styles.tableHeader}>Ubicación</th>
            <th style={styles.tableHeader}>Presupuesto</th>
            <th style={styles.tableHeader}>Descripción</th>
            <th style={styles.tableHeader}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{event.id}</td>
              <td style={styles.tableCell}>{event.name}</td>
              <td style={styles.tableCell}>{new Date(event.date).toLocaleDateString()}</td>
              <td style={styles.tableCell}>{event.location}</td>
              <td style={styles.tableCell}>{event.budget}</td>
              <td style={styles.tableCell}>{event.description}</td>
              <td style={styles.tableCell}>
                <button style={styles.editButton} onClick={() => handleEdit(event)}>
                  Editar
                </button>
                <button style={styles.deleteButton} onClick={() => handleDelete(event.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Estilos
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  createButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '15px',
  },
  form: {
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  formGroup: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  errorText: {
    color: 'red',
    marginBottom: '10px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
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
  editButton: {
    backgroundColor: '#ffc107',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

export default AdminEventCRUD;
