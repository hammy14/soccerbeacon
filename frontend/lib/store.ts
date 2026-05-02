import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  login: (user: User, token: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  login: (user, token) => {
    set({ user, token, isAuthenticated: true });
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
}));
