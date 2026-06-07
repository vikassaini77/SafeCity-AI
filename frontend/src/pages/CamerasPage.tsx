import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Settings,
  Trash2,
  Play,
  Pause,
  Wifi,
  WifiOff,
  MoreVertical,
  ExternalLink,
  TestTube,
  Edit2,
} from 'lucide-react';
import { Card, Button, Badge, StatusBadge, Modal, Input } from '../components/ui';
import { useAppStore } from '../store';
import { mockCameras } from '../data/mockData';
import { formatDateTime } from '../lib/utils';
import type { Camera } from '../types';

export default function CamerasPage() {
  const { cameras, setCameras } = useAppStore();
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);
  const [testingCamera, setTestingCamera] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const allCameras = cameras.length > 0 ? cameras : mockCameras;
  const zones = ['all', ...new Set(allCameras.map((c) => c.zone))];

  const filteredCameras = allCameras.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    const matchZone = selectedZone === 'all' || c.zone === selectedZone;
    return matchSearch && matchZone;
  });

  const handleTestConnection = async (cameraId: string) => {
    setTestingCamera(cameraId);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setTestingCamera(null);
  };

  const handleToggleStatus = (camera: Camera) => {
    const updated = allCameras.map((c) =>
      c.id === camera.id
        ? { ...c, status: c.status === 'online' ? 'offline' as const : 'online' as const }
        : c
    );
    setCameras(updated);
  };

  const handleDelete = (id: string) => {
    const updated = allCameras.filter((c) => c.id !== id);
    setCameras(updated);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Camera Management</h1>
          <p className="text-gray-400 text-sm mt-1">
            Configure and manage your camera network
          </p>
        </div>

        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Camera
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4">
        <Card padding="sm">
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-white">{allCameras.length}</p>
            <p className="text-xs text-gray-500">Total Cameras</p>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-accent-green">
              {allCameras.filter((c) => c.status === 'online').length}
            </p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-accent-red">
              {allCameras.filter((c) => c.status === 'offline').length}
            </p>
            <p className="text-xs text-gray-500">Offline</p>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-accent-yellow">
              {allCameras.filter((c) => c.status === 'maintenance').length}
            </p>
            <p className="text-xs text-gray-500">Maintenance</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search cameras..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>
          </div>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-3 py-2 bg-secondary-900/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          >
            {zones.map((zone) => (
              <option key={zone} value={zone}>
                {zone === 'all' ? 'All Zones' : zone}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Camera List */}
      <div className="space-y-3">
        {filteredCameras.map((camera) => (
          <motion.div
            key={camera.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4">
              {/* Status Indicator */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    camera.status === 'online'
                      ? 'bg-accent-green animate-pulse'
                      : camera.status === 'offline'
                      ? 'bg-accent-red'
                      : 'bg-accent-yellow'
                  }`}
                />
                <div>
                  <p className="text-white font-medium">{camera.name}</p>
                  <p className="text-sm text-gray-500">{camera.zone}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex-1 hidden md:block">
                <p className="text-sm text-gray-400">{camera.location}</p>
              </div>

              {/* Stream URL */}
              <div className="flex-1 hidden lg:block">
                <p className="text-xs text-gray-600 font-mono truncate">{camera.stream_url}</p>
              </div>

              {/* Status Badge */}
              <StatusBadge status={camera.status} />

              {/* Sensitivity */}
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-xs text-gray-500">Sens:</span>
                <span className="text-xs text-gray-300 font-mono">
                  {(camera.sensitivity * 100).toFixed(0)}%
                </span>
              </div>

              {/* Last Seen */}
              <div className="hidden md:block text-right">
                <p className="text-xs text-gray-500">Last seen</p>
                <p className="text-xs text-gray-400">
                  {camera.status === 'online' ? 'Now' : formatDateTime(camera.updated_at)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleTestConnection(camera.id)}
                  isLoading={testingCamera === camera.id}
                >
                  <TestTube className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingCamera(camera)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleToggleStatus(camera)}
                >
                  {camera.status === 'online' ? (
                    <Pause className="w-4 h-4 text-accent-yellow" />
                  ) : (
                    <Play className="w-4 h-4 text-accent-green" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setDeleteConfirm(camera.id)}
                >
                  <Trash2 className="w-4 h-4 text-accent-red" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCameras.length === 0 && (
        <Card className="text-center py-12">
          <WifiOff className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No cameras found</p>
          <p className="text-sm text-gray-600 mt-1">Try adjusting your search or filters</p>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isAddModalOpen || !!editingCamera}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingCamera(null);
        }}
        title={editingCamera ? 'Edit Camera' : 'Add New Camera'}
        size="lg"
      >
        <CameraForm
          camera={editingCamera}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingCamera(null);
          }}
        />
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Camera"
        size="sm"
      >
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete this camera? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

// Camera Form Component
function CameraForm({
  camera,
  onClose,
}: {
  camera: Camera | null;
  onClose: () => void;
}) {
  const { cameras, setCameras } = useAppStore();
  const [name, setName] = useState(camera?.name || '');
  const [location, setLocation] = useState(camera?.location || '');
  const [streamUrl, setStreamUrl] = useState(camera?.stream_url || '');
  const [zone, setZone] = useState(camera?.zone || 'Zone A - Interior');
  const [sensitivity, setSensitivity] = useState(camera?.sensitivity || 0.75);
  const [confidenceThreshold, setConfidenceThreshold] = useState(
    camera?.confidence_threshold || 0.65
  );

  const handleSave = () => {
    if (camera) {
      // Update existing
      const updated = cameras.map((c) =>
        c.id === camera.id
          ? {
              ...c,
              name,
              location,
              stream_url: streamUrl,
              zone,
              sensitivity,
              confidence_threshold: confidenceThreshold,
              updated_at: new Date().toISOString(),
            }
          : c
      );
      setCameras(updated);
    } else {
      // Add new
      const newCamera: Camera = {
        id: `cam-${Date.now()}`,
        name,
        location,
        stream_url: streamUrl,
        zone,
        status: 'online',
        sensitivity,
        confidence_threshold: confidenceThreshold,
        owner_id: '1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setCameras([...cameras, newCamera]);
    }
    onClose();
  };

  return (
    <div className="space-y-4">
      <Input label="Camera Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <Input
        label="Stream URL (RTSP/HTTP)"
        value={streamUrl}
        onChange={(e) => setStreamUrl(e.target.value)}
        placeholder="rtsp://example.com/stream"
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Zone</label>
        <select
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          className="w-full px-4 py-3 bg-secondary-900/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        >
          <option>Zone A - Interior</option>
          <option>Zone A - Perimeter</option>
          <option>Zone B - Exterior</option>
          <option>Zone C - Critical</option>
          <option>Zone D - Storage</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Detection Sensitivity: {(sensitivity * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={sensitivity}
          onChange={(e) => setSensitivity(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Confidence Threshold: {(confidenceThreshold * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={confidenceThreshold}
          onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          {camera ? 'Save Changes' : 'Add Camera'}
        </Button>
      </div>
    </div>
  );
}
