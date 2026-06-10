import { useState } from 'react';
import { Database, Download, Trash2, FileText, Lock, AlertTriangle } from 'lucide-react';
import { Card, Button, Badge, Modal, Input } from '../../../components/ui';
import toast from 'react-hot-toast';

export default function DataPrivacy() {
  const [isPurgeOpen, setIsPurgeOpen] = useState(false);
  const [purgeText, setPurgeText] = useState('');

  const handleExport = () => {
    toast.success('Compiling compliance archive...', { duration: 2000 });
    setTimeout(() => {
      toast('Export ready. Downloading data.json', { icon: '⬇️' });
    }, 2500);
  };

  const handlePurge = () => {
    if (purgeText !== 'PURGE') {
      toast.error('You must type exactly PURGE to confirm.');
      return;
    }
    toast.success('Analytics data successfully purged.');
    setIsPurgeOpen(false);
    setPurgeText('');
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-heading font-bold text-white tracking-wide flex items-center gap-3">
          <Database className="w-6 h-6 text-primary-500" /> Data & Privacy
        </h2>
        <p className="text-gray-400 mt-1">Manage data retention, exports, and compliance logs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" /> Video Retention Policy
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-300">Raw Footage Retention</span>
                <span className="text-sm font-mono text-primary-500">7 Days</span>
              </div>
              <input type="range" min="1" max="30" defaultValue="7" onChange={(e) => toast(`Raw retention set to ${e.target.value} days`, { icon: '💾', id: 'raw' })} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-300">Incident Clips (Detected)</span>
                <span className="text-sm font-mono text-accent-blue">90 Days</span>
              </div>
              <input type="range" min="30" max="365" defaultValue="90" onChange={(e) => toast(`Incident retention set to ${e.target.value} days`, { icon: '💾', id: 'inc' })} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-blue" />
            </div>
            
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-500/90 leading-relaxed">
                Extending retention periods will significantly increase storage costs. Ensure you have adequate enterprise cloud quota.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0">
                  <Download className="w-6 h-6 text-accent-blue" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Export Organization Data</h3>
                  <p className="text-gray-400 text-sm mt-1">Download a compliance archive (JSON/CSV).</p>
                </div>
              </div>
              <Button variant="secondary" onClick={handleExport}>Request Export</Button>
            </div>
          </Card>

          <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl hover:border-gray-700 transition-colors cursor-pointer" onClick={() => toast('Audit log accessed via Account Settings tab.', { icon: 'ℹ️'})}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Compliance Audit Logs</h3>
                  <p className="text-gray-400 text-sm mt-1">View system access and configuration changes.</p>
                </div>
              </div>
              <Button variant="secondary">View Logs</Button>
            </div>
          </Card>

          <Card className="border-accent-red/20 bg-accent-red/5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-red/10 flex items-center justify-center shrink-0">
                  <Trash2 className="w-6 h-6 text-accent-red" />
                </div>
                <div>
                  <h3 className="text-accent-red font-bold">Purge Analytics Data</h3>
                  <p className="text-accent-red/70 text-sm mt-1">Permanently delete all historical metrics.</p>
                </div>
              </div>
              <Button variant="ghost" className="text-accent-red hover:bg-accent-red/10 border border-accent-red/50" onClick={() => setIsPurgeOpen(true)}>Purge</Button>
            </div>
          </Card>
        </div>
      </div>

      <Modal isOpen={isPurgeOpen} onClose={() => setIsPurgeOpen(false)} title="Destroy Analytics Data" size="sm">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-accent-red/10 border border-accent-red/30 text-accent-red">
            <AlertTriangle className="w-8 h-8 shrink-0" />
            <p className="text-sm font-medium">This action cannot be undone. All historical analytics and incident metric data will be permanently wiped from the cluster.</p>
          </div>
          
          <div className="pt-2">
            <Input 
              label="Type PURGE to confirm" 
              placeholder="PURGE" 
              value={purgeText} 
              onChange={(e) => setPurgeText(e.target.value)} 
              className="font-mono text-center tracking-widest text-accent-red focus:border-accent-red focus:ring-accent-red"
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800 mt-6">
            <Button variant="secondary" onClick={() => setIsPurgeOpen(false)}>Cancel</Button>
            <Button 
              className={purgeText === 'PURGE' ? 'bg-accent-red hover:bg-red-600 text-white' : 'bg-gray-700 text-gray-400 cursor-not-allowed'} 
              onClick={handlePurge}
            >
              Confirm Destruction
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Temporary inline icon for Clock since we forgot to import it above.
const Clock = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
