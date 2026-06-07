import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, AlertTriangle, Zap, Activity, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, Badge, LiveBadge } from '../components/ui';
import { KPICard, CameraFeed, AlertFeed, VideoUpload } from '../components/dashboard';
import { useAppStore } from '../store';
import { mockCameras, mockAlerts, generateKPIMetrics, generateAnalyticsData } from '../data/mockData';
import { LineChart, LineChart as RechartsLine, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function DashboardPage() {
  const { cameras, setCameras, alerts } = useAppStore();
  const [kpiMetrics, setKpiMetrics] = useState(generateKPIMetrics());
  const [analyticsData] = useState(generateAnalyticsData());

  useEffect(() => {
    if (cameras.length === 0) setCameras(mockCameras);
  }, [cameras.length, setCameras]);

  // Update KPIs periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setKpiMetrics(generateKPIMetrics());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const onlineCameras = mockCameras.filter((c) => c.status === 'online');
  const displayCameras = onlineCameras.slice(0, 4);
  // Use global state alerts instead of mockAlerts
  const recentAlerts = alerts.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm mt-1">Monitor your surveillance network in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <LiveBadge className="ml-2" />
          <span className="text-sm text-gray-400 font-mono">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Cameras"
          value={`${kpiMetrics.active_cameras}/${kpiMetrics.total_cameras}`}
          subtitle="Cameras online"
          icon={Video}
          iconColor="text-primary-500"
        />
        <KPICard
          title="Alerts Today"
          value={kpiMetrics.alerts_today}
          delta={kpiMetrics.alerts_delta}
          subtitle="Total alerts"
          icon={AlertTriangle}
          iconColor="text-accent-red"
        />
        <KPICard
          title="Inference Speed"
          value={kpiMetrics.avg_inference_speed.toFixed(1)}
          suffix=" FPS"
          subtitle="Average speed"
          icon={Zap}
          iconColor="text-accent-green"
        />
        <KPICard
          title="Anomalies Detected"
          value={kpiMetrics.anomalies_detected}
          subtitle="Today"
          icon={Activity}
          iconColor="text-accent-yellow"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Camera Feeds - 2/3 width */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-bold text-white">Live Feeds</h2>
            <Link
              to="/dashboard/live-feeds"
              className="flex items-center gap-1 text-sm text-primary-500 hover:text-primary-400 transition-colors"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {displayCameras.map((camera) => (
              <CameraFeed
                key={camera.id}
                camera={camera}
                compact
                alerts={mockAlerts.filter((a) => a.camera_id === camera.id && a.status === 'active').slice(0, 3)}
              />
            ))}
          </div>
        </div>

        {/* Alert Feed - 1/3 width */}
        <div className="lg:col-span-1">
          <Card padding="none" className="h-[500px] overflow-hidden">
            <AlertFeed
              alerts={recentAlerts}
              maxItems={8}
            />
          </Card>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Anomaly Trend Chart */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-bold text-white">Anomaly Trend</h3>
            <span className="text-sm text-gray-500">Last 24 hours</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.timeline}>
                <defs>
                  <linearGradient id="colorAnomalies" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F2FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00F2FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit' })}
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid rgba(0, 242, 255, 0.2)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: '#00F2FF' }}
                  labelFormatter={(value) => new Date(value).toLocaleTimeString()}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#00F2FF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAnomalies)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Forensic Upload */}
        <VideoUpload />

        {/* Camera Status Grid */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-bold text-white">Camera Status</h3>
            <Link
              to="/dashboard/cameras"
              className="flex items-center gap-1 text-sm text-primary-500 hover:text-primary-400 transition-colors"
            >
              Manage
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {mockCameras.slice(0, 12).map((camera) => (
              <div
                key={camera.id}
                className="flex items-center gap-2 p-2 rounded-lg bg-secondary-900/50"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    camera.status === 'online'
                      ? 'bg-accent-green animate-pulse'
                      : camera.status === 'offline'
                      ? 'bg-accent-red'
                      : 'bg-accent-yellow'
                  }`}
                />
                <span className="text-xs text-gray-400 truncate flex-1">
                  {camera.name.split(' - ')[0]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-accent-green">
                <div className="w-2 h-2 rounded-full bg-accent-green" />
                {mockCameras.filter((c) => c.status === 'online').length} Online
              </span>
              <span className="flex items-center gap-1.5 text-accent-red">
                <div className="w-2 h-2 rounded-full bg-accent-red" />
                {mockCameras.filter((c) => c.status === 'offline').length} Offline
              </span>
              <span className="flex items-center gap-1.5 text-accent-yellow">
                <div className="w-2 h-2 rounded-full bg-accent-yellow" />
                {mockCameras.filter((c) => c.status === 'maintenance').length} Maintenance
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Severity Breakdown */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-white mb-4">Alert Severity Breakdown</h3>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(kpiMetrics.severity_breakdown).map(([severity, count]) => (
            <div
              key={severity}
              className={`p-4 rounded-lg border ${
                severity === 'low'
                  ? 'border-severity-low/30 bg-severity-low/10'
                  : severity === 'medium'
                  ? 'border-severity-medium/30 bg-severity-medium/10'
                  : severity === 'high'
                  ? 'border-severity-high/30 bg-severity-high/10'
                  : 'border-severity-critical/30 bg-severity-critical/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant={severity as any}>{severity.toUpperCase()}</Badge>
                <span className="text-2xl font-heading font-bold text-white">{count}</span>
              </div>
              <div className="text-xs text-gray-500">
                {((count / kpiMetrics.alerts_today) * 100).toFixed(0)}% of today's alerts
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
