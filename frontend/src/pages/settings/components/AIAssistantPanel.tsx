import { Bot, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Card } from '../../../components/ui';

export default function AIAssistantPanel({ activeTab }: { activeTab: string }) {
  const getRecommendations = () => {
    switch (activeTab) {
      case 'security':
        return [
          { icon: AlertTriangle, text: 'Consider enabling Hardware Passkeys for Level 5 security clearance accounts.', type: 'warning' },
          { icon: ShieldCheck, text: 'No unusual login attempts detected in the last 72 hours.', type: 'success' }
        ];
      case 'ai':
        return [
          { icon: Sparkles, text: 'Detection confidence can be improved by increasing camera coverage in Sector 4.', type: 'info' },
          { icon: Sparkles, text: 'Lowering the NMS threshold slightly may resolve bounding box overlap issues observed recently.', type: 'info' }
        ];
      case 'cameras':
        return [
          { icon: AlertTriangle, text: 'Three cameras in the South Terminal are experiencing degraded performance (high latency).', type: 'warning' },
          { icon: Sparkles, text: 'Bandwidth usage is optimal. Consider enabling 4K streaming for PTZ cameras.', type: 'info' }
        ];
      default:
        return [
          { icon: Sparkles, text: 'System running optimally. All predictive models are calibrated and performing nominally.', type: 'success' },
          { icon: Sparkles, text: 'Consider reviewing the new Analytics Widgets available in the latest platform update.', type: 'info' }
        ];
    }
  };

  const recommendations = getRecommendations();

  return (
    <div className="flex flex-col h-full z-10 relative">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.2)]">
          <Bot className="w-5 h-5 text-primary-500" />
        </div>
        <div>
          <h2 className="text-white font-bold tracking-wide">SafeCity Sentinel</h2>
          <p className="text-xs text-primary-500 font-mono uppercase tracking-wider">AI Assistant Active</p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <h3 className="text-xs font-mono uppercase text-gray-500 tracking-widest mb-4">Live Insights</h3>
        
        {recommendations.map((rec, i) => (
          <Card key={i} className="bg-secondary-900/40 border-gray-800/50 backdrop-blur-md hover:border-primary-500/30 transition-colors group cursor-default">
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 rounded-lg p-1.5 ${
                rec.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
                rec.type === 'success' ? 'bg-accent-green/10 text-accent-green' :
                'bg-primary-500/10 text-primary-500'
              }`}>
                <rec.icon className="w-4 h-4" />
              </div>
              <p className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">{rec.text}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-800/50">
        <div className="flex items-center justify-between text-xs font-mono text-gray-500">
          <span>Model: Sentinel-v4</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            Online
          </span>
        </div>
      </div>
    </div>
  );
}
