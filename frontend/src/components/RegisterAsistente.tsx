"use client";

import React, { useState } from 'react';
import axios from '../utils/axiosConfig';

interface RegisterAsistenteFormProps {
  eventId: number;
}

const ALERGENOS = [
  'MILK',
  'EGGS',
  'FISH',
  'CRUSTACEAN_SHELLFISH',
  'TREE_NUTS',
  'PEANUTS',
  'WHEAT',
  'SOYBEANS',
  'SESAME',
  'MUSTARD',
];

const RegisterAsistente: React.FC<RegisterAsistenteFormProps> = ({ eventId }) => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    email: '',
    phone: '',
    alergenos: [] as string[],
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'alergenos') {
      const selectedOptions = Array.from(
        (e.target as HTMLSelectElement).selectedOptions
      ).map((option) => option.value);
      setFormData((prev) => ({
        ...prev,
        alergenos: selectedOptions,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      await axios.post('/asistentes', {
        ...formData,
        eventId,
      });
      setSuccessMessage('Te has registrado exitosamente.');
      setFormData({ name: '', country: '', email: '', phone: '', alergenos: [] });
    } catch (error) {
      setError('Hubo un problema con el registro. Por favor, intenta de nuevo.');
      console.error('Error registrando asistente:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Registro de Asistente</h1>
      {error && <p style={styles.errorText}>{error}</p>}
      {successMessage && <p style={styles.successText}>{successMessage}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>País de Origen:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Email (Opcional):</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Teléfono (Opcional):</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Selecciona Alérgenos (si aplica):</label>
          <select
            name="alergenos"
            multiple
            value={formData.alergenos}
            onChange={handleInputChange}
            style={styles.select}
          >
            {ALERGENOS.map((alergeno) => (
              <option key={alergeno} value={alergeno}>
                {alergeno}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={styles.submitButton}>Registrarse</button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: 'auto',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column', // Ajuste de tipo para cumplir con React.CSSProperties
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as 'column', // Ajuste de tipo para cumplir con React.CSSProperties
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    height: '100px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  errorText: {
    color: 'red',
  },
  successText: {
    color: 'green',
  },
};

export default RegisterAsistente;
