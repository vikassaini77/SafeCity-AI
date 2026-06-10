import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PublicLayout } from '../components/layout';
import { Code, Terminal, Key, Video, AlertTriangle, Bell, Webhook, Zap } from 'lucide-react';

const sections = [
  { id: 'auth', title: 'Authentication', icon: <Key className="w-4 h-4" /> },
  { id: 'video', title: 'Video Stream API', icon: <Video className="w-4 h-4" /> },
  { id: 'incident', title: 'Incident API', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'alert', title: 'Alert API', icon: <Bell className="w-4 h-4" /> },
  { id: 'webhooks', title: 'Webhooks', icon: <Webhook className="w-4 h-4" /> },
  { id: 'sdks', title: 'SDK Examples', icon: <Code className="w-4 h-4" /> },
];

export default function ApiDocsPage() {
  const [activeSection, setActiveSection] = useState('auth');
  const [activeLang, setActiveLang] = useState<'python' | 'js'>('python');

  return (
    <PublicLayout>
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-6 text-primary-500">
                  <Terminal className="w-5 h-5" />
                  <span className="font-heading font-bold text-lg">Developer Portal</span>
                </div>
                <nav className="space-y-2">
                  {sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSection(sec.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === sec.id 
                          ? 'bg-primary-500/10 text-primary-500' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {sec.icon}
                      {sec.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:w-3/4">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-invert max-w-none"
              >
                {activeSection === 'auth' && (
                  <div>
                    <h1 className="text-4xl font-heading font-bold text-white mb-4">Authentication</h1>
                    <p className="text-gray-400 text-lg mb-8">
                      The SafeCity API uses API keys to authenticate requests. You can view and manage your API keys in the SafeCity Dashboard under Security Settings.
                    </p>
                    <div className="bg-secondary-900 border border-gray-800 rounded-lg p-4 mb-8 font-mono text-sm text-gray-300">
                      Authorization: Bearer sk_live_xxxxxxxxxxxxxxx
                    </div>
                    <p className="text-gray-400">All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.</p>
                  </div>
                )}

                {activeSection === 'video' && (
                  <div>
                    <h1 className="text-4xl font-heading font-bold text-white mb-4">Video Stream API</h1>
                    <p className="text-gray-400 text-lg mb-8">Register, configure, and pull streams from your registered RTSP endpoints.</p>
                    <div className="glass-card overflow-hidden">
                      <div className="p-4 border-b border-gray-800 bg-secondary-900/50 flex items-center gap-3">
                        <span className="px-2 py-1 rounded text-xs font-bold bg-primary-500/20 text-primary-500">POST</span>
                        <span className="font-mono text-gray-300">/v1/cameras</span>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-400 mb-4">Register a new IP camera for inference.</p>
                        <div className="bg-black rounded-lg p-4 font-mono text-sm text-primary-300">
                          {`{
  "name": "Downtown Intersection 4",
  "rtsp_url": "rtsp://admin:pass@192.168.1.100:554/stream1",
  "models": ["vehicles", "pedestrians", "violence"]
}`}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'sdks' && (
                  <div>
                    <h1 className="text-4xl font-heading font-bold text-white mb-4">SDK Examples</h1>
                    <p className="text-gray-400 text-lg mb-8">Official client libraries are available for Python and Node.js/Browser.</p>
                    
                    <div className="flex gap-2 mb-4">
                      <button 
                        onClick={() => setActiveLang('python')}
                        className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors ${activeLang === 'python' ? 'bg-secondary-900 text-primary-500 border-t border-x border-gray-800' : 'text-gray-500 border-b border-gray-800 hover:text-white'}`}
                      >
                        Python
                      </button>
                      <button 
                        onClick={() => setActiveLang('js')}
                        className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors ${activeLang === 'js' ? 'bg-secondary-900 text-accent-yellow border-t border-x border-gray-800' : 'text-gray-500 border-b border-gray-800 hover:text-white'}`}
                      >
                        Node.js
                      </button>
                      <div className="flex-1 border-b border-gray-800"></div>
                    </div>

                    <div className="bg-secondary-900 border border-gray-800 rounded-b-lg rounded-tr-lg p-6 relative group">
                      <Code className="absolute top-6 right-6 w-5 h-5 text-gray-600" />
                      <pre className="font-mono text-sm overflow-x-auto">
                        <code className={activeLang === 'python' ? 'text-primary-300' : 'text-accent-yellow'}>
                          {activeLang === 'python' ? 
`import safecity

client = safecity.Client(api_key="sk_live_123")

# Fetch all active incidents in the last hour
incidents = client.incidents.list(
    time_range="1h",
    severity="high",
    type="vehicle_crash"
)

for incident in incidents:
    print(f"Crash detected at {incident.location} with confidence {incident.confidence}")` 
                          :
`import { SafeCity } from '@safecity/node';

const client = new SafeCity('sk_live_123');

// Listen for real-time alerts via WebSocket
client.alerts.on('violence_detected', (alert) => {
  console.log('Violence detected on camera:', alert.cameraId);
  
  // Trigger lockdown protocol
  if (alert.confidence > 0.95) {
    triggerLockdown(alert.locationId);
  }
});

client.connect();`
                          }
                        </code>
                      </pre>
                    </div>
                  </div>
                )}
                
                {/* Fallback for other sections just to show they are functional */}
                {['incident', 'alert', 'webhooks'].includes(activeSection) && (
                  <div>
                    <h1 className="text-4xl font-heading font-bold text-white mb-4 capitalize">{activeSection.replace('-', ' ')} API</h1>
                    <div className="glass-card p-12 text-center border-dashed border-gray-700">
                      <Zap className="w-8 h-8 text-primary-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Documentation V2 Coming Soon</h3>
                      <p className="text-gray-400">We are currently migrating this documentation section to our new OpenAPI 3.0 specification generator.</p>
                    </div>
                  </div>
                )}

              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
