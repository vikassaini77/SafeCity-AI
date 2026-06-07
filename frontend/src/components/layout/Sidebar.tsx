import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Video,
  AlertTriangle,
  BarChart3,
  Camera,
  FileText,
  Activity,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppStore, useAuthStore } from '../../store';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Video, label: 'Live Feeds', path: '/dashboard/live-feeds' },
  { icon: AlertTriangle, label: 'Alert Center', path: '/dashboard/alerts' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Camera, label: 'Cameras', path: '/dashboard/cameras' },
  { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
  { icon: Activity, label: 'System', path: '/dashboard/system' },
];

const bottomNavItems = [
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 72 : 240 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-surface border-r border-gray-800 flex flex-col z-40"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-800 px-4">
        <NavLink to="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-500/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-500" />
          </div>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-heading font-bold text-white"
            >
              SafeCity <span className="text-primary-500">AI</span>
            </motion.span>
          )}
        </NavLink>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path === '/dashboard' && location.pathname === '/dashboard');
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-primary-500/10 text-primary-500'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!sidebarCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-8 bg-primary-500 rounded-r"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="py-4 border-t border-gray-800">
        <div className="space-y-1 px-2">
          {bottomNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-primary-500/10 text-primary-500'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        className="h-12 flex items-center justify-center border-t border-gray-800 text-gray-500 hover:text-white transition-colors"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>
    </motion.aside>
  );
}
