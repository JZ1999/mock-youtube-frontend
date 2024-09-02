import React, { createContext, useState, ReactNode } from 'react';
import {loginUser} from '../api/api';

interface AuthContextType {
  authenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  token: null,
  loading: false,
  error: null,
  login: () => null,
  logout: () => null
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const localToken = localStorage.getItem("authToken");

  const [authenticated, setAuthenticated] = useState<boolean>(localToken != null);
  const [token, setToken] = useState<string | null>(localToken);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);  

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {

      const receivedToken = await loginUser(username, password);
      setToken(receivedToken);

      localStorage.setItem('authToken', receivedToken);      
      
      setAuthenticated(true);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, token, loading, error}}>
      {children}
    </AuthContext.Provider>
  );
};
