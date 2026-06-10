import { useState, useEffect } from 'react';
import { Shield, Key, Fingerprint, History, AlertTriangle, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, Button, Badge, Modal } from '../../../components/ui';
import toast from 'react-hot-toast';

export default function SecurityCenter() {
  const [isPasskeyModalOpen, setIsPasskeyModalOpen] = useState(false);
  const [passkeyState, setPasskeyState] = useState<'idle' | 'waiting' | 'success'>('idle');
  
  const handleToggleAlerts = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      toast.success('Login alerts enabled. You will be notified of suspicious activity.');
    } else {
      toast('Login alerts disabled.', { icon: '⚠️' });
    }
  };

  const startPasskeySetup = () => {
    setPasskeyState('waiting');
    // Simulate WebAuthn delay
    setTimeout(() => {
      setPasskeyState('success');
      toast.success('Hardware passkey registered successfully.');
      setTimeout(() => setIsPasskeyModalOpen(false), 2000);
    }, 3000);
  };

  useEffect(() => {
    if (isPasskeyModalOpen) {
      setPasskeyState('idle');
    }
  }, [isPasskeyModalOpen]);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-heading font-bold text-white tracking-wide">Security Center</h2>
        <p className="text-gray-400 mt-1">Manage platform access and security compliance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Security Score Widget */}
        <Card className="col-span-1 border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative w-48 h-48 mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-gray-800 stroke-current"
                strokeWidth="4"
                cx="50" cy="50" r="46"
                fill="transparent"
              />
              <circle
                className="text-accent-green stroke-current drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]"
                strokeWidth="4"
                strokeLinecap="round"
                cx="50" cy="50" r="46"
                fill="transparent"
                strokeDasharray="289.026"
                strokeDashoffset="11.56" // 96% of 289
                style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-heading font-bold text-white">96</span>
              <span className="text-sm text-gray-400 font-mono">/100</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">Excellent Posture</h3>
          <p className="text-sm text-gray-400 mb-4">Your command center meets all Tier 1 security compliance requirements.</p>
          <Badge variant="success" className="bg-accent-green/20 text-accent-green border-accent-green/30">
            <ShieldCheck className="w-4 h-4 mr-1" /> Fully Protected
          </Badge>
        </Card>

        {/* Security Controls */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-gray-700 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                <Key className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Two-Factor Authentication</h3>
                <p className="text-gray-400 text-sm mt-1">Require an extra step during login using an authenticator app or hardware key.</p>
              </div>
            </div>
            <div className="shrink-0">
              <Button variant="secondary" className="border-accent-green/50 text-accent-green hover:bg-accent-green/10">Enabled</Button>
            </div>
          </Card>

          <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-gray-700 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0">
                <Fingerprint className="w-6 h-6 text-accent-blue" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Hardware Passkeys</h3>
                <p className="text-gray-400 text-sm mt-1">Use biometric passkeys (Touch ID, Face ID, YubiKey) for passwordless authentication.</p>
              </div>
            </div>
            <div className="shrink-0">
              <Button onClick={() => setIsPasskeyModalOpen(true)}>Configure Passkey</Button>
            </div>
          </Card>

          <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-gray-700 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Login Alerts</h3>
                <p className="text-gray-400 text-sm mt-1">Get notified of logins from unrecognized devices or geographic locations.</p>
              </div>
            </div>
            <div className="shrink-0">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked onChange={handleToggleAlerts} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-primary-500/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"></div>
              </label>
            </div>
          </Card>
        </div>
      </div>

      {/* Passkey Setup Modal */}
      <Modal isOpen={isPasskeyModalOpen} onClose={() => setIsPasskeyModalOpen(false)} title="Register Hardware Passkey" size="sm">
        <div className="flex flex-col items-center justify-center text-center py-6 space-y-6">
          <div className="w-20 h-20 rounded-full bg-accent-blue/10 flex items-center justify-center relative">
            {passkeyState === 'idle' && <Fingerprint className="w-10 h-10 text-accent-blue" />}
            {passkeyState === 'waiting' && <Loader2 className="w-10 h-10 text-accent-blue animate-spin" />}
            {passkeyState === 'success' && <CheckCircle2 className="w-10 h-10 text-accent-green" />}
            {passkeyState === 'waiting' && (
              <span className="absolute inset-0 rounded-full border-2 border-accent-blue border-t-transparent animate-spin opacity-50" style={{ animationDuration: '3s' }} />
            )}
          </div>
          
          <div>
            <h3 className="text-white font-bold text-xl">
              {passkeyState === 'idle' ? 'Ready to Register' : passkeyState === 'waiting' ? 'Waiting for Authenticator...' : 'Passkey Registered!'}
            </h3>
            <p className="text-gray-400 mt-2">
              {passkeyState === 'idle' ? 'Click continue and follow your browser or device prompts to create a secure passkey.' : passkeyState === 'waiting' ? 'Please touch your security key or use biometric authentication.' : 'You can now use this device to log in securely without a password.'}
            </p>
          </div>
          
          {passkeyState === 'idle' && (
            <Button className="w-full" onClick={startPasskeySetup}>Continue Setup</Button>
          )}
        </div>
      </Modal>
    </div>
  );
}
