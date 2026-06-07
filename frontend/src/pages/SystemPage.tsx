import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Server,
  Database,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { Card, Badge, Button } from '../components/ui';
import { Gauge, MetricGauge } from '../components/dashboard';
import { generateSystemMetrics, serviceStatuses } from '../data/mockData';
import { formatDistanceToNow } from '../lib/utils';
import type { SystemMetrics, ServiceStatus } from '../types';

export default function SystemPage() {
  const [metrics, setMetrics] = useState<SystemMetrics>(generateSystemMetrics());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setMetrics(generateSystemMetrics());
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleRefresh = () => {
    setMetrics(generateSystemMetrics());
    setLastUpdate(new Date());
  };

  const serviceIcon = (name: string) => {
    if (name.includes('API')) return Server;
    if (name.includes('Database')) return Database;
    return Activity;
  };

  const statusColor = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'online':
        return 'text-accent-green';
      case 'offline':
        return 'text-accent-red';
      case 'degraded':
        return 'text-accent-yellow';
    }
  };

  const statusBg = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'online':
        return 'bg-accent-green/20 border-accent-green/30';
      case 'offline':
        return 'bg-accent-red/20 border-accent-red/30';
      case 'degraded':
        return 'bg-accent-yellow/20 border-accent-yellow/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">System Health</h1>
          <p className="text-gray-400 text-sm mt-1">
            Monitor infrastructure and service status
          </p>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 bg-secondary-900 text-primary-500 focus:ring-primary-500/30"
            />
            Auto-refresh (5s)
          </label>

          <Button variant="secondary" size="sm" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>

          <span className="text-xs text-gray-600">
            Last updated: {formatDistanceToNow(lastUpdate)}
          </span>
        </div>
      </div>

      {/* Uptime Banner */}
      <Card className="bg-gradient-to-r from-accent-green/20 to-accent-green/5 border-accent-green/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-green/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-accent-green" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-white">{metrics.uptime.toFixed(2)}%</p>
              <p className="text-sm text-gray-400">System Uptime (Last 30 Days)</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Active Connections</p>
            <p className="text-lg font-mono text-white">{metrics.websocket_connections}</p>
          </div>
        </div>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricGauge
          title="GPU Usage"
          value={metrics.gpu_usage}
          thresholds={{ warning: 70, critical: 90 }}
          icon={<Cpu className="w-5 h-5" />}
        />
        <MetricGauge
          title="CPU Usage"
          value={metrics.cpu_usage}
          thresholds={{ warning: 70, critical: 90 }}
          icon={<Cpu className="w-5 h-5" />}
        />
        <MetricGauge
          title="Memory"
          value={metrics.memory_usage}
          thresholds={{ warning: 75, critical: 90 }}
          icon={<HardDrive className="w-5 h-5" />}
        />
        <MetricGauge
          title="Latency"
          value={metrics.inference_latency}
          unit="ms"
          max={100}
          thresholds={{ warning: 50, critical: 80 }}
          icon={<Activity className="w-5 h-5" />}
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-bold text-white">Inference Latency</h3>
            <Badge variant="success">Normal</Badge>
          </div>
          <p className="text-3xl font-heading font-bold text-white">{metrics.inference_latency.toFixed(1)}ms</p>
          <div className="h-2 bg-secondary-900/50 rounded-full mt-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(metrics.inference_latency / 100) * 100}%` }}
              className="h-full bg-gradient-to-r from-accent-green to-primary-500 rounded-full"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Target: &lt;50ms</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-bold text-white">Queue Depth</h3>
            <Badge variant="info">Active</Badge>
          </div>
          <p className="text-3xl font-heading font-bold text-white">{metrics.queue_depth}</p>
          <p className="text-sm text-gray-400 mt-2">Jobs waiting in Celery queue</p>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>0</span>
              <span>25</span>
              <span>50</span>
            </div>
            <div className="h-2 bg-secondary-900/50 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(metrics.queue_depth / 50) * 100}%` }}
                className="h-full bg-accent-yellow rounded-full"
              />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-bold text-white">Network</h3>
            <Badge variant="success">Connected</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-8 h-8 text-accent-green" />
            <div>
              <p className="text-xl font-heading font-bold text-white">{metrics.websocket_connections}</p>
              <p className="text-sm text-gray-400">WebSocket clients</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">Bandwidth: 125 Mbps</p>
        </Card>
      </div>

      {/* Services Status */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-white mb-6">Service Status</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceStatuses.map((service) => {
            const Icon = serviceIcon(service.name);
            return (
              <div
                key={service.name}
                className={`p-4 rounded-lg border ${statusBg(service.status)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${statusColor(service.status)}`} />
                    </div>
                    <div>
                      <p className="text-white font-medium">{service.name}</p>
                      <p className="text-xs text-gray-500">
                        {service.latency ? `${service.latency}ms` : '-'}
                      </p>
                    </div>
                  </div>
                  <Badge variant={service.status === 'online' ? 'success' : service.status === 'offline' ? 'error' : 'warning'} size="sm">
                    {service.status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* System Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-heading font-bold text-white mb-4">ML Inference Engine</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Model</span>
              <span className="text-white font-mono">YOLOv8-nano</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Backend</span>
              <span className="text-white font-mono">TensorRT 8.6</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Precision</span>
              <span className="text-white font-mono">FP16</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">GPU</span>
              <span className="text-white font-mono">NVIDIA RTX 4090</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-heading font-bold text-white mb-4">Software Versions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">SafeCity AI</span>
              <span className="text-white font-mono">v1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">FastAPI</span>
              <span className="text-white font-mono">0.104.1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">PostgreSQL</span>
              <span className="text-white font-mono">15.4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Redis</span>
              <span className="text-white font-mono">7.2</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
