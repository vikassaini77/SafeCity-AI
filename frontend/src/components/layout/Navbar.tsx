import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Wifi,
  WifiOff,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppStore, useAuthStore } from '../../store';
import { Badge, LiveBadge } from '../ui';

export function Navbar() {
  const { sidebarCollapsed, unreadAlerts, wsConnected, alerts } = useAppStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const recentAlerts = alerts.slice(0, 5);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 bg-surface/95 backdrop-blur-sm border-b border-gray-800 z-30 flex items-center justify-between px-6 transition-all duration-200',
        sidebarCollapsed ? 'left-[72px]' : 'left-[240px]'
      )}
    >
      {/* Left Section - Search */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search cameras, alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 pl-10 pr-4 py-2 bg-secondary-900/60 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* WebSocket Status */}
        <div className="flex items-center gap-2 text-sm">
          {wsConnected ? (
            <div className="flex items-center gap-1.5 text-accent-green">
              <Wifi className="w-4 h-4" />
              <span className="hidden sm:inline font-mono text-xs">Connected</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-accent-red">
              <WifiOff className="w-4 h-4" />
              <span className="hidden sm:inline font-mono text-xs">Disconnected</span>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadAlerts > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent-red text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadAlerts > 9 ? '9+' : unreadAlerts}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 bg-surface border border-gray-800 rounded-lg shadow-xl overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Recent Alerts</h3>
                  <LiveBadge className="text-[10px]" />
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {recentAlerts.length > 0 ? (
                    recentAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="px-4 py-3 border-b border-gray-800/50 hover:bg-white/5 cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{alert.anomaly_type}</p>
                            <p className="text-xs text-gray-500">{alert.camera_name}</p>
                          </div>
                          <Badge variant={alert.severity as any} size="sm">
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500 text-sm">
                      No new alerts
                    </div>
                  )}
                </div>
                <div className="px-4 py-2 border-t border-gray-800">
                  <NavLink
                    to="/dashboard/alerts"
                    onClick={() => setShowNotifications(false)}
                    className="text-sm text-primary-500 hover:text-primary-400"
                  >
                    View all alerts
                  </NavLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-primary-500" />
              )}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">{user?.full_name || 'User'}</p>
              <p className="text-xs text-gray-500">{user?.role || 'operator'}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-surface border border-gray-800 rounded-lg shadow-xl py-1 overflow-hidden"
              >
                <NavLink
                  to="/dashboard/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Profile
                </NavLink>
                <NavLink
                  to="/dashboard/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </NavLink>
                <hr className="my-1 border-gray-800" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-accent-red hover:bg-white/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
