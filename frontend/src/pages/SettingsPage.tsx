import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Cpu,
  Link,
  Globe,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Mail,
  Save,
  Users,
} from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/ui';
import { defaultSettings } from '../data/mockData';
import toast from 'react-hot-toast';
import type { AppSettings } from '../types';

type TabId = 'general' | 'notifications' | 'security' | 'users' | 'ai' | 'integrations';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'general' as const, label: 'General', icon: SettingsIcon },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'security' as const, label: 'Security', icon: Shield },
    { id: 'users' as const, label: 'User Management', icon: Users },
    { id: 'ai' as const, label: 'AI Model', icon: Cpu },
    { id: 'integrations' as const, label: 'Integrations', icon: Link },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success('Settings saved successfully!');
  };

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Settings</h1>
          <p className="text-gray-400 text-sm mt-1">
            Configure your platform preferences
          </p>
        </div>

        <Button onClick={handleSave} isLoading={isSaving}>
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <Card padding="sm" className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-500/10 text-primary-500'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Content */}
        <Card className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'general' && (
              <motion.div
                key="general"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-heading font-bold text-white">General Settings</h2>

                <Input
                  label="Platform Name"
                  value={settings.platform_name}
                  onChange={(e) => updateSetting('platform_name', e.target.value)}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Timezone</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => updateSetting('timezone', e.target.value)}
                      className="w-full px-4 py-3 bg-secondary-900/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Date Format</label>
                    <select
                      value={settings.date_format}
                      onChange={(e) => updateSetting('date_format', e.target.value)}
                      className="w-full px-4 py-3 bg-secondary-900/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Theme</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateSetting('theme', 'dark')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
                        settings.theme === 'dark'
                          ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                          : 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
                      }`}
                    >
                      <Moon className="w-4 h-4" />
                      Dark
                    </button>
                    <button
                      onClick={() => updateSetting('theme', 'light')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
                        settings.theme === 'light'
                          ? 'border-primary-500 bg-primary-500/10 text-primary-500'
                          : 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
                      }`}
                    >
                      <Sun className="w-4 h-4" />
                      Light
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => updateSetting('language', e.target.value)}
                    className="w-full px-4 py-3 bg-secondary-900/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-heading font-bold text-white">Notification Settings</h2>

                <div className="flex items-center justify-between p-4 bg-secondary-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Email Alerts</p>
                      <p className="text-sm text-gray-500">Receive alert notifications via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.email_alerts}
                      onChange={(e) => updateSetting('email_alerts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-primary-500/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>

                {settings.email_alerts && (
                  <Input
                    label="Alert Email Recipient"
                    type="email"
                    value={settings.alert_email}
                    onChange={(e) => updateSetting('alert_email', e.target.value)}
                  />
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Alert Severity Threshold
                  </label>
                  <select
                    value={settings.alert_severity_threshold}
                    onChange={(e) => updateSetting('alert_severity_threshold', e.target.value as any)}
                    className="w-full px-4 py-3 bg-secondary-900/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  >
                    <option value="low">Low and above</option>
                    <option value="medium">Medium and above</option>
                    <option value="high">High and above</option>
                    <option value="critical">Critical only</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {settings.notification_sound ? (
                      <Volume2 className="w-5 h-5 text-gray-400" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <p className="text-white font-medium">Notification Sound</p>
                      <p className="text-sm text-gray-500">Play sound for critical alerts</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notification_sound}
                      onChange={(e) => updateSetting('notification_sound', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-primary-500/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>

                <Input
                  label="Webhook URL"
                  value={settings.webhook_url || ''}
                  onChange={(e) => updateSetting('webhook_url', e.target.value)}
                  placeholder="https://your-webhook-endpoint.com/alerts"
                  helpText="External endpoint to receive alert notifications"
                />
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-heading font-bold text-white">Security Settings</h2>

                <Card className="bg-secondary-900/50 border-gray-700">
                  <h3 className="text-white font-medium mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <Input label="Current Password" type="password" />
                    <Input label="New Password" type="password" />
                    <Input label="Confirm New Password" type="password" />
                    <Button size="sm">Update Password</Button>
                  </div>
                </Card>

                <div className="flex items-center justify-between p-4 bg-secondary-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">Enable 2FA</Button>
                </div>

                <Card className="bg-secondary-900/50 border-gray-700">
                  <h3 className="text-white font-medium mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-primary-500" />
                        </div>
                        <div>
                          <p className="text-white text-sm">Chrome on MacOS</p>
                          <p className="text-xs text-gray-500">San Francisco, CA • Current session</p>
                        </div>
                      </div>
                      <Badge variant="success">Current</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-white text-sm">Safari on iPhone</p>
                          <p className="text-xs text-gray-500">San Francisco, CA • 2 hours ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Revoke</Button>
                    </div>
                  </div>
                </Card>

                <Card className="bg-secondary-900/50 border-gray-700">
                  <h3 className="text-white font-medium mb-4">API Keys</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                      <div>
                        <p className="text-white text-sm font-mono">sk_live_...</p>
                        <p className="text-xs text-gray-500">Created: Jan 15, 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">Copy</Button>
                        <Button variant="ghost" size="sm" className="text-accent-red">Revoke</Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="mt-4">
                    Generate New Key
                  </Button>
                </Card>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-heading font-bold text-white">User Management</h2>
                  <Button size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Invite User
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-800 text-sm text-gray-400">
                        <th className="py-3 px-4 font-medium">User</th>
                        <th className="py-3 px-4 font-medium">Role</th>
                        <th className="py-3 px-4 font-medium">Status</th>
                        <th className="py-3 px-4 font-medium">Last Active</th>
                        <th className="py-3 px-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-800/50">
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center font-bold text-xs">AJ</div>
                            <div>
                              <div className="text-white font-medium">Alex Johnson</div>
                              <div className="text-gray-500 text-xs">alex@safecity.ai</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4"><Badge variant="default">Admin</Badge></td>
                        <td className="py-3 px-4"><Badge variant="success">Active</Badge></td>
                        <td className="py-3 px-4 text-gray-400">Just now</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">SC</div>
                            <div>
                              <div className="text-white font-medium">Sarah Chen</div>
                              <div className="text-gray-500 text-xs">sarah@safecity.ai</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4"><Badge variant="warning">Analyst</Badge></td>
                        <td className="py-3 px-4"><Badge variant="success">Active</Badge></td>
                        <td className="py-3 px-4 text-gray-400">2 hours ago</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-700 text-gray-400 flex items-center justify-center font-bold text-xs">MR</div>
                            <div>
                              <div className="text-white font-medium">Mike Ross</div>
                              <div className="text-gray-500 text-xs">mike@safecity.ai</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4"><Badge variant="error">Viewer</Badge></td>
                        <td className="py-3 px-4"><Badge variant="warning">Invited</Badge></td>
                        <td className="py-3 px-4 text-gray-400">Never</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Resend</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-heading font-bold text-white">AI Model Settings</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Inference Backend
                  </label>
                  <select
                    value={settings.inference_backend}
                    onChange={(e) => updateSetting('inference_backend', e.target.value as any)}
                    className="w-full px-4 py-3 bg-secondary-900/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  >
                    <option value="pytorch">PyTorch</option>
                    <option value="onnx">ONNX Runtime</option>
                    <option value="tensorrt">TensorRT</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">TensorRT provides the best performance</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Detection Confidence Threshold: {(settings.detection_confidence * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={settings.detection_confidence}
                    onChange={(e) => updateSetting('detection_confidence', parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum confidence for detections</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    NMS Threshold: {(settings.nms_threshold * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={settings.nms_threshold}
                    onChange={(e) => updateSetting('nms_threshold', parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Non-maximum suppression threshold</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Max Detections per Frame: {settings.max_detections}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="10"
                    value={settings.max_detections}
                    onChange={(e) => updateSetting('max_detections', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <Card className="bg-secondary-900/50 border-gray-700">
                  <h3 className="text-white font-medium mb-4">Model Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Model Version</p>
                      <p className="text-white font-mono">yolov8n-v1.0</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Input Size</p>
                      <p className="text-white font-mono">640x640</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Classes</p>
                      <p className="text-white font-mono">80 (COCO)</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Avg Latency</p>
                      <p className="text-white font-mono">28.4 ms</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'integrations' && (
              <motion.div
                key="integrations"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-heading font-bold text-white">Integrations</h2>

                <Card className="bg-secondary-900/50 border-gray-700">
                  <h3 className="text-white font-medium mb-4">Webhook Endpoints</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-accent-green`} />
                        <div>
                          <p className="text-white text-sm font-mono">https://api.example.com/webhook</p>
                          <p className="text-xs text-gray-500">Alert delivery • 2s avg response</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-accent-red">Remove</Button>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="mt-4">
                    Add Endpoint
                  </Button>
                </Card>

                <Card className="bg-secondary-900/50 border-gray-700">
                  <h3 className="text-white font-medium mb-4">Slack Integration</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#4A154B]/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#E01E5A]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.528-2.528 2.528 2.528 0 0 1 2.528-2.528h2.528v2.528a2.528 2.528 0 0 1-2.528 2.528z"/>
                          <path d="M5.042 10.637a2.528 2.528 0 0 1-2.528-2.528 2.528 2.528 0 0 1 2.528-2.528h2.528v2.528a2.528 2.528 0 0 1-2.528 2.528z"/>
                          <path d="M10.57 10.637H8.042V5.581a2.528 2.528 0 0 1 2.528-2.528 2.528 2.528 0 0 1 2.528 2.528v2.528a2.528 2.528 0 0 1-2.528 2.528z"/>
                          <path d="M13.098 15.165a2.528 2.528 0 0 1-2.528-2.528V10.11h2.528a2.528 2.528 0 0 1 2.528 2.528 2.528 2.528 0 0 1-2.528 2.528z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white">Not Connected</p>
                        <p className="text-sm text-gray-500">Send alerts to Slack channels</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">Connect</Button>
                  </div>
                </Card>

                <Card className="bg-secondary-900/50 border-gray-700">
                  <h3 className="text-white font-medium mb-4">Email SMTP Configuration</h3>
                  <div className="space-y-4">
                    <Input label="SMTP Host" placeholder="smtp.gmail.com" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Port" type="number" placeholder="587" />
                      <Input label="Username" placeholder="your-email@gmail.com" />
                    </div>
                    <Input label="Password" type="password" placeholder="••••••••" />
                    <Button variant="secondary" size="sm">Test Connection</Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}
