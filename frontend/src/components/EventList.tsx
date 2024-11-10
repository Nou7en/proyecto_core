"use client"; // Agrega esta línea al principio

import { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);

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
    <div>
      <h1>Lista de Eventos</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.name}</h2>
          <p>Fecha: {new Date(event.date).toLocaleDateString()}</p>
          <p>Ubicación: {event.location}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
