"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../utils/axiosConfig';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
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

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lista de Eventos</h1>
      {events.length === 0 ? (
        <p style={styles.noEventsText}>No hay eventos disponibles en este momento.</p>
      ) : (
        events.map((event) => (
          <div key={event.id} style={styles.eventCard}>
            <h2 style={styles.eventName}>{event.name}</h2>
            <p style={styles.eventDetail}>Fecha: {new Date(event.date).toLocaleDateString()}</p>
            <p style={styles.eventDetail}>Ubicación: {event.location}</p>
            <button
              style={styles.registerButton}
              onClick={() => router.push(`/events/${event.id}/register`)}
            >
              Registrarse
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  noEventsText: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#777',
  },
  eventCard: {
    border: '1px solid #ccc',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  eventName: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#007bff',
  },
  eventDetail: {
    fontSize: '16px',
    marginBottom: '8px',
    color: '#555',
  },
  registerButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s',
  },
};

export default EventList;
