import { create } from 'zustand';

type User = { id: string; name: string; email: string; role: 'user' | 'admin' };

type AuthState = {
  user: User | null;
  token: string | null;
  setAuth: (payload: { token: string; user: User }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  const savedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const savedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  return {
    user: savedUser ? (JSON.parse(savedUser) as User) : null,
    token: savedToken,
    setAuth: ({ token, user }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ token, user });
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ token: null, user: null });
    },
  };
});


