import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Camera, Alert, Report, AppSettings, SystemMetrics } from '../types';
import { fetchWithAuth } from '../lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (profileData: any) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      logout: () => {
        localStorage.removeItem('safecity-token');
        set({ user: null, isAuthenticated: false, isLoading: false });
      },
      setLoading: (isLoading) => set({ isLoading }),
      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const data = await fetchWithAuth('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
          });
          localStorage.setItem('safecity-token', data.access_token);
          set({ user: data.user as User, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      register: async (userData) => {
        set({ isLoading: true });
        try {
          await fetchWithAuth('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
          });
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      checkAuth: async () => {
        const token = localStorage.getItem('safecity-token');
        if (!token) return;
        
        try {
          const user = await fetchWithAuth('/api/auth/me');
          set({ user: user as User, isAuthenticated: true });
        } catch (error) {
          localStorage.removeItem('safecity-token');
          set({ user: null, isAuthenticated: false });
        }
      },
      updateProfile: async (profileData) => {
        try {
          const updatedUser = await fetchWithAuth('/api/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData)
          });
          set({ user: updatedUser as User });
        } catch (error) {
          throw error;
        }
      },
      uploadProfilePicture: async (file: File) => {
        try {
          const formData = new FormData();
          formData.append('file', file);
          
          const token = localStorage.getItem('safecity-token');
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/api/auth/profile/picture`, {
            method: 'POST',
            headers: token ? { 'Authorization': `Bearer ${token}` } : {},
            body: formData
          });
          
          if (!response.ok) throw new Error('Failed to upload picture');
          const data = await response.json();
          
          set((state) => ({
            user: state.user ? { ...state.user, profile_picture: data.profile_picture } : null
          }));
        } catch (error) {
          throw error;
        }
      }
    }),
    {
      name: 'safecity-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

interface AppState {
  sidebarCollapsed: boolean;
  cameras: Camera[];
  alerts: Alert[];
  reports: Report[];
  systemMetrics: SystemMetrics | null;
  settings: AppSettings | null;
  unreadAlerts: number;
  wsConnected: boolean;
  toggleSidebar: () => void;
  setCameras: (cameras: Camera[]) => void;
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  setReports: (reports: Report[]) => void;
  setSystemMetrics: (metrics: SystemMetrics) => void;
  setSettings: (settings: AppSettings) => void;
  setWsConnected: (connected: boolean) => void;
  markAlertsRead: () => void;
}

export const useAppStore = create<AppState>()((set) => ({
  sidebarCollapsed: false,
  cameras: [],
  alerts: [],
  reports: [],
  systemMetrics: null,
  settings: null,
  unreadAlerts: 0,
  wsConnected: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setCameras: (cameras) => set({ cameras }),
  setAlerts: (alerts) => set({ alerts }),
  addAlert: (alert) => set((state) => ({
    alerts: [alert, ...state.alerts],
    unreadAlerts: state.unreadAlerts + 1,
  })),
  setReports: (reports) => set({ reports }),
  setSystemMetrics: (systemMetrics) => set({ systemMetrics }),
  setSettings: (settings) => set({ settings }),
  setWsConnected: (wsConnected) => set({ wsConnected }),
  markAlertsRead: () => set({ unreadAlerts: 0 }),
}));
