"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RegisterAsistente from '../../components/RegisterAsistente'; // Ajusta la ruta si es necesario
import axios from '../../utils/axiosConfig';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
}

const EventDetail = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const searchParams = useSearchParams();
  const eventId = searchParams?.get('eventId') ? parseInt(searchParams.get('eventId')!, 10) : null;

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`/events/${eventId}`);
          setEvent(response.data);
        } catch (error) {
          console.error('Error fetching event:', error);
        }
      };

      fetchEvent();
    }
  }, [eventId]);

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>Fecha: {new Date(event.date).toLocaleDateString()}</p>
      <p>Ubicación: {event.location}</p>
      <RegisterAsistente eventId={event.id} />
    </div>
  );
};

export default EventDetail;
