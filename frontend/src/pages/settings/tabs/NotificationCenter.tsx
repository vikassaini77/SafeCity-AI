import { Bell, Mail, Smartphone, RadioTower, Siren } from 'lucide-react';
import { Card, Input } from '../../../components/ui';

export default function NotificationCenter() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-heading font-bold text-white tracking-wide flex items-center gap-3">
          <Bell className="w-6 h-6 text-primary-500" /> Alert Escalation Matrix
        </h2>
        <p className="text-gray-400 mt-1">Configure automated dispatch and notification routing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center shrink-0 border border-accent-red/20">
              <Siren className="w-5 h-5 text-accent-red" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Critical Severity</h3>
              <p className="text-sm text-gray-400">Immediate threat detected</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'Emergency Broadcast (PA System)', icon: RadioTower, checked: true },
              { title: 'SMS to First Responders', icon: Smartphone, checked: true },
              { title: 'Executive Email Blast', icon: Mail, checked: true }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300 text-sm font-medium">{item.title}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-700 peer-focus:ring-2 peer-focus:ring-accent-red/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-red"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0 border border-yellow-500/20">
              <Bell className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">High Severity</h3>
              <p className="text-sm text-gray-400">Suspicious activity requiring review</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'Automated Sirens', icon: RadioTower, checked: false },
              { title: 'SMS to Duty Supervisor', icon: Smartphone, checked: true },
              { title: 'Log to Incident Channel', icon: Mail, checked: true }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300 text-sm font-medium">{item.title}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-700 peer-focus:ring-2 peer-focus:ring-yellow-500/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
        <h3 className="text-lg font-bold text-white mb-6">Endpoints & Webhooks</h3>
        <div className="space-y-4">
          <Input 
            label="Emergency Dispatch SMS Gateway" 
            defaultValue="+1 (555) 911-0000"
          />
          <Input 
            label="Central Command Webhook URL" 
            defaultValue="https://cmd.safecity.gov/api/v2/ingest/alerts"
          />
        </div>
      </Card>
    </div>
  );
}
