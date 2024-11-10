"use client";

import { useRouter, useParams } from 'next/navigation';
import RegisterAsistente from '../../../components/RegisterAsistente';

export default function RegisterAsistentePage() {
  // Utilizamos `useParams` para obtener el ID del evento desde la URL
  const params = useParams();
  const idParam = params?.id;

  // Validar si `idParam` está definido antes de usarlo en `parseInt`
  const eventId = idParam ? parseInt(idParam, 10) : null;

  // Validamos si `eventId` es válido
  if (!eventId || isNaN(eventId)) {
    return <p>Error: No se proporcionó un ID de evento válido.</p>;
  }

  // Pasamos `eventId` al componente de registro del asistente
  return <RegisterAsistente eventId={eventId} />;
}
