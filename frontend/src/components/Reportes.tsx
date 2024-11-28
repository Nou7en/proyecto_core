"use client";

import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

interface PlatoReporte {
  nombre: string;
  repeticiones: number;
}

interface AlergenoReporte {
  nombre: string;   
  repeticiones: number;
}

const Reportes = () => {
  const [platos, setPlatos] = useState<PlatoReporte[]>([]);
  const [alergenos, setAlergenos] = useState<AlergenoReporte[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const platosResponse = await axios.get('/events/reportes/platos');
        setPlatos(platosResponse.data);

        const alergenosResponse = await axios.get('/events/reportes/alergenos');
        setAlergenos(alergenosResponse.data);
      } catch (error) {
        setError('Error al obtener los reportes. Por favor, intenta nuevamente.');
        console.error('Error fetching reports:', error);
      }
    };

    fetchReportes();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reportes</h1>
      
      {error && <p style={styles.errorText}>{error}</p>}

      <div style={styles.reportSection}>
        <h2>Platos Más Repetidos</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Plato</th>
              <th style={styles.tableHeader}>Repeticiones</th>
            </tr>
          </thead>
          <tbody>
            {platos.map((plato, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>{plato.nombre}</td>
                <td style={styles.tableCell}>{plato.repeticiones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.reportSection}>
        <h2>Alérgenos Más Comunes</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Alergeno</th>
              <th style={styles.tableHeader}>Repeticiones</th>
            </tr>
          </thead>
          <tbody>
            {alergenos.map((alergeno, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>{alergeno.nombre}</td>
                <td style={styles.tableCell}>{alergeno.repeticiones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  reportSection: {
    marginBottom: '40px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as 'collapse', // Cambia el valor aquí
    marginBottom: '20px',
  },
  tableHeader: {
    border: '1px solid #ddd',
    padding: '8px',
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  errorText: {
    color: 'red',
  },
};

export default Reportes;
