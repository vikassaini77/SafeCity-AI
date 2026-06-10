import { useState } from 'react';
import { Cpu, Target, Eye, Zap, Crosshair } from 'lucide-react';
import { Card, Badge, Button } from '../../../components/ui';

export default function AIConfiguration() {
  const [confidence, setConfidence] = useState(85);
  const [nms, setNms] = useState(45);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-heading font-bold text-white tracking-wide flex items-center gap-3">
          <Cpu className="w-6 h-6 text-primary-500" /> AI Neural Engine
        </h2>
        <p className="text-gray-400 mt-1">Configure core detection parameters and inference thresholds.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-primary-500" /> Confidence Threshold
              </h3>
              <Badge variant="info" className="font-mono">{confidence}%</Badge>
            </div>
            <p className="text-sm text-gray-400 mb-6">Minimum probability required for the neural network to classify and report an object or event.</p>
            
            <input
              type="range"
              min="10"
              max="99"
              value={confidence}
              onChange={(e) => setConfidence(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs font-mono text-gray-500 mt-2">
              <span>More False Positives</span>
              <span>Strict Accuracy</span>
            </div>
          </Card>

          <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-accent-blue" /> Non-Max Suppression
              </h3>
              <Badge variant="default" className="font-mono">{nms}%</Badge>
            </div>
            <p className="text-sm text-gray-400 mb-6">Controls bounding box overlap allowance. Lower values aggressively merge overlapping detections.</p>
            
            <input
              type="range"
              min="10"
              max="90"
              value={nms}
              onChange={(e) => setNms(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-blue"
            />
            <div className="flex justify-between text-xs font-mono text-gray-500 mt-2">
              <span>Aggressive Merge</span>
              <span>Allow Overlaps</span>
            </div>
          </Card>

          <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
             <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" /> Inference Engine
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-primary-500 bg-primary-500/10 text-white transition-colors">
                <span className="font-bold">TensorRT</span>
                <span className="text-xs text-primary-400 mt-1 uppercase tracking-wider font-mono">Max Performance</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-700 bg-black/20 text-gray-400 hover:border-gray-600 transition-colors">
                <span className="font-bold">ONNX Runtime</span>
                <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-mono">Compatibility</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Live Preview */}
        <Card className="border-primary-500/20 bg-black backdrop-blur-xl overflow-hidden flex flex-col shadow-[0_0_30px_rgba(0,242,255,0.05)]">
          <div className="px-6 py-4 border-b border-gray-800 bg-secondary-900/50 flex items-center justify-between shrink-0">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary-500" /> Live Detection Preview
            </h3>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-xs font-mono text-gray-400">Processing 30fps</span>
            </div>
          </div>
          
          <div className="relative flex-1 bg-[url('https://images.unsplash.com/photo-1542360663-8f402370efa1?auto=format&fit=crop&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Simulated Bounding Boxes based on slider values */}
            {confidence < 90 && (
              <div className="absolute top-1/3 left-1/4 w-32 h-64 border-2 border-primary-500 bg-primary-500/10">
                <div className="absolute -top-6 left-[-2px] bg-primary-500 text-black text-xs font-bold px-2 py-1">
                  Person {(confidence + Math.random() * 5).toFixed(1)}%
                </div>
              </div>
            )}
            
            {confidence < 70 && (
              <div className="absolute top-1/2 right-1/4 w-48 h-32 border-2 border-accent-blue bg-accent-blue/10">
                <div className="absolute -top-6 left-[-2px] bg-accent-blue text-black text-xs font-bold px-2 py-1">
                  Vehicle {(confidence + Math.random() * 10).toFixed(1)}%
                </div>
              </div>
            )}
            
            {/* NMS overlap simulation */}
            {nms > 60 && confidence < 80 && (
              <div className="absolute top-[35%] left-[28%] w-24 h-56 border-2 border-yellow-500 bg-yellow-500/10 opacity-70">
                <div className="absolute -top-6 left-[-2px] bg-yellow-500 text-black text-xs font-bold px-2 py-1">
                  Person {(confidence - 5).toFixed(1)}%
                </div>
              </div>
            )}
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          </div>
          
          <div className="px-6 py-4 bg-secondary-900 border-t border-gray-800 text-xs text-gray-400 font-mono flex justify-between shrink-0">
            <span>Latency: {(20 + (confidence/10)).toFixed(1)}ms</span>
            <span>Active Classes: 80 (COCO)</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
