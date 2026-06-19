import { create } from 'zustand';
import { AuthService } from '../services/auth';

interface UserInfo {
  id: number;
  username: string;
  email: string;
  token: string;
}

interface AuthState {
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initializeAuth: () => void;
  setLoading: (loading: boolean) => void; // Added setter for loading
  setError: (error: string | null) => void; // Added setter for error
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  initializeAuth: () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        set({ user });
      } catch (e) {
        console.error("Failed to parse stored user data:", e);
        localStorage.removeItem('user');
      }
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await AuthService.login({ email, password });
      const user: UserInfo = { ...response, username: response.username || response.email, token: response.token };
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Login failed', loading: false });
      throw err; // Re-throw to allow component to catch and display specific messages
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));