import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Camera,
  AlertTriangle,
  Clock,
  Activity,
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { useAppStore } from '../store';
import { mockAlerts, mockCameras, generateAnalyticsData } from '../data/mockData';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

type DateRange = 'today' | '7d' | '30d' | 'custom';

export default function AnalyticsPage() {
  const { cameras } = useAppStore();
  const [dateRange, setDateRange] = useState<DateRange>('7d');
  const [analyticsData, setAnalyticsData] = useState(generateAnalyticsData());

  useEffect(() => {
    // Refresh analytics data
    const interval = setInterval(() => {
      setAnalyticsData(generateAnalyticsData());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const severities = [
    { name: 'Low', value: 120, color: '#00FF88' },
    { name: 'Medium', value: 180, color: '#FFB800' },
    { name: 'High', value: 45, color: '#FF6B35' },
    { name: 'Critical', value: 12, color: '#FF3B3B' },
  ];

  const COLORS = ['#00F2FF', '#00FF88', '#FFB800', '#FF6B35', '#FF3B3B'];

  const hours = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    count: Math.floor(Math.random() * 15) + (i >= 8 && i <= 20 ? 10 : 3),
  }));

  const weekData = [
    { day: 'Mon', alerts: 45, resolved: 42 },
    { day: 'Tue', alerts: 52, resolved: 48 },
    { day: 'Wed', alerts: 38, resolved: 35 },
    { day: 'Thu', alerts: 61, resolved: 58 },
    { day: 'Fri', alerts: 55, resolved: 50 },
    { day: 'Sat', alerts: 28, resolved: 25 },
    { day: 'Sun', alerts: 22, resolved: 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Analytics</h1>
          <p className="text-gray-400 text-sm mt-1">
            Gain insights from your surveillance data
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <div className="flex items-center gap-1 bg-secondary-900/50 rounded-lg p-1">
            {(['today', '7d', '30d'] as DateRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  dateRange === range
                    ? 'bg-primary-500/20 text-primary-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {range === 'today' ? 'Today' : range === '7d' ? '7 Days' : '30 Days'}
              </button>
            ))}
          </div>

          <Button variant="secondary" size="sm">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="relative">
            <p className="text-sm text-gray-400">Total Alerts</p>
            <p className="text-3xl font-heading font-bold text-white mt-1">{analyticsData.overview.total_alerts}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-accent-green">
              <TrendingUp className="w-3 h-3" />
              <span>12% from last period</span>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-green/5 rounded-full blur-3xl" />
          <div className="relative">
            <p className="text-sm text-gray-400">Active Cameras</p>
            <p className="text-3xl font-heading font-bold text-white mt-1">{analyticsData.overview.total_cameras}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
              <Camera className="w-3 h-3" />
              <span>{mockCameras.filter(c => c.status === 'online').length} online</span>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-yellow/5 rounded-full blur-3xl" />
          <div className="relative">
            <p className="text-sm text-gray-400">Avg Response Time</p>
            <p className="text-3xl font-heading font-bold text-white mt-1">{analyticsData.overview.avg_response_time}s</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-accent-green">
              <TrendingDown className="w-3 h-3" />
              <span>15% faster</span>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-green/5 rounded-full blur-3xl" />
          <div className="relative">
            <p className="text-sm text-gray-400">System Uptime</p>
            <p className="text-3xl font-heading font-bold text-white mt-1">{analyticsData.overview.uptime_percentage}%</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-accent-green">
              <Activity className="w-3 h-3" />
              <span>99.9% SLA target</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Alert Trend */}
        <Card>
          <h3 className="text-lg font-heading font-bold text-white mb-4">Alert Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.timeline}>
                <defs>
                  <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F2FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00F2FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(v) => new Date(v).toLocaleTimeString([], { hour: '2-digit' })}
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
                  labelFormatter={(v) => new Date(v).toLocaleString()}
                />
                <Area type="monotone" dataKey="count" stroke="#00F2FF" fillOpacity={1} fill="url(#colorAlerts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Severity Distribution */}
        <Card>
          <h3 className="text-lg font-heading font-bold text-white mb-4">Severity Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severities}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {severities.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid rgba(0, 242, 255, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Legend
                  formatter={(value) => <span className="text-gray-300">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {severities.map((s) => (
              <div key={s.name} className="text-center">
                <div className="text-2xl font-heading font-bold text-white">{s.value}</div>
                <div className="text-xs text-gray-500">{s.name}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Cameras */}
        <Card>
          <h3 className="text-lg font-heading font-bold text-white mb-4">Top Cameras by Alerts</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.by_camera} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="#6b7280" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  tickFormatter={(v) => v.split(' - ')[0]}
                  stroke="#6b7280"
                  fontSize={10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid rgba(0, 242, 255, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="count" fill="#00F2FF" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Hourly Heatmap */}
        <Card>
          <h3 className="text-lg font-heading font-bold text-white mb-4">Activity by Hour</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hours}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="hour"
                  tickFormatter={(v) => `${v}:00`}
                  stroke="#6b7280"
                  fontSize={10}
                />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid rgba(0, 242, 255, 0.2)',
                    borderRadius: '8px',
                  }}
                  labelFormatter={(v) => `${v}:00 - ${v}:59`}
                />
                <Bar dataKey="count" fill="#00F2FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Anomaly Types */}
        <Card>
          <h3 className="text-lg font-heading font-bold text-white mb-4">Anomaly Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.by_type}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="type" stroke="#6b7280" fontSize={8} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid rgba(0, 242, 255, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {analyticsData.by_type.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Weekly Comparison */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-white mb-4">Weekly Alert Resolution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="colorAlertsWeek" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF3B3B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF3B3B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00FF88" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a2e',
                  border: '1px solid rgba(0, 242, 255, 0.2)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="alerts" stroke="#FF3B3B" fillOpacity={1} fill="url(#colorAlertsWeek)" name="Total Alerts" />
              <Area type="monotone" dataKey="resolved" stroke="#00FF88" fillOpacity={1} fill="url(#colorResolved)" name="Resolved" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
