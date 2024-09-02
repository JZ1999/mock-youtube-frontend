// hooks/useLogin.ts

import { useState } from 'react';
import { loginUser } from '../api/api';

interface UseLoginResult {
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
}

const useLogin = (): UseLoginResult => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const receivedToken = await loginUser(email, password);
      setToken(receivedToken);

      // Store the token in localStorage or sessionStorage
      localStorage.setItem('authToken', receivedToken);
      
      // Optionally handle successful login (e.g., redirect or update context)
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { token, loading, error, login };
};

export default useLogin;
