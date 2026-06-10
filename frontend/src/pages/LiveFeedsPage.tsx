import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  Grid2X2,
  Grid3X3,
  Rows4,
  Pause,
  Play,
  Filter,
  Eye,
  Zap,
  Settings,
  Camera,
  Video
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { CameraFeed } from '../components/dashboard';
import { useAppStore } from '../store';
import { mockCameras, mockAlerts } from '../data/mockData';
import { cn } from '../lib/utils';

type GridSize = '1x1' | '2x2' | '3x3' | '4x4';

export default function LiveFeedsPage() {
  const { cameras, setCameras, setAlerts } = useAppStore();
  const [gridSize, setGridSize] = useState<GridSize>('2x2');
  const [isPaused, setIsPaused] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [expandedCamera, setExpandedCamera] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(true);
  const [totalDetections, setTotalDetections] = useState(0);
  const [isLiveWebcamActive, setIsLiveWebcamActive] = useState(false);

  const toggleLiveWebcam = async () => {
    try {
      if (isLiveWebcamActive) {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/stream/live/stop`, { method: 'POST' });
        setIsLiveWebcamActive(false);
      } else {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/stream/live/start`, { method: 'POST' });
        setIsLiveWebcamActive(true);
      }
    } catch (err) {
      console.error('Failed to toggle live webcam', err);
    }
  };

  // Initialize with mock cameras if empty
  useEffect(() => {
    if (cameras.length === 0) {
      setCameras(mockCameras);
    }
  }, [cameras.length, setCameras, setAlerts]);

  // Simulate detection count updates
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTotalDetections(prev => prev + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const displayCameras = cameras.length > 0 ? cameras : mockCameras;
  const zones = ['all', ...new Set(displayCameras.map((c) => c.zone))];

  const filteredCameras = displayCameras.filter(
    (c) => (selectedZone === 'all' || c.zone === selectedZone) && c.id !== 'cam-4'
  );

  const gridCols: Record<GridSize, string> = {
    '1x1': 'grid-cols-1 max-w-4xl mx-auto',
    '2x2': 'grid-cols-2',
    '3x3': 'grid-cols-2 lg:grid-cols-3',
    '4x4': 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  const gridButtons = [
    { size: '1x1' as const, icon: LayoutGrid },
    { size: '2x2' as const, icon: Grid2X2 },
    { size: '3x3' as const, icon: Grid3X3 },
    { size: '4x4' as const, icon: Rows4 },
  ];

  const activeCameras = filteredCameras.filter(c => c.status === 'online');
  const offlineCameras = filteredCameras.filter(c => c.status === 'offline');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Live Feeds</h1>
          <p className="text-gray-400 text-sm mt-1">
            Real-time multi-camera surveillance with AI detection
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Demo Mode Indicator */}
          <div className="flex items-center gap-2 px-3 py-2 bg-primary-500/10 border border-primary-500/30 rounded-lg">
            <Zap className="w-4 h-4 text-primary-500" />
            <span className="text-sm text-primary-400 font-medium">AI Detection Active</span>
          </div>

          {/* Detection Counter */}
          <div className="flex items-center gap-2 px-3 py-2 bg-surface border border-gray-700 rounded-lg">
            <Eye className="w-4 h-4 text-accent-green" />
            <span className="text-sm text-gray-300">
              <span className="text-white font-bold">{totalDetections.toLocaleString()}</span> detections
            </span>
          </div>

          {/* Zone Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-secondary-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              {zones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone === 'all' ? 'All Zones' : zone}
                </option>
              ))}
            </select>
          </div>

          {/* Pause/Resume */}
          <Button
            variant={isPaused ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {isPaused ? 'Resume' : 'Pause All'}
          </Button>

          {/* Live Webcam Toggle */}
          <button
            onClick={toggleLiveWebcam}
            className={cn(
              "px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors border",
              isLiveWebcamActive 
                ? "bg-red-500/20 text-red-500 border-red-500/50 hover:bg-red-500/30" 
                : "bg-primary-500 text-white border-transparent hover:bg-primary-600"
            )}
          >
            {isLiveWebcamActive ? (
              <><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Stop Live Webcam</>
            ) : (
              <><Camera className="w-4 h-4" /> Start Live Webcam</>
            )}
          </button>
        </div>
      </div>

      {/* Demo Info Banner */}
      <Card 
        className="bg-gradient-to-r from-primary-500/10 to-accent-green/10 border-primary-500/30 cursor-pointer hover:border-primary-500/60 transition-all hover:shadow-[0_0_15px_rgba(0,242,255,0.2)] group"
        onClick={() => setExpandedCamera('cam-4')}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
            <Zap className="w-6 h-6 text-primary-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-heading font-bold group-hover:text-primary-400 transition-colors">Live AI Detection Demo</h3>
            <p className="text-sm text-gray-400">
              Click here to view the full-screen interactive tracking demo. Detection boxes update in real-time showing persons (cyan) and vehicles (green).
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-500 rounded" />
              <span className="text-gray-400">Person</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-accent-green rounded" />
              <span className="text-gray-400">Vehicle</span>
            </div>
            <Button variant="secondary" size="sm" className="ml-4 pointer-events-none group-hover:bg-primary-500/20">
              View Demo
            </Button>
          </div>
        </div>
      </Card>

      {/* LIVE WEBCAM FEED DISPLAY */}
      {isLiveWebcamActive && (
        <Card className="border-red-500/50 overflow-hidden bg-black p-0 relative group">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg border border-red-500/50">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-medium text-white tracking-wider">LIVE WEBCAM AI</span>
          </div>
          <img 
            src={`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/stream/live/feed`} 
            alt="Live Webcam Feed" 
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </Card>
      )}

      {/* Grid Controls & Stats */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Layout:</span>
          <div className="flex items-center gap-1 bg-secondary-900/50 rounded-lg p-1">
            {gridButtons.map(({ size, icon: Icon }) => (
              <button
                key={size}
                onClick={() => setGridSize(size)}
                className={cn(
                  'p-2 rounded transition-colors',
                  gridSize === size
                    ? 'bg-primary-500/20 text-primary-500'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="text-accent-green flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            {activeCameras.length} Active
          </span>
          {offlineCameras.length > 0 && (
            <span className="text-accent-red flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent-red" />
              {offlineCameras.length} Offline
            </span>
          )}
        </div>
      </div>

      {/* Camera Grid */}
      <div className={cn('grid gap-4', gridCols[gridSize])}>
        {filteredCameras.map((camera) => (
          <motion.div
            key={camera.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <CameraFeed
              camera={camera}
              isLive={!isPaused}
              showControls
              alerts={mockAlerts.filter(
                (a) => a.camera_id === camera.id && a.status === 'active'
              )}
              onExpand={() => setExpandedCamera(camera.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCameras.length === 0 && (
        <Card className="text-center py-12">
          <Eye className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No cameras found for the selected filter.</p>
        </Card>
      )}

      {/* Expanded Camera Modal */}
      <AnimatePresence>
        {expandedCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setExpandedCamera(null)}
          >
            <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-bold text-white">
                  {displayCameras.find(c => c.id === expandedCamera)?.name}
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setExpandedCamera(null)}>
                  Close
                </Button>
              </div>
              <CameraFeed
                camera={displayCameras.find((c) => c.id === expandedCamera)!}
                isLive={!isPaused}
                showControls
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
