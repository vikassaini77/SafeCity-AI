import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  User,
  Shield,
  Cpu,
  Video,
  Bell,
  Palette,
  Database,
  Map,
  BarChart,
  Bot,
  Activity,
  Server,
  Zap,
  X,
  MessageSquare
} from 'lucide-react';
import { Card } from '../../components/ui';

// Import Tabs
import AccountSettings from './tabs/AccountSettings';
import SecurityCenter from './tabs/SecurityCenter';
import AIConfiguration from './tabs/AIConfiguration';
import CameraManagement from './tabs/CameraManagement';
import NotificationCenter from './tabs/NotificationCenter';
import AppearanceSettings from './tabs/AppearanceSettings';
import DataPrivacy from './tabs/DataPrivacy';
import SmartCityConfig from './tabs/SmartCityConfig';
import AnalyticsSettings from './tabs/AnalyticsSettings';

// AI Assistant
import AIAssistantPanel from './components/AIAssistantPanel';

type TabId =
  | 'account'
  | 'security'
  | 'ai'
  | 'cameras'
  | 'notifications'
  | 'appearance'
  | 'privacy'
  | 'smartcity'
  | 'analytics';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('account');
  const [systemHealth, setSystemHealth] = useState(100);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  // Simulate dynamic health
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(98 + Math.random() * 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const tabCategories = [
    {
      title: "Personal",
      tabs: [
        { id: 'account' as const, label: 'Account Settings', icon: User },
        { id: 'appearance' as const, label: 'Appearance', icon: Palette },
        { id: 'notifications' as const, label: 'Notification Center', icon: Bell },
      ]
    },
    {
      title: "System",
      tabs: [
        { id: 'security' as const, label: 'Security Center', icon: Shield },
        { id: 'cameras' as const, label: 'Camera Management', icon: Video },
        { id: 'privacy' as const, label: 'Data & Privacy', icon: Database },
      ]
    },
    {
      title: "Advanced",
      tabs: [
        { id: 'ai' as const, label: 'AI Configuration', icon: Cpu },
        { id: 'smartcity' as const, label: 'Smart City Config', icon: Map },
        { id: 'analytics' as const, label: 'Analytics Settings', icon: BarChart },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] -m-6 relative overflow-hidden">
      {/* Command Center Status Bar */}
      <div className="flex items-center justify-between px-6 py-2 bg-secondary-900 border-b border-gray-800 text-xs shrink-0 z-20 shadow-md">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
            </span>
            <span className="text-gray-400 font-mono tracking-wider uppercase">System Health: {systemHealth.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-primary-500" />
            <span className="text-gray-400 font-mono tracking-wider uppercase">Nodes Active: 142/142</span>
          </div>
          <div className="flex items-center gap-2">
            <Server className="w-3 h-3 text-blue-500" />
            <span className="text-gray-400 font-mono tracking-wider uppercase">Infra: OP-ALPHA-1</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span className="text-gray-400 font-mono tracking-wider uppercase">Compute: TensorRT Max</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-mono tracking-wider uppercase">Version: v4.2.1-Enterprise</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Navigation */}
        <div className="w-72 bg-secondary-900/50 border-r border-gray-800 flex flex-col shrink-0 z-10 shadow-2xl">
          <div className="p-6">
            <h1 className="text-xl font-heading font-bold text-white tracking-wide">Configuration</h1>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-mono">Command Center</p>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 pb-6 space-y-6 custom-scrollbar">
            {tabCategories.map((category, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3 px-4">{category.title}</h3>
                <div className="space-y-1">
                  {category.tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ${
                        activeTab === tab.id
                          ? 'text-white bg-primary-500/10 shadow-[inset_0_0_20px_rgba(0,242,255,0.05)]'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-r-full shadow-[0_0_10px_rgba(0,242,255,0.5)]"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <tab.icon className={`w-5 h-5 transition-transform duration-300 ${activeTab === tab.id ? 'text-primary-500 scale-110' : 'group-hover:scale-110'}`} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden flex flex-col bg-background/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-blue/5 pointer-events-none" />
          
          <main className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar relative z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="max-w-6xl mx-auto w-full"
              >
                {activeTab === 'account' && <AccountSettings />}
                {activeTab === 'security' && <SecurityCenter />}
                {activeTab === 'ai' && <AIConfiguration />}
                {activeTab === 'cameras' && <CameraManagement />}
                {activeTab === 'notifications' && <NotificationCenter />}
                {activeTab === 'appearance' && <AppearanceSettings />}
                {activeTab === 'privacy' && <DataPrivacy />}
                {activeTab === 'smartcity' && <SmartCityConfig />}
                {activeTab === 'analytics' && <AnalyticsSettings />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* AI Assistant Overlay */}
        <AnimatePresence>
          {isAIPanelOpen && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-secondary-900/95 backdrop-blur-3xl border-l border-gray-800 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-40 flex flex-col"
            >
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between p-4 border-b border-gray-800 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary-500/20 border border-primary-500/50 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-500" />
                  </div>
                  <h3 className="font-heading font-bold text-white tracking-wide text-sm">SafeCity Sentinel</h3>
                </div>
                <button 
                  onClick={() => setIsAIPanelOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-hidden p-6 relative">
                <AIAssistantPanel activeTab={activeTab} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB for AI Assistant */}
        <AnimatePresence>
          {!isAIPanelOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAIPanelOpen(true)}
              className="absolute bottom-8 right-8 w-14 h-14 bg-primary-500 hover:bg-primary-400 text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.4)] z-30 group overflow-hidden"
            >
              <div className="absolute inset-0 rounded-full border-2 border-primary-500 animate-ping opacity-20" />
              <Bot className="w-7 h-7 relative z-10 transition-transform group-hover:scale-110 group-hover:rotate-12" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
