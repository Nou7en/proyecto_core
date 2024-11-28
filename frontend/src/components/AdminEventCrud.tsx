"use client";

import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import { useRouter } from 'next/navigation';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  budget: number;
  description?: string;
  durationHours: number;
}

interface Menu {
  id: number; // Identificador único del menú
  eventId: number; // Añadido para almacenar el ID del evento
  numeroRondas: number;
  detallesRondas: {
    ronda: number;
    bocadillos: {
      nombre: string;
      cantidad: number;
    }[];
  }[];
  budgetRemaining: number;
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
    durationHours: 0,
  });
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [viewEvent, setViewEvent] = useState<Event | null>(null);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

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
      setEditEvent((prev) =>
        prev ? { ...prev, [name]: name === 'budget' || name === 'durationHours' ? parseFloat(value) : value } : null
      );
    } else {
      setNewEvent((prev) => ({
        ...prev,
        [name]: name === 'budget' || name === 'durationHours' ? parseFloat(value) : value,
      }));
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/events', newEvent);
      setEvents((prev) => [...prev, response.data]);
      setNewEvent({ name: '', date: '', location: '', budget: 0, description: '', durationHours: 0 });
      setShowCreateForm(false);
      setError('');
    } catch (error) {
      setError('Error al crear el evento. Por favor, verifica los datos.');
      console.error('Error creando el evento:', error);
    }
  };

  const handleEdit = (event: Event) => {
    const formattedDate = new Date(event.date).toISOString().split('T')[0];
    setEditEvent({ ...event, date: formattedDate });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEvent) return;

    try {
      const updatedEvent = {
        ...editEvent,
        date: new Date(editEvent.date).toISOString(),
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

  const handleView = (event: Event) => {
    setViewEvent(event);
  };

  const handleGenerateMenu = async (eventId: number) => {
    try {
      const response = await axios.post(`/events/${eventId}/generate-menu`);
      setMenu({ ...response.data, eventId }); // Añadir `eventId` al menú para su posterior uso
      setError('');
    } catch (error) {
      setError('Error al generar el menú. Por favor, intenta nuevamente.');
      console.error('Error generating menu:', error);
    }
  }; 

  const handleConfirmMenu = async (eventId: number, menuId: number) => {
    try {
      await axios.post(`/events/${eventId}/confirm-menu/${menuId}`);
      alert('Menú confirmado con éxito');
      setMenu(null);
    } catch (error) {
      console.error('Error al confirmar el menú:', error);
      setError('Error al confirmar el menú. Por favor, intenta nuevamente.');
    }
  };

  const handleRedirectToReports = () => {
    router.push('/reports');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestión de Eventos</h1>
      <button style={styles.createButton} onClick={handleCreateFormToggle}>
        {showCreateForm ? 'Cancelar' : 'Añadir Evento'}
      </button>
      <button style={styles.reportButton} onClick={handleRedirectToReports}>
        Ver Reportes
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
            <label>Duración (en horas):</label>
            <input
              type="number"
              name="durationHours"
              value={newEvent.durationHours}
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
            <label>Duración (en horas):</label>
            <input
              type="number"
              name="durationHours"
              value={editEvent.durationHours}
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
              value={editEvent.description || ''}
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

      {viewEvent && (
        <div style={styles.form}>
          <h2>Detalles del Evento</h2>
          <p><strong>Nombre:</strong> {viewEvent.name}</p>
          <p><strong>Fecha:</strong> {new Date(viewEvent.date).toLocaleDateString()}</p>
          <p><strong>Ubicación:</strong> {viewEvent.location}</p>
          <p><strong>Duración (horas):</strong> {viewEvent.durationHours}</p>
          <p><strong>Presupuesto:</strong> {viewEvent.budget}</p>
          <p><strong>Descripción:</strong> {viewEvent.description}</p>
          <button onClick={() => handleGenerateMenu(viewEvent.id)} style={styles.submitButton}>Generar Menú</button>
          <button onClick={() => setViewEvent(null)} style={styles.submitButton}>Cerrar</button>
        </div>
      )}

      {menu && (
        <div style={styles.form}>
          <h2>Menú Generado</h2>
          <p><strong>Número de Rondas:</strong> {menu.numeroRondas}</p>
          <p><strong>Detalles de Rondas:</strong></p>
          {menu.detallesRondas.map((ronda) => (
            <div key={ronda.ronda}>
              <p><strong>Ronda {ronda.ronda}:</strong></p>
              <ul>
                {ronda.bocadillos.map((bocadillo, index) => (
                  <li key={index}>{bocadillo.nombre} - {bocadillo.cantidad} unidades</li>
                ))}
              </ul>
            </div>
          ))}
          <p><strong>Presupuesto Restante:</strong> {menu.budgetRemaining}</p>
          {menu.eventId && menu.id && (
            <button
              onClick={() => handleConfirmMenu(menu.eventId, menu.id)}
              style={styles.submitButton}
            >
              Confirmar Menú
            </button>
          )}
          <button onClick={() => setMenu(null)} style={styles.submitButton}>Cerrar Menú</button>
        </div>
      )}

      {/* Tabla de eventos */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Nombre</th>
            <th style={styles.tableHeader}>Fecha</th>
            <th style={styles.tableHeader}>Ubicación</th>
            <th style={styles.tableHeader}>Duración (horas)</th>
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
              <td style={styles.tableCell}>{event.durationHours}</td>
              <td style={styles.tableCell}>{event.budget}</td>
              <td style={styles.tableCell}>{event.description}</td>
              <td style={styles.tableCell}>
                <button style={styles.viewButton} onClick={() => handleView(event)}>Ver</button>
                <button style={styles.editButton} onClick={() => handleEdit(event)}>Editar</button>
                <button style={styles.deleteButton} onClick={() => handleDelete(event.id)}>Eliminar</button>
                <button style={styles.generateButton} onClick={() => handleGenerateMenu(event.id)}>Generar Menú</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  reportButton: {
    backgroundColor: '#17a2b8',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '10px',
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
  viewButton: {
    backgroundColor: '#17a2b8',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
    marginRight: '5px',
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
  generateButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

export default AdminEventCRUD;
