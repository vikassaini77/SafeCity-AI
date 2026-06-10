import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, BadgeCheck, Clock, Shield, Monitor, 
  Edit2, Activity, Target, AlertTriangle, TrendingUp, Award, Zap,
  Lock, Key, Server, Cpu, Navigation, Bell, BarChart2, Star, CheckCircle2
} from 'lucide-react';
import { Card, Button, Badge, Input, Modal } from '../components/ui';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store';

const performanceData = [
  { name: 'Mon', incidents: 40, resolved: 38 },
  { name: 'Tue', incidents: 30, resolved: 30 },
  { name: 'Wed', incidents: 45, resolved: 41 },
  { name: 'Thu', incidents: 50, resolved: 48 },
  { name: 'Fri', incidents: 35, resolved: 33 },
  { name: 'Sat', incidents: 20, resolved: 20 },
  { name: 'Sun', incidents: 25, resolved: 24 },
];

const usageData = [
  { name: 'Week 1', logins: 120, reports: 15 },
  { name: 'Week 2', logins: 132, reports: 18 },
  { name: 'Week 3', logins: 101, reports: 10 },
  { name: 'Week 4', logins: 145, reports: 22 },
];

export default function ProfilePage() {
  const { user, updateProfile, uploadProfilePicture } = useAuthStore();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAuditLogOpen, setIsAuditLogOpen] = useState(false);
  
  const [profile, setProfile] = useState({
    name: user?.name || 'Alexander Director',
    role: user?.role === 'admin' ? 'Senior Administrator' : 'Senior Surveillance Operations Manager',
    org: (user as any)?.organization || 'National Command Authority',
    department: (user as any)?.department || 'Threat Intelligence Div.',
    email: user?.email || 'director@command.gov',
    phone: (user as any)?.phone || '+1 (555) 019-8472',
    location: (user as any)?.location || 'Sector 7G, Metropolis',
    employeeId: (user as any)?.employee_id || `OP-${Math.floor(Math.random() * 900) + 100}-ALPHA`
  });

  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        role: user.role === 'admin' ? 'Senior Administrator' : prev.role,
        org: (user as any).organization || prev.org,
        department: (user as any).department || prev.department,
        phone: (user as any).phone || prev.phone,
        location: (user as any).location || prev.location,
        employeeId: (user as any).employee_id || prev.employeeId,
      }));
    }
  }, [user]);

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        name: profile.name,
        email: profile.email,
        department: profile.department,
        organization: profile.org,
        phone: profile.phone,
        location: profile.location,
        employee_id: profile.employeeId
      });
      toast.success('Profile updated securely.');
      setIsEditProfileOpen(false);
    } catch (err) {
      toast.error('Failed to update profile.');
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto px-4 md:px-8 mt-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-heading font-bold text-white tracking-wide">Operator Profile Center</h2>
          <p className="text-gray-400 mt-1 font-mono text-sm uppercase tracking-wider">Identity & Operations Dashboard</p>
        </div>
        <Badge variant="success" className="animate-pulse flex items-center gap-2 px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-current" />
          On Duty - Available
        </Badge>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Identity, Badges, AI */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Profile Hero Card */}
          <Card className="relative overflow-hidden border-primary-500/30 bg-secondary-900/60 backdrop-blur-xl shadow-[0_0_30px_rgba(0,242,255,0.1)]">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary-500/20 via-transparent to-accent-blue/20" />
            
            <div className="relative pt-8 px-6 pb-6 flex flex-col items-center text-center">
              <div className="relative group cursor-pointer mb-4">
                <input 
                  type="file" 
                  id="avatar-upload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        toast.loading('Uploading picture...', { id: 'upload' });
                        await uploadProfilePicture(file);
                        toast.success('Profile picture updated!', { id: 'upload' });
                      } catch (err) {
                        toast.error('Upload failed.', { id: 'upload' });
                      }
                    }
                  }}
                />
                <label htmlFor="avatar-upload" className="block cursor-pointer">
                  <div className="w-28 h-28 rounded-full bg-secondary-900 border-4 border-primary-500/50 shadow-[0_0_20px_rgba(0,242,255,0.3)] overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 relative">
                    {(user as any)?.profile_picture ? (
                      <img src={`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}${(user as any).profile_picture}`} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-primary-500" />
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                      <Edit2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </label>
                <div className="absolute bottom-0 right-0 bg-accent-green text-background text-xs font-bold px-2 py-1 rounded-full border-2 border-background shadow-lg flex items-center gap-1 z-10">
                  <Shield className="w-3 h-3" /> Lvl 5
                </div>
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-white tracking-wide">{profile.name}</h3>
              <p className="text-primary-400 font-mono text-xs uppercase tracking-widest mt-1 mb-4">{profile.role}</p>
              
              <div className="w-full grid grid-cols-2 gap-2 text-left mb-6">
                <div className="bg-black/20 p-3 rounded-lg border border-gray-800">
                  <p className="text-gray-500 text-[10px] font-mono uppercase">ID Number</p>
                  <p className="text-gray-200 font-mono text-sm">{profile.employeeId}</p>
                </div>
                <div className="bg-black/20 p-3 rounded-lg border border-gray-800">
                  <p className="text-gray-500 text-[10px] font-mono uppercase">Department</p>
                  <p className="text-gray-200 text-sm truncate">{profile.department}</p>
                </div>
              </div>

              <div className="w-full space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>{profile.location}</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 shadow-[0_0_15px_rgba(0,242,255,0.4)]" onClick={() => setIsEditProfileOpen(true)}>
                Update Profile
              </Button>
            </div>
          </Card>

          {/* AI Assistant Insights */}
          <Card className="border-accent-blue/30 bg-gradient-to-br from-accent-blue/5 to-transparent relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-accent-blue/10">
              <Cpu className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4 uppercase tracking-widest font-mono">
                <Zap className="w-4 h-4 text-accent-blue" /> AI Operator Insights
              </h3>
              <ul className="space-y-3">
                <li className="bg-black/30 border border-accent-blue/20 p-3 rounded-lg text-sm text-gray-300 flex gap-3 items-start">
                  <TrendingUp className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <span>You handled <strong className="text-white">18% more incidents</strong> this month than average.</span>
                </li>
                <li className="bg-black/30 border border-accent-blue/20 p-3 rounded-lg text-sm text-gray-300 flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                  <span>Response efficiency increased by 12%.</span>
                </li>
                <li className="bg-black/30 border border-accent-blue/20 p-3 rounded-lg text-sm text-gray-300 flex gap-3 items-start">
                  <AlertTriangle className="w-4 h-4 text-accent-yellow shrink-0 mt-0.5" />
                  <span>Three high-priority alerts in Sector 7 require your review.</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Gamified Badges */}
          <Card className="border-gray-800/50 bg-secondary-900/40">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4 uppercase tracking-widest font-mono">
              <Award className="w-4 h-4 text-accent-yellow" /> Achievements & Badges
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-accent-yellow/10 to-transparent border border-accent-yellow/30 p-3 rounded-xl flex flex-col items-center text-center group cursor-pointer">
                <Star className="w-8 h-8 text-accent-yellow mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white">Elite Responder</span>
                <span className="text-[10px] text-gray-400 mt-1">Top 5% Resolution</span>
              </div>
              <div className="bg-gradient-to-br from-primary-500/10 to-transparent border border-primary-500/30 p-3 rounded-xl flex flex-col items-center text-center group cursor-pointer">
                <Target className="w-8 h-8 text-primary-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white">AI Ops Expert</span>
                <span className="text-[10px] text-gray-400 mt-1">10k Objects Tagged</span>
              </div>
              <div className="bg-gradient-to-br from-accent-green/10 to-transparent border border-accent-green/30 p-3 rounded-xl flex flex-col items-center text-center group cursor-pointer">
                <Shield className="w-8 h-8 text-accent-green mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white">Safety Guardian</span>
                <span className="text-[10px] text-gray-400 mt-1">Zero Breach Record</span>
              </div>
              <div className="bg-black/20 border border-gray-800 p-3 rounded-xl flex flex-col items-center text-center opacity-50 grayscale">
                <Award className="w-8 h-8 text-gray-500 mb-2" />
                <span className="text-xs font-bold text-white">Command Leader</span>
                <span className="text-[10px] text-gray-500 mt-1">Locked</span>
              </div>
            </div>
          </Card>
        </div>

        {/* MIDDLE & RIGHT COLUMNS */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Operator Performance KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Incidents Reviewed', value: '1,284', icon: Activity, color: 'text-primary-500', trend: '+12%' },
              { label: 'Critical Alerts', value: '87', icon: AlertTriangle, color: 'text-accent-red', trend: '-5%' },
              { label: 'Avg Resolution', value: '2.4m', icon: Clock, color: 'text-accent-blue', trend: '-18s' },
              { label: 'Response Accuracy', value: '99.8%', icon: Target, color: 'text-accent-green', trend: '+0.2%' },
            ].map((stat, i) => (
              <Card key={i} className="border-gray-800/50 bg-secondary-900/60 p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-xs font-mono text-accent-green">{stat.trend}</span>
                </div>
                <h4 className="text-3xl font-heading font-bold text-white my-1">{stat.value}</h4>
                <p className="text-xs text-gray-500 font-mono uppercase">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Interactive Performance Chart */}
          <Card className="border-gray-800/50 bg-secondary-900/60 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-primary-500" /> Operational Performance
                </h3>
                <p className="text-xs text-gray-400 mt-1">Incidents handled vs resolved over the last 7 days</p>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F2FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00F2FF" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00FF88" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0A0E1A', border: '1px solid #1f2937', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="incidents" stroke="#00F2FF" strokeWidth={2} fillOpacity={1} fill="url(#colorIncidents)" name="Incidents Detected" />
                  <Area type="monotone" dataKey="resolved" stroke="#00FF88" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" name="Successfully Resolved" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Role & Permissions Matrix */}
            <Card className="border-gray-800/50 bg-secondary-900/60">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-md font-bold text-white flex items-center gap-2 uppercase tracking-widest font-mono text-sm">
                  <Key className="w-4 h-4 text-accent-yellow" /> Permissions Matrix
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-black/20 border border-gray-800/50">
                  <div>
                    <p className="text-white text-sm font-bold">Global Camera Network</p>
                    <p className="text-gray-500 text-xs">View & control PTZ</p>
                  </div>
                  <Badge variant="success">Full Access</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-black/20 border border-gray-800/50">
                  <div>
                    <p className="text-white text-sm font-bold">Threat Analytics Engine</p>
                    <p className="text-gray-500 text-xs">Modify detection thresholds</p>
                  </div>
                  <Badge variant="success">Full Access</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-black/20 border border-gray-800/50">
                  <div>
                    <p className="text-white text-sm font-bold">System Architecture</p>
                    <p className="text-gray-500 text-xs">Deploy new nodes</p>
                  </div>
                  <Badge variant="warning" className="text-accent-yellow border-accent-yellow">Read Only</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-black/20 border border-gray-800/50">
                  <div>
                    <p className="text-white text-sm font-bold">User Management</p>
                    <p className="text-gray-500 text-xs">Add/remove operators</p>
                  </div>
                  <Badge variant="error" className="text-accent-red border-accent-red">Denied</Badge>
                </div>
              </div>
            </Card>

            {/* Security & Activity Timeline */}
            <Card className="border-gray-800/50 bg-secondary-900/60 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-bold text-white flex items-center gap-2 uppercase tracking-widest font-mono text-sm">
                  <Lock className="w-4 h-4 text-accent-green" /> Security Status
                </h3>
                <span className="text-2xl font-heading font-bold text-accent-green">97/100</span>
              </div>
              
              <div className="w-full bg-gray-800 rounded-full h-1.5 mb-6">
                <div className="bg-accent-green h-1.5 rounded-full" style={{ width: '97%' }}></div>
              </div>

              <h3 className="text-sm font-bold text-gray-400 mb-4 font-mono uppercase tracking-widest">Recent Activity</h3>
              <div className="relative pl-6 space-y-4 before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-[2px] before:bg-gray-800 flex-1 overflow-y-auto custom-scrollbar pr-2">
                {[
                  { action: 'Login from new IP', time: '10 mins ago', type: 'alert', icon: Server },
                  { action: 'Exported Threat Report', time: '2 hours ago', type: 'action', icon: BarChart2 },
                  { action: 'Assigned 4 new cameras', time: 'Yesterday', type: 'system', icon: Navigation },
                  { action: 'Clearance Level Verified', time: 'Yesterday', type: 'security', icon: Shield }
                ].map((event, i) => (
                  <div key={i} className="relative flex items-center gap-4">
                    <div className="absolute -left-[25px] w-5 h-5 rounded-full border-4 border-secondary-900 bg-gray-600 flex items-center justify-center shrink-0 z-10" />
                    <div className="flex-1 p-3 rounded-lg border border-gray-800/50 bg-black/20 hover:border-gray-700 transition-colors flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <event.icon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-white">{event.action}</span>
                      </div>
                      <time className="text-xs text-gray-500 font-mono">{event.time}</time>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* Account Analytics (Usage Bar Chart) */}
          <Card className="border-gray-800/50 bg-secondary-900/60 backdrop-blur-xl">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-md font-bold text-white flex items-center gap-2 uppercase tracking-widest font-mono text-sm">
                  <Activity className="w-4 h-4 text-primary-500" /> Account Analytics
                </h3>
             </div>
             <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    cursor={{fill: 'rgba(255,255,255,0.02)'}}
                    contentStyle={{ backgroundColor: '#0A0E1A', border: '1px solid #1f2937', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="logins" fill="#5f71b9" radius={[4, 4, 0, 0]} name="Platform Logins" />
                  <Bar dataKey="reports" fill="#00c4cc" radius={[4, 4, 0, 0]} name="Reports Generated" />
                </BarChart>
              </ResponsiveContainer>
             </div>
          </Card>

        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} title="Update Executive Profile" size="md">
        <div className="space-y-4">
          <Input label="Full Name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
          <Input label="Role" value={profile.role} onChange={(e) => setProfile({...profile, role: e.target.value})} />
          <Input label="Department" value={profile.department} onChange={(e) => setProfile({...profile, department: e.target.value})} />
          <Input label="Organization" value={profile.org} onChange={(e) => setProfile({...profile, org: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Secure Comm (Email)" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
            <Input label="Direct Line" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
          </div>
          <Input label="Base Location" value={profile.location} onChange={(e) => setProfile({...profile, location: e.target.value})} />
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800 mt-6">
            <Button variant="secondary" onClick={() => setIsEditProfileOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProfile} className="shadow-[0_0_15px_rgba(0,242,255,0.4)]">Save Profile Changes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
