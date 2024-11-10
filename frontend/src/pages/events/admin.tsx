import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminEventCrud from '../../components/AdminEventCrud'; // Ajusta la ruta si es necesario

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      <h1>Bienvenido al panel de administración</h1>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Cerrar Sesión
      </button>
      <AdminEventCrud />
    </div>
  );
};

const styles = {
  logoutButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '10px 0',
  },
};

export default AdminPage;
