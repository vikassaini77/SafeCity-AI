import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PublicLayout } from '../components/layout';
import { Check, X, Building, Shield, ChevronRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$499',
    period: '/mo',
    description: 'Perfect for small facilities and retail locations.',
    features: [
      { name: 'Up to 10 Camera Streams', included: true },
      { name: 'Basic Object Detection', included: true },
      { name: '7-Day Event Retention', included: true },
      { name: 'Email Alerts', included: true },
      { name: 'Violence Detection', included: false },
    ]
  },
  {
    name: 'Professional',
    price: '$1,499',
    period: '/mo',
    description: 'Ideal for large campuses and municipal districts.',
    popular: true,
    features: [
      { name: 'Up to 50 Camera Streams', included: true },
      { name: 'Advanced AI Detection', included: true },
      { name: '30-Day Event Retention', included: true },
      { name: 'SMS & Webhook Alerts', included: true },
      { name: 'Violence & Crash Detection', included: true },
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For city-wide deployments and critical infrastructure.',
    icon: <Building className="w-5 h-5 mb-2 text-primary-500" />,
    features: [
      { name: 'Unlimited Camera Streams', included: true },
      { name: 'Custom AI Model Training', included: true },
      { name: 'Unlimited Event Retention', included: true },
      { name: 'Dedicated Alert Routing', included: true },
      { name: 'Dedicated Account Manager', included: true },
    ]
  },
  {
    name: 'Government',
    price: 'Custom',
    period: '',
    description: 'CJIS compliant architecture for law enforcement.',
    icon: <Shield className="w-5 h-5 mb-2 text-accent-green" />,
    features: [
      { name: 'FedRAMP High Environment', included: true },
      { name: 'CJIS Compliant Data Centers', included: true },
      { name: 'On-Premise Deployment Ops', included: true },
      { name: 'Direct CAD Integration', included: true },
      { name: '24/7 Cleared Support Team', included: true },
    ]
  }
];

export default function PricingPage() {
  const [cameras, setCameras] = useState(50);
  const guardCostPerHour = 25;
  const hoursPerWeek = 168; // 24/7
  
  // A human can realistically monitor maybe 10 cameras effectively.
  // 50 cameras = 5 human guards 24/7.
  const guardsNeeded = Math.ceil(cameras / 10);
  const manualCostPerMonth = guardsNeeded * guardCostPerHour * hoursPerWeek * 4;
  const aiCostPerMonth = cameras * 30; // Roughly $30/cam
  const savings = manualCostPerMonth - aiCostPerMonth;

  return (
    <PublicLayout>
      <div className="min-h-screen bg-background pt-24 pb-20">
        
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Transparent Pricing for <br />
            <span className="text-primary-500">Every Scale</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Choose the plan that fits your surveillance needs. Scale from a single retail store to an entire smart city.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className={`relative glass-card p-6 flex flex-col ${plan.popular ? 'border-primary-500 shadow-glow-primary scale-105 z-10' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="mb-6 border-b border-gray-800 pb-6">
                  {plan.icon}
                  <h3 className="text-xl font-heading font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 h-10">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <ul className="space-y-3 mb-8 text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a 
                  href="/contact" 
                  className={`w-full text-center py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                    plan.popular ? 'bg-primary-500 text-black hover:bg-primary-400 shadow-glow-primary' : 'bg-secondary-800 text-white hover:bg-secondary-700'
                  }`}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Start 14-Day Trial'}
                  <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="max-w-5xl mx-auto px-6 mb-32">
          <div className="glass-card p-8 md:p-12 bg-gradient-to-br from-secondary-900 to-black border-primary-500/20">
            <h2 className="text-3xl font-heading font-bold text-white mb-2">ROI Calculator</h2>
            <p className="text-gray-400 mb-8">Calculate your estimated monthly savings by augmenting manual security monitoring with SafeCity AI.</p>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  How many cameras do you monitor?
                </label>
                <div className="flex items-center gap-4 mb-6">
                  <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    step="10"
                    value={cameras}
                    onChange={(e) => setCameras(parseInt(e.target.value))}
                    className="flex-1 accent-primary-500"
                  />
                  <div className="bg-secondary-800 text-white px-4 py-2 rounded-lg font-mono font-bold border border-gray-700 w-24 text-center">
                    {cameras}
                  </div>
                </div>
                
                <div className="space-y-4 text-sm text-gray-400">
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span>Guards needed (24/7, 10 cams/guard)</span>
                    <span className="text-white font-mono">{guardsNeeded} guards</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span>Manual Monitoring Cost</span>
                    <span className="text-white font-mono">${manualCostPerMonth.toLocaleString()}/mo</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span>SafeCity AI Estimated Cost</span>
                    <span className="text-white font-mono">${aiCostPerMonth.toLocaleString()}/mo</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 rounded-2xl p-8 border border-primary-500/30 flex flex-col items-center justify-center text-center shadow-[inset_0_0_40px_rgba(0,242,255,0.05)]">
                <h3 className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-sm">Estimated Monthly Savings</h3>
                <div className="text-5xl md:text-6xl font-heading font-bold text-primary-500 mb-4">
                  ${savings.toLocaleString()}
                </div>
                <p className="text-sm text-gray-500">Based on industry average security guard costs of $25/hr. Actual ROI may be even higher when factoring in liability reduction.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Matrix */}
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold text-white mb-8 text-center">Compare All Features</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="p-4 text-gray-400 font-medium w-1/3">Core Features</th>
                  <th className="p-4 text-white font-bold text-center">Starter</th>
                  <th className="p-4 text-primary-500 font-bold text-center">Professional</th>
                  <th className="p-4 text-white font-bold text-center">Enterprise</th>
                  <th className="p-4 text-accent-green font-bold text-center">Government</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { name: 'Max Camera Streams', starter: '10', pro: '50', ent: 'Unlimited', gov: 'Unlimited' },
                  { name: 'Event Retention', starter: '7 Days', pro: '30 Days', ent: 'Unlimited', gov: 'Infinite Archive' },
                  { name: 'Vehicle & Person Analytics', starter: true, pro: true, ent: true, gov: true },
                  { name: 'Accident & Violence Detection', starter: false, pro: true, ent: true, gov: true },
                  { name: 'Multi-Camera Tracking (DeepSORT)', starter: false, pro: false, ent: true, gov: true },
                  { name: 'API Access', starter: 'Basic', pro: 'Standard', ent: 'Full GraphQL/REST', gov: 'Full GraphQL/REST' },
                  { name: 'Custom AI Model Training', starter: false, pro: false, ent: true, gov: true },
                  { name: 'CJIS Compliance Environment', starter: false, pro: false, ent: false, gov: true },
                  { name: 'SSO (SAML/OIDC)', starter: false, pro: true, ent: true, gov: true },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-gray-300">{row.name}</td>
                    {['starter', 'pro', 'ent', 'gov'].map(tier => (
                      <td key={tier} className="p-4 text-center">
                        {typeof row[tier as keyof typeof row] === 'boolean' ? (
                          row[tier as keyof typeof row] ? 
                            <Check className={`w-5 h-5 mx-auto ${tier === 'pro' ? 'text-primary-500' : tier === 'gov' ? 'text-accent-green' : 'text-gray-400'}`} /> : 
                            <X className="w-5 h-5 text-gray-700 mx-auto" />
                        ) : (
                          <span className="text-gray-400">{row[tier as keyof typeof row]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </PublicLayout>
  );
}
