import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Camera, Alert, Report, AppSettings, SystemMetrics } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
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
