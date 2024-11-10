import React, { useState } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      router.push('/events/admin');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={styles.screenContainer}>
      <div style={styles.container}>
        <h2 style={styles.title}>USER LOGIN</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputContainer}>
            <FaUser style={styles.icon} />
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          {error && <p style={styles.errorText}>{error}</p>}
          <button type="submit" style={styles.button}>LOGIN</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  screenContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#01333d',
  },
  container: {
    backgroundColor: '#0D1B2A',
    borderRadius: '10px',
    padding: '30px',
    width: '100%',
    maxWidth: '400px',
    margin: '20px',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1B263B',
    borderRadius: '30px',
    padding: '5px 15px',
  },
  icon: {
    fontSize: '20px',
    color: '#FFFFFF',
    marginRight: '10px',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: '16px',
  },
  errorText: {
    color: '#E63946',
    fontSize: '14px',
    textAlign: 'center' as 'center', // Añadimos "as 'center'" para que TypeScript lo interprete correctamente.
  },
  button: {
    backgroundColor: '#E63946',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#FFFFFF',
    width: '100%',
  },
};


export default LoginForm;
