import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../../utils/axiosConfig';
import RegisterForm from '../../components/RegisterForm'; // Importación añadida

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
}

const EventDetail = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`/events/${id}`);
          setEvent(response.data);
        } catch (error) {
          console.error('Error fetching event:', error);
        }
      };

      fetchEvent();
    }
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>Fecha: {new Date(event.date).toLocaleDateString()}</p>
      <p>Ubicación: {event.location}</p>
      <RegisterForm eventId={parseInt(id as string, 10)} />
    </div>
  );
};

export default EventDetail;
