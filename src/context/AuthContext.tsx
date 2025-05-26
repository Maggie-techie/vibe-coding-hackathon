import { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  role: string;
  exp: number;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Token is expired
          localStorage.removeItem('auth_token');
          setIsAuthenticated(false);
          setUser(null);
        } else {
          // Token is valid
          setUser({
            id: decoded.sub,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Invalid token
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('auth_token', token);
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setUser({
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error decoding token', error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};