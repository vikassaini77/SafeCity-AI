import { useState } from 'react';
import { User, Mail, Phone, MapPin, BadgeCheck, Clock, Shield, Monitor, Edit2, LogOut } from 'lucide-react';
import { Card, Button, Badge, Input, Modal } from '../../../components/ui';
import toast from 'react-hot-toast';

export default function AccountSettings() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAuditLogOpen, setIsAuditLogOpen] = useState(false);
  
  const [devices, setDevices] = useState([
    { id: 1, name: 'Command Center Terminal 1', loc: 'HQ - Sector 7', current: true },
    { id: 2, name: 'Encrypted Mobile Node', loc: 'Field Operation', current: false },
    { id: 3, name: 'Backup Server Access', loc: 'Data Center B', current: false }
  ]);

  const [profile, setProfile] = useState({
    name: 'Alexander Director',
    role: 'Chief Security Officer',
    org: 'National Command Authority',
    email: 'director@command.gov',
    phone: '+1 (555) 019-8472',
    location: 'Sector 7G, Metropolis'
  });

  const handleRevoke = (id: number) => {
    setDevices(devices.filter(d => d.id !== id));
    toast.success('Device session revoked successfully.');
  };

  const handleSaveProfile = () => {
    toast.success('Profile updated securely.');
    setIsEditProfileOpen(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-heading font-bold text-white tracking-wide">Account Configuration</h2>
        <p className="text-gray-400 mt-1">Manage your executive profile and session history.</p>
      </div>

      {/* Profile Card */}
      <Card className="relative overflow-hidden border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary-500/20 to-accent-blue/20" />
        <div className="relative pt-16 px-8 pb-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="relative group cursor-pointer" onClick={() => setIsEditProfileOpen(true)}>
            <div className="w-32 h-32 rounded-2xl bg-secondary-900 border-4 border-background overflow-hidden shadow-2xl flex items-center justify-center transition-transform group-hover:scale-105">
              <User className="w-12 h-12 text-gray-500 group-hover:text-primary-500 transition-colors" />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl border-4 border-transparent">
              <Edit2 className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-accent-green text-background text-xs font-bold px-2 py-1 rounded-lg border-2 border-background shadow-lg flex items-center gap-1">
              <BadgeCheck className="w-3 h-3" /> Level 5
            </div>
          </div>
          
          <div className="flex-1 space-y-4 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-3xl font-heading font-bold text-white">{profile.name}</h3>
                <p className="text-primary-400 font-mono uppercase tracking-wider text-sm mt-1">{profile.role}</p>
              </div>
              <Button variant="secondary" className="border-gray-700 hover:bg-white/5" onClick={() => setIsEditProfileOpen(true)}>
                Edit Profile
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase">Organization</p>
                  <p className="font-medium">{profile.org}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase">Secure Comm</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase">Direct Line</p>
                  <p className="font-medium">{profile.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase">Base Location</p>
                  <p className="font-medium">{profile.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Device Management */}
        <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Monitor className="w-5 h-5 text-primary-500" /> Device Management
            </h3>
            <Badge variant="info">{devices.length} Active</Badge>
          </div>
          
          <div className="space-y-4">
            {devices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-800/50 bg-black/20 hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${device.current ? 'bg-primary-500/20 text-primary-500' : 'bg-white/5 text-gray-400'}`}>
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{device.name}</p>
                    <p className="text-sm text-gray-500">{device.loc}</p>
                  </div>
                </div>
                {device.current ? (
                  <Badge variant="success" size="sm">Current Session</Badge>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => handleRevoke(device.id)} className="text-accent-red hover:bg-accent-red/10">
                    <LogOut className="w-4 h-4 mr-1" /> Revoke
                  </Button>
                )}
              </div>
            ))}
            {devices.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No active devices found.</p>}
          </div>
        </Card>

        {/* Activity Timeline */}
        <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent-blue" /> Recent Activity
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setIsAuditLogOpen(true)}>View Audit Log</Button>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-7 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent">
            {[
              { action: 'Clearance Level Verified', time: '10 mins ago', type: 'security' },
              { action: 'Exported Threat Analysis Report', time: '2 hours ago', type: 'action' },
              { action: 'System Configuration Updated', time: 'Yesterday', type: 'system' }
            ].map((event, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-secondary-900 bg-gray-700 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute -left-3 md:left-1/2" />
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-gray-800/50 bg-black/20 group-hover:border-gray-700 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-white">{event.action}</span>
                  </div>
                  <time className="text-xs text-gray-500 font-mono">{event.time}</time>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} title="Edit Executive Profile" size="md">
        <div className="space-y-4">
          <Input label="Full Name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
          <Input label="Role" value={profile.role} onChange={(e) => setProfile({...profile, role: e.target.value})} />
          <Input label="Organization" value={profile.org} onChange={(e) => setProfile({...profile, org: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Secure Comm (Email)" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
            <Input label="Direct Line" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
          </div>
          <Input label="Base Location" value={profile.location} onChange={(e) => setProfile({...profile, location: e.target.value})} />
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800 mt-6">
            <Button variant="secondary" onClick={() => setIsEditProfileOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProfile}>Save Profile</Button>
          </div>
        </div>
      </Modal>

      {/* Audit Log Modal */}
      <Modal isOpen={isAuditLogOpen} onClose={() => setIsAuditLogOpen(false)} title="System Audit Log" size="xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-sm text-gray-400">
                <th className="py-3 px-4 font-medium">Timestamp (UTC)</th>
                <th className="py-3 px-4 font-medium">Event Source</th>
                <th className="py-3 px-4 font-medium">Action</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-800/50">
              {[
                { time: '2026-06-09 10:15:02', src: 'Auth Service', action: 'Clearance Verified', status: 'Success', ip: '192.168.1.45' },
                { time: '2026-06-09 08:32:11', src: 'Analytics', action: 'Report Export', status: 'Success', ip: '192.168.1.45' },
                { time: '2026-06-08 22:14:05', src: 'Core System', action: 'Config Update', status: 'Success', ip: '192.168.1.45' },
                { time: '2026-06-08 15:45:00', src: 'Auth Service', action: 'Login Attempt', status: 'Failed', ip: '10.0.4.112' },
                { time: '2026-06-07 09:12:44', src: 'Network', action: 'Node Connect', status: 'Success', ip: '192.168.2.10' },
              ].map((log, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-gray-400 font-mono text-xs">{log.time}</td>
                  <td className="py-3 px-4 text-white">{log.src}</td>
                  <td className="py-3 px-4 text-gray-300">{log.action}</td>
                  <td className="py-3 px-4">
                    <Badge variant={log.status === 'Success' ? 'success' : 'error'} size="sm">{log.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-xs text-gray-500">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
}
