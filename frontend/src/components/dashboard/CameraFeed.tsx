import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Maximize2, Camera, WifiOff, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge, LiveBadge, StatusBadge } from '../ui';
import type { Camera as CameraType, Alert } from '../../types';

interface DetectionBox {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  confidence: number;
  color: string;
}

interface CameraFeedProps {
  camera: CameraType;
  isLive?: boolean;
  showControls?: boolean;
  alerts?: Alert[];
  onExpand?: () => void;
}

// Camera background scenes
const cameraScenes: Record<string, { bg: string; detections: { label: string; w: number; h: number }[] }> = {
  'Zone A - Perimeter': {
    bg: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=640&h=360&fit=crop',
    detections: [
      { label: 'Person', w: 0.08, h: 0.22 },
      { label: 'Person', w: 0.07, h: 0.20 },
      { label: 'Vehicle', w: 0.18, h: 0.12 },
    ],
  },
  'Zone B - Exterior': {
    bg: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=640&h=360&fit=crop',
    detections: [
      { label: 'Vehicle', w: 0.20, h: 0.14 },
      { label: 'Vehicle', w: 0.22, h: 0.15 },
      { label: 'Person', w: 0.06, h: 0.18 },
      { label: 'Person', w: 0.07, h: 0.19 },
    ],
  },
  'Zone A - Interior': {
    bg: 'https://images.unsplash.com/photo-1497366216548-3d26066baa79?w=640&h=360&fit=crop',
    detections: [
      { label: 'Person', w: 0.07, h: 0.20 },
      { label: 'Person', w: 0.06, h: 0.18 },
      { label: 'Person', w: 0.08, h: 0.21 },
      { label: 'Backpack', w: 0.08, h: 0.10 },
    ],
  },
  'Zone C - Critical': {
    bg: 'https://images.unsplash.com/photo-1558494949-efb8e95a0e5f?w=640&h=360&fit=crop',
    detections: [
      { label: 'Person', w: 0.06, h: 0.17 },
      { label: ' Laptop', w: 0.12, h: 0.08 },
    ],
  },
  'Zone D - Storage': {
    bg: 'https://images.unsplash.com/photo-1586528116311-be865f3266f0?w=640&h=360&fit=crop',
    detections: [
      { label: 'Person', w: 0.07, h: 0.19 },
      { label: 'Forklift', w: 0.25, h: 0.16 },
      { label: 'Box', w: 0.10, h: 0.08 },
    ],
  },
};

const defaultScene = {
  bg: 'https://images.unsplash.com/photo-1563982632107-86316b5872a0?w=640&h=360&fit=crop',
  detections: [
    { label: 'Person', w: 0.08, h: 0.20 },
    { label: 'Vehicle', w: 0.18, h: 0.12 },
  ],
};

const labelColors: Record<string, string> = {
  Person: '#00F2FF',
  Vehicle: '#00FF88',
  Car: '#00FF88',
  Truck: '#FFB800',
  Motorcycle: '#FF6B35',
  Bicycle: '#FF6B35',
  Backpack: '#A855F7',
  Bag: '#A855F7',
  Forklift: '#FFB800',
  Box: '#6B7280',
  Laptop: '#6B7280',
};

export function CameraFeed({
  camera,
  isLive = true,
  showControls = true,
  alerts = [],
  onExpand,
}: CameraFeedProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [fps, setFps] = useState(31.4);
  const [detections, setDetections] = useState<DetectionBox[]>([]);
  const [showAccident, setShowAccident] = useState(false);

  const scene = cameraScenes[camera.zone] || defaultScene;

  // Simulate an incident occurring periodically
  useEffect(() => {
    if (!isLive || camera.status !== 'online') return;
    
    // Trigger an "accident" every 10 seconds for the demo
    const interval = setInterval(() => {
      setShowAccident(true);
      setTimeout(() => setShowAccident(false), 4000); // lasts 4 seconds
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isLive, camera.status]);

  // Generate realistic detections
  const generateDetections = useCallback(() => {
    // If accident is active, draw a red box around the vehicles
    if (showAccident && camera.id === 'cam-1') {
      return [{
        id: `det-accident-${Date.now()}`,
        x: 0.35,
        y: 0.40,
        w: 0.30,
        h: 0.20,
        label: 'Vehicle Collision',
        confidence: 0.97,
        color: '#FF3B3B', // Red for accident
      }];
    }
    // Normal traffic boxes
    if (camera.id === 'cam-1') {
      return [{
        id: `det-car1-${Date.now()}`,
        x: 0.20 + Math.random() * 0.1,
        y: 0.50 + Math.random() * 0.1,
        w: 0.15,
        h: 0.15,
        label: 'Vehicle',
        confidence: 0.85 + Math.random() * 0.1,
        color: '#00FF88',
      }, {
        id: `det-car2-${Date.now()}`,
        x: 0.60 + Math.random() * 0.1,
        y: 0.45 + Math.random() * 0.1,
        w: 0.18,
        h: 0.16,
        label: 'Vehicle',
        confidence: 0.88 + Math.random() * 0.1,
        color: '#00FF88',
      }];
    }
    return [];
  }, [showAccident, camera.id]);

  // Simulate real-time detection updates
  useEffect(() => {
    if (!isLive || camera.status !== 'online') return;

    // Initial detections
    setDetections(generateDetections());
    setFps(28 + Math.random() * 6);

    // Update detections every 1.5-3 seconds
    const interval = setInterval(() => {
      setDetections(generateDetections());
      setFps(28 + Math.random() * 6);
    }, 1500 + Math.random() * 1500);

    // FPS fluctuation
    const fpsInterval = setInterval(() => {
      setFps(prev => Math.max(26, Math.min(35, prev + (Math.random() - 0.5) * 2)));
    }, 200);

    return () => {
      clearInterval(interval);
      clearInterval(fpsInterval);
    };
  }, [isLive, camera.status, generateDetections]);

  const isOffline = camera.status === 'offline';
  const isMaintenance = camera.status === 'maintenance';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'relative rounded-xl overflow-hidden border transition-all duration-300',
        'hover:shadow-glow-primary hover:border-primary-500/50',
        isOffline ? 'border-accent-red/30 bg-secondary-900/30' : 'border-primary-500/20 bg-surface',
        'aspect-video'
      )}
    >
      {/* Video Feed Area */}
      <div className="relative w-full h-full">
        {isOffline ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80">
            <WifiOff className="w-10 h-10 text-accent-red mb-3" />
            <p className="text-gray-400 text-sm font-mono">Camera Offline</p>
            <p className="text-gray-600 text-xs mt-1">Last seen 2h ago</p>
          </div>
        ) : isMaintenance ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80">
            <Camera className="w-10 h-10 text-accent-yellow mb-3" />
            <p className="text-gray-400 text-sm font-mono">Under Maintenance</p>
            <p className="text-gray-600 text-xs mt-1">Returning shortly</p>
          </div>
        ) : (
          <>
            {/* Background Video / Image */}
            {camera.id === 'cam-1' ? (
              <video 
                src="/car-demo.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${scene.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}

            {/* Dark overlay for better contrast */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Scan line effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ y: ['0%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className={cn(
                  "absolute inset-x-0 h-16 bg-gradient-to-b from-transparent to-transparent",
                  showAccident && camera.id === 'cam-1' ? "via-accent-red/30" : "via-primary-500/10"
                )}
              />
            </div>

            {/* Grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 242, 255, 0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 242, 255, 0.5) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />

            {/* Detection Boxes */}
            <AnimatePresence mode="popLayout">
              {detections.map((det) => (
                <motion.div
                  key={det.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${det.x * 100}%`,
                    top: `${det.y * 100}%`,
                    width: `${det.w * 100}%`,
                    height: `${det.h * 100}%`,
                  }}
                >
                  {/* Box border with animation */}
                  <div
                    className="absolute inset-0 border-2 rounded transition-colors"
                    style={{
                      borderColor: det.color,
                      boxShadow: `0 0 10px ${det.color}40, inset 0 0 10px ${det.color}20`,
                    }}
                  />

                  {/* Corner accents */}
                  <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: det.color }} />
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: det.color }} />
                  <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: det.color }} />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: det.color }} />

                  {/* Label */}
                  <div
                    className="absolute -top-7 left-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1"
                    style={{
                      backgroundColor: det.color,
                      color: '#0A0E1A',
                    }}
                  >
                    <span>{det.label}</span>
                    <span className="opacity-80">{(det.confidence * 100).toFixed(0)}%</span>
                  </div>

                  {/* Tracking ID */}
                  <div
                    className="absolute -bottom-5 left-0 px-1.5 py-0.5 rounded text-[9px] font-mono"
                    style={{
                      backgroundColor: `${det.color}40`,
                      color: det.color,
                    }}
                  >
                    ID-{Math.floor(Math.random() * 999).toString().padStart(3, '0')}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Motion trails for detections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {detections.map((det) => (
                <motion.rect
                  key={`trail-${det.id}`}
                  x={`${det.x * 100}%`}
                  y={`${det.y * 100}%`}
                  width={`${det.w * 100}%`}
                  height={`${det.h * 100}%`}
                  fill="none"
                  stroke={det.color}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  rx="4"
                />
              ))}
            </svg>
          </>
        )}
      </div>

      {/* Top Bar - Camera Info */}
      <div className="absolute top-0 left-0 right-0 p-3 flex items-start justify-between bg-gradient-to-b from-black/70 via-black/30 to-transparent">
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate drop-shadow-lg">{camera.name}</p>
          <p className="text-gray-300 text-xs truncate">{camera.zone}</p>
        </div>
        <div className="flex items-center gap-2">
          {isLive && camera.status === 'online' && <LiveBadge />}
          <StatusBadge status={camera.status} />
        </div>
      </div>

      {/* Bottom Bar - Stats & Controls */}
      {camera.status === 'online' && (
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="flex items-center gap-2">
            <Badge variant="info" size="sm" className="font-mono">
              {fps.toFixed(1)} FPS
            </Badge>
            <Badge variant="default" size="sm" className="font-mono">
              1080p
            </Badge>
            <Badge variant="success" size="sm" className="font-mono">
              {detections.length} Obj
            </Badge>
          </div>

          {showControls && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              {onExpand && (
                <button
                  onClick={onExpand}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Real-time Timestamp */}
      {camera.status === 'online' && (
        <div className="absolute bottom-12 right-3 px-2 py-1 bg-black/50 rounded text-[10px] font-mono text-gray-300">
          {new Date().toLocaleTimeString()}
        </div>
      )}

      {/* Alert Indicator */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-14 right-3"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-accent-red/30 border border-accent-red/50 rounded-full backdrop-blur-sm"
          >
            <AlertTriangle className="w-3 h-3 text-accent-red" />
            <span className="text-xs text-accent-red font-bold">
              {alerts.length} Alert{alerts.length > 1 ? 's' : ''}
            </span>
          </motion.div>
        </motion.div>
      )}

      {/* Detection Count Overlay */}
      {camera.status === 'online' && detections.length > 0 && (
        <div className="absolute top-14 left-3 flex items-center gap-2">
          <div className="px-2 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full backdrop-blur-sm">
            <span className="text-xs text-primary-400 font-mono">
              {detections.filter(d => d.label === 'Person').length}P / {detections.filter(d => d.label !== 'Person').length}V
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
