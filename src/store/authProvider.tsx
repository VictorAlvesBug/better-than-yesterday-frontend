import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { User, LoginCredentials } from '../types/user.types';
import { toast } from 'react-toastify';
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on mount
useEffect(() => {
  const stored = localStorage.getItem("user");

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(parsed);
    } catch (err) {
      console.error("Invalid user JSON:", err);
      localStorage.removeItem("user");
    }
  }

  setIsLoading(false);
}, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      // TODO: Replace with actual API call
      // Mock implementation for demonstration
      if (credentials.email && credentials.password) {
        const mockUser: User = {
          userId: '1',
          name: 'Usuário Demo',
          email: credentials.email,
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('authToken', 'mock-token');
        toast.success('Login realizado com sucesso!');
        return true;
      }
      toast.error('Credenciais inválidas');
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Erro ao fazer login');
      return false;
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    toast.info('Logout realizado com sucesso');
  };
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  };
  if (isLoading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };