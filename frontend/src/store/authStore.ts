import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      login: (user, token, refreshToken) => {
        document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
        set({ user, token, refreshToken });
      },
      logout: () => {
        document.cookie = 'auth-token=; path=/; max-age=0';
        set({ user: null, token: null, refreshToken: null });
      },
      setUser: (user) => set({ user }),
    }),
    { name: 'auth-storage' },
  ),
);
