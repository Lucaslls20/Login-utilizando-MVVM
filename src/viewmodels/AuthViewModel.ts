import { useState, useEffect } from 'react';
import { authService } from '../services/AuthService';

export const useAuthViewModel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError('Formato de e-mail inválido');
      return;
    }

    setIsLoading(true);
    try {
      await authService.login(email, password);
      setIsAuthenticated(true);
    } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Erro ao fazer login');
        } else {
          setError('An unexpected error occurred.'); 
          console.error("Unexpected error:", err); 
        }
      }
 finally {
      setIsLoading(false);
    }
  };

  // Verificar autenticação inicial
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authService.checkAuth();
      setIsAuthenticated(isAuth);
    };
    checkAuth();
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    isAuthenticated,
    handleLogin,
    setError,
  };
};