import { create } from 'zustand';

type User = { id: string; name: string; email: string; role: 'user' | 'admin' };

type AuthState = {
  user: User | null;
  token: string | null;
  setAuth: (payload: { token: string; user: User }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: ({ token, user }) => {
    localStorage.setItem('token', token);
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));


