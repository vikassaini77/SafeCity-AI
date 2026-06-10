import { useState } from 'react';
import { Map, AlertTriangle, Users, Car, Target } from 'lucide-react';
import { Card, Badge, Button } from '../../../components/ui';
import toast from 'react-hot-toast';

export default function SmartCityConfig() {
  const [capabilities, setCapabilities] = useState([
    { id: 'veh', name: 'Vehicle Accident Detection', icon: Car, active: true },
    { id: 'riot', name: 'Crowd Violence / Riot Detection', icon: Users, active: true },
    { id: 'bag', name: 'Unattended Baggage', icon: Target, active: true },
    { id: 'breach', name: 'Restricted Zone Breach', icon: AlertTriangle, active: true },
  ]);

  const toggleModule = (id: string, name: string) => {
    setCapabilities(capabilities.map(c => c.id === id ? { ...c, active: !c.active } : c));
    toast.success(`${name} heuristic engine updated and syncing to nodes...`);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-white tracking-wide flex items-center gap-3">
            <Map className="w-6 h-6 text-primary-500" /> Smart City Modules
          </h2>
          <p className="text-gray-400 mt-1">Configure specialized SafeCity AI detection workflows.</p>
        </div>
        <Badge variant="success" className="bg-primary-500/20 text-primary-500 border-primary-500/30">
          Module License: Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {capabilities.map((cap) => (
          <Card key={cap.id} className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl flex items-center justify-between hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center border border-gray-800">
                <cap.icon className={`w-5 h-5 ${cap.active ? 'text-primary-500' : 'text-gray-500'}`} />
              </div>
              <div>
                <h3 className="text-white font-medium">{cap.name}</h3>
                <p className="text-xs text-gray-500">Heuristic Engine v2.4</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={cap.active} onChange={() => toggleModule(cap.id, cap.name)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-primary-500/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"></div>
            </label>
          </Card>
        ))}
      </div>

      <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
        <h3 className="text-lg font-bold text-white mb-6">Geofencing & High Risk Zones</h3>
        
        <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden border border-gray-800 mb-6 group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/60" />
          
          {/* Simulated geofence polygons */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <polygon points="10%,20% 40%,25% 35%,80% 15%,75%" className="fill-accent-red/20 stroke-accent-red stroke-2 drop-shadow-[0_0_10px_rgba(255,59,59,0.5)]" />
            <polygon points="60%,10% 90%,15% 85%,60% 55%,50%" className="fill-yellow-500/20 stroke-yellow-500 stroke-2 drop-shadow-[0_0_10px_rgba(255,184,0,0.5)]" />
          </svg>

          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-gray-700 rounded-lg p-3">
            <h4 className="text-white text-sm font-bold mb-2">Active Zones</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-accent-red shadow-[0_0_8px_rgba(255,59,59,0.8)]" /> Sector 4 (Critical)
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(255,184,0,0.8)]" /> Transit Hub A (Elevated)
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mix-blend-screen" />
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => toast('Draw mode activated. Click map to place vertices.', { icon: '✏️' })}>Draw New Zone</Button>
          <Button onClick={() => toast.success('Coordinate vectors synced to inference engine.')}>Save Coordinates</Button>
        </div>
      </Card>
    </div>
  );
}
