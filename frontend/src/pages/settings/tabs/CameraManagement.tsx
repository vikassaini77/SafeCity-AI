import { useState } from 'react';
import { Video, Activity, Network, Maximize, AlertTriangle, X } from 'lucide-react';
import { Card, Badge, Button, Modal, Input } from '../../../components/ui';
import toast from 'react-hot-toast';

export default function CameraManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activePreviewUrl, setActivePreviewUrl] = useState<string | null>(null);
  
  const [cameras, setCameras] = useState([
    { name: 'North Terminal Entrance', status: 'optimal', latency: '12ms', bandwidth: '4.2 Mbps', resolution: '4K', type: 'PTZ', url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80' },
    { name: 'Sector 4 Perimeter', status: 'optimal', latency: '15ms', bandwidth: '2.1 Mbps', resolution: '1080p', type: 'Fixed', url: 'https://images.unsplash.com/photo-1542360663-8f402370efa1?auto=format&fit=crop&q=80' },
    { name: 'Loading Dock B', status: 'degraded', latency: '145ms', bandwidth: '0.8 Mbps', resolution: '720p', type: 'Thermal', url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80' },
    { name: 'Main Lobby', status: 'optimal', latency: '8ms', bandwidth: '5.5 Mbps', resolution: '4K', type: 'Dome', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80' },
  ]);

  const [newNode, setNewNode] = useState({ name: '', ip: '', type: 'Fixed' });

  const handleAddNode = () => {
    if (!newNode.name || !newNode.ip) {
      toast.error('Please provide a name and IP address.');
      return;
    }
    
    setCameras([
      ...cameras,
      {
        name: newNode.name,
        status: 'optimal',
        latency: '0ms',
        bandwidth: '0 Mbps',
        resolution: '1080p',
        type: newNode.type,
        url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80'
      }
    ]);
    toast.success(`${newNode.name} added and attempting handshake...`);
    setIsAddModalOpen(false);
    setNewNode({ name: '', ip: '', type: 'Fixed' });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-white tracking-wide flex items-center gap-3">
            <Video className="w-6 h-6 text-primary-500" /> Camera Infrastructure
          </h2>
          <p className="text-gray-400 mt-1">Monitor and configure connected video feed nodes.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>Add New Node</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cameras.map((cam, i) => (
          <Card key={i} className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl hover:border-primary-500/50 transition-colors group">
            <div className="aspect-video w-full bg-black rounded-lg mb-4 relative overflow-hidden group-hover:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-shadow">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" 
                style={{ backgroundImage: `url(${cam.url})` }}
              />
              <div className="absolute top-2 left-2 flex gap-2">
                <Badge variant={cam.status === 'optimal' ? 'success' : 'warning'} size="sm" className="bg-black/60 backdrop-blur-md">
                  <span className={`w-1.5 h-1.5 rounded-full mr-1 ${cam.status === 'optimal' ? 'bg-accent-green' : 'bg-yellow-500'} animate-pulse`} />
                  {cam.status.toUpperCase()}
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="default" size="sm" className="bg-black/60 backdrop-blur-md font-mono">{cam.resolution}</Badge>
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
              
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => setActivePreviewUrl(cam.url)}
                  className="h-8 w-8 p-0 bg-black/60 backdrop-blur-md border-gray-700 hover:text-primary-500"
                >
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <h3 className="text-white font-bold truncate">{cam.name}</h3>
            
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-primary-500" /> {cam.latency}
              </div>
              <div className="flex items-center gap-1">
                <Network className="w-3 h-3 text-accent-blue" /> {cam.bandwidth}
              </div>
              <div className="col-span-2 mt-2 pt-2 border-t border-gray-800/50 flex justify-between items-center">
                <span className="text-gray-500 uppercase tracking-widest">Type</span>
                <span className="text-white">{cam.type} Node</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
         <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Global Feed Settings</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
             <label className="block text-sm font-medium text-gray-300 mb-2">Target Frame Rate</label>
             <select className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none">
               <option>30 FPS (Standard)</option>
               <option>60 FPS (High Motion)</option>
               <option>15 FPS (Bandwidth Saver)</option>
             </select>
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-300 mb-2">Streaming Protocol</label>
             <select className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none">
               <option>WebRTC (Ultra Low Latency)</option>
               <option>HLS (Better Compatibility)</option>
               <option>RTSP (Legacy)</option>
             </select>
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-300 mb-2">Edge Caching</label>
             <select className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none">
               <option>Enabled (5 min buffer)</option>
               <option>Enabled (1 hr buffer)</option>
               <option>Disabled</option>
             </select>
          </div>
        </div>
      </Card>

      {/* Add Camera Node Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Node" size="md">
        <div className="space-y-4">
          <div className="p-3 bg-primary-500/10 border border-primary-500/20 rounded-lg flex items-start gap-2 mb-4">
            <Activity className="w-4 h-4 text-primary-500 mt-0.5" />
            <p className="text-xs text-primary-500">Ensure the camera is connected to the secure subnet before attempting handshake.</p>
          </div>
          
          <Input label="Node Name / Location" placeholder="e.g. Server Room B" value={newNode.name} onChange={(e) => setNewNode({...newNode, name: e.target.value})} />
          <Input label="IP Address or RTSP URL" placeholder="192.168.1.100" value={newNode.ip} onChange={(e) => setNewNode({...newNode, ip: e.target.value})} />
          
          <div>
             <label className="block text-sm font-medium text-gray-300 mb-2">Camera Type</label>
             <select 
              value={newNode.type}
              onChange={(e) => setNewNode({...newNode, type: e.target.value})}
              className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
             >
               <option>Fixed</option>
               <option>PTZ (Pan-Tilt-Zoom)</option>
               <option>Thermal</option>
               <option>Dome</option>
             </select>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800 mt-6">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddNode}>Initiate Handshake</Button>
          </div>
        </div>
      </Modal>

      {/* Fullscreen Preview Modal */}
      {activePreviewUrl && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8">
          <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Badge variant="success" className="bg-black/60 backdrop-blur-md">LIVE FEED</Badge>
              <button 
                onClick={() => setActivePreviewUrl(null)}
                className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-gray-700 flex items-center justify-center text-white hover:text-accent-red hover:border-accent-red transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${activePreviewUrl})` }} />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mix-blend-screen opacity-50" />
          </div>
        </div>
      )}
    </div>
  );
}
