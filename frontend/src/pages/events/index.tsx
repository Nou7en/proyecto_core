import React from 'react';
import EventList from '../../components/EventList'; // Ajusta la ruta si es necesario

const EventListPage = () => {
  return (
    <div className="event-list-page">
      <h2>Lista de Eventos</h2>
      <EventList />
    </div>
  );
};

export default EventListPage;
