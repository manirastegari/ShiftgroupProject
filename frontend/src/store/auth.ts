import { create } from 'zustand';

type User = { id: string; name: string; email: string; role: 'user' | 'admin' };

type AuthState = {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
  setAuth: (payload: { token: string; user: User }) => void;
  logout: () => void;
  initialize: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  const initialize = () => {
    if (typeof window === 'undefined') return;
    
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      try {
        const user = JSON.parse(savedUser) as User;
        set({ token: savedToken, user, isInitialized: true });
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ token: null, user: null, isInitialized: true });
      }
    } else {
      set({ token: null, user: null, isInitialized: true });
    }
  };

  return {
    user: null,
    token: null,
    isInitialized: false,
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
    initialize,
  };
});


