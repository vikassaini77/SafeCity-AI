import { useState } from 'react';
import { BarChart, PieChart, Activity, Clock } from 'lucide-react';
import { Card, Button } from '../../../components/ui';
import toast from 'react-hot-toast';

export default function AnalyticsSettings() {
  const [widgets, setWidgets] = useState([
    { id: 'feed', name: 'Real-time Alert Feed', icon: Activity, enabled: true },
    { id: 'pie', name: 'Severity Distribution (Pie)', icon: PieChart, enabled: true },
    { id: 'bar', name: 'Hourly Incident Volume', icon: BarChart, enabled: true },
    { id: 'time', name: 'Average Resolution Time', icon: Clock, enabled: false },
  ]);

  const toggleWidget = (id: string, name: string) => {
    setWidgets(widgets.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w));
    toast.success(`${name} widget visibility updated.`);
  };

  const handleRecalculate = () => {
    toast.success('Initiating massive index recalculation...', { duration: 2000 });
    setTimeout(() => {
      toast('Indices recalculated. Dashboards updated.', { icon: '📊' });
    }, 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-heading font-bold text-white tracking-wide flex items-center gap-3">
          <BarChart className="w-6 h-6 text-primary-500" /> Analytics Preferences
        </h2>
        <p className="text-gray-400 mt-1">Configure dashboard widgets and reporting metrics.</p>
      </div>

      <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
        <h3 className="text-lg font-bold text-white mb-6">Dashboard Widgets</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {widgets.map((widget) => (
            <div key={widget.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-800 bg-black/20 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <widget.icon className="w-5 h-5 text-gray-500" />
                <span className="text-white font-medium">{widget.name}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={widget.enabled} onChange={() => toggleWidget(widget.id, widget.name)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-700 peer-focus:ring-2 peer-focus:ring-primary-500/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
          <h3 className="text-lg font-bold text-white mb-6">Automated Reports</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Generation Frequency</label>
              <select className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none">
                <option>Daily (End of Shift)</option>
                <option>Weekly Executive Summary</option>
                <option>Monthly Audit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Export Format</label>
              <select className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none">
                <option>PDF & JSON</option>
                <option>PDF Only</option>
                <option>CSV Raw Data</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
          <h3 className="text-lg font-bold text-white mb-6">Data Aggregation</h3>
          <p className="text-sm text-gray-400 mb-6">
            Configure how live data is batched for the analytics engine. Faster refresh rates consume more memory.
          </p>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-300">Live Dashboard Refresh</span>
                <span className="text-sm font-mono text-primary-500">5s</span>
              </div>
              <input type="range" min="1" max="60" defaultValue="5" onChange={(e) => toast(`Refresh rate set to ${e.target.value}s`, { icon: '⏱️', id: 'ref' })} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500" />
            </div>
            <div className="pt-4 flex justify-end">
              <Button variant="secondary" onClick={handleRecalculate}>Recalculate Indices</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
