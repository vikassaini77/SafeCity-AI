import type { User, Camera, Alert, Report, SystemMetrics, KPIMetrics, AnalyticsData, AppSettings } from '../types';

// Demo user
export const demoUser: User = {
  id: '1',
  email: 'demo@safecity.ai',
  full_name: 'Alex Johnson',
  phone: '+1 (555) 123-4567',
  organization: 'SafeCity Security Operations',
  role: 'admin',
  avatar_url: 'https://images.unsplash.com/photo-1472099625465-123a?w=100&h=100&fit=crop',
  is_active: true,
  created_at: '2024-01-15T10:00:00Z',
  last_login: new Date().toISOString(),
};

// Camera locations
const locations = [
  { name: 'Main Entrance', zone: 'Zone A - Perimeter' },
  { name: 'Parking Lot North', zone: 'Zone B - Exterior' },
  { name: 'Parking Lot South', zone: 'Zone B - Exterior' },
  { name: 'Lobby', zone: 'Zone A - Interior' },
  { name: 'Server Room', zone: 'Zone C - Critical' },
  { name: 'Warehouse', zone: 'Zone D - Storage' },
  { name: 'Loading Dock', zone: 'Zone D - Storage' },
  { name: 'Office Floor 1', zone: 'Zone A - Interior' },
  { name: 'Office Floor 2', zone: 'Zone A - Interior' },
  { name: 'Cafeteria', zone: 'Zone A - Interior' },
  { name: 'Emergency Exit West', zone: 'Zone A - Perimeter' },
  { name: 'Emergency Exit East', zone: 'Zone A - Perimeter' },
  { name: 'Rooftop Access', zone: 'Zone C - Critical' },
  { name: 'Basement Storage', zone: 'Zone D - Storage' },
];

// Generate cameras
export const mockCameras: Camera[] = locations.map((loc, i) => ({
  id: `cam-${i + 1}`,
  name: `CAM-${String(i + 1).padStart(3, '0')} - ${loc.name}`,
  location: loc.name,
  stream_url: `rtsp://stream.safecity.ai/camera/${i + 1}`,
  zone: loc.zone,
  status: i === 5 || i === 12 ? 'offline' as const : i === 8 ? 'maintenance' as const : 'online' as const,
  sensitivity: 0.75,
  confidence_threshold: 0.65,
  owner_id: '1',
  created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  updated_at: new Date().toISOString(),
  last_frame_url: `https://images.unsplash.com/photo-${1500000000000 + i * 123456}?w=640&h=360&fit=crop`,
}));

// Anomaly types
const anomalyTypes = [
  'Unauthorized Person Detected',
  'Vehicle in Restricted Zone',
  'Loitering Detected',
  'Crowd Formation',
  'Object Left Behind',
  'Motion in Restricted Area',
  'Person Fall Detected',
  'Suspicious Activity',
  'Perimeter Breach',
  'Fire/Smoke Detected',
  'Face Match - Watchlist',
  'License Plate - Alert',
];

// Generate alerts
function generateAlerts(count: number): Alert[] {
  const alerts: Alert[] = [];
  const severities: Alert['severity'][] = ['low', 'medium', 'high', 'critical'];
  const statuses: Alert['status'][] = ['active', 'acknowledged', 'resolved', 'escalated', 'false_positive'];

  for (let i = 0; i < count; i++) {
    const camera = mockCameras[Math.floor(Math.random() * mockCameras.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const timestamp = new Date(Date.now() - (daysAgo * 24 + hoursAgo) * 60 * 60 * 1000);
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const status = daysAgo > 7 ? 'resolved' as const : statuses[Math.floor(Math.random() * statuses.length)];

    alerts.push({
      id: `alert-${i + 1}`,
      camera_id: camera.id,
      camera_name: camera.name,
      anomaly_type: anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)],
      severity,
      confidence: 0.65 + Math.random() * 0.30,
      frame_snapshot_url: `https://images.unsplash.com/photo-${1500000000000 + i * 54321}?w=640&h=360&fit=crop`,
      bounding_boxes: [
        {
          x: 0.2 + Math.random() * 0.3,
          y: 0.3 + Math.random() * 0.2,
          width: 0.1 + Math.random() * 0.15,
          height: 0.2 + Math.random() * 0.2,
          label: 'Person',
          confidence: 0.85 + Math.random() * 0.14,
        },
      ],
      status,
      acknowledged_by: status !== 'active' ? 'Alex Johnson' : undefined,
      resolved_at: status === 'resolved' ? new Date(timestamp.getTime() + Math.random() * 3600000).toISOString() : undefined,
      created_at: timestamp.toISOString(),
      location: camera.location,
    });
  }

  return alerts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export const mockAlerts = generateAlerts(250);

// Generate reports
export const mockReports: Report[] = [
  {
    id: 'report-1',
    title: 'Monthly Security Summary - January 2024',
    type: 'summary',
    date_from: '2024-01-01T00:00:00Z',
    date_to: '2024-01-31T23:59:59Z',
    camera_ids: mockCameras.slice(0, 5).map(c => c.id),
    content: {
      summary: 'Overall security posture remained stable with a 12% decrease in critical alerts compared to December. Main areas of concern: Parking Lot South and Warehouse zones.',
      total_alerts: 87,
      alerts_by_severity: { low: 32, medium: 38, high: 14, critical: 3 },
      alerts_by_camera: mockCameras.slice(0, 5).map(c => ({ camera_id: c.id, count: Math.floor(Math.random() * 20) + 5 })),
      timeline: Array.from({ length: 31 }, (_, i) => ({
        date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
        count: Math.floor(Math.random() * 10) + 1,
      })),
    },
    status: 'completed',
    created_by: 'Alex Johnson',
    created_at: '2024-02-01T10:00:00Z',
  },
  {
    id: 'report-2',
    title: 'Incident Analysis - Perimeter Breach',
    type: 'detailed',
    date_from: '2024-01-20T00:00:00Z',
    date_to: '2024-01-20T23:59:59Z',
    camera_ids: ['cam-1', 'cam-11', 'cam-12'],
    content: {
      total_alerts: 12,
      alerts_by_severity: { low: 2, medium: 4, high: 4, critical: 2 },
      alerts_by_camera: [
        { camera_id: 'cam-1', count: 5 },
        { camera_id: 'cam-11', count: 4 },
        { camera_id: 'cam-12', count: 3 },
      ],
      timeline: [],
    },
    status: 'completed',
    created_by: 'Alex Johnson',
    created_at: '2024-01-21T08:00:00Z',
  },
  {
    id: 'report-3',
    title: 'Executive Weekly Overview',
    type: 'executive',
    date_from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    date_to: new Date().toISOString(),
    camera_ids: mockCameras.map(c => c.id),
    content: {
      summary: 'Weekly operations normal. 2 cameras offline for maintenance. Average response time improved by 15%.',
      total_alerts: 45,
      alerts_by_severity: { low: 18, medium: 20, high: 6, critical: 1 },
      alerts_by_camera: mockCameras.slice(0, 5).map(c => ({ camera_id: c.id, count: Math.floor(Math.random() * 15) + 3 })),
      timeline: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        count: Math.floor(Math.random() * 8) + 3,
      })),
    },
    status: 'completed',
    created_by: 'Alex Johnson',
    created_at: new Date().toISOString(),
  },
  {
    id: 'report-4',
    title: 'Q4 2023 Security Audit',
    type: 'executive',
    date_from: '2023-10-01T00:00:00Z',
    date_to: '2023-12-31T23:59:59Z',
    camera_ids: mockCameras.map(c => c.id),
    content: {
      summary: 'Q4 showed significant improvement in threat detection accuracy. False positive rate reduced to 2.3%.',
      total_alerts: 312,
      alerts_by_severity: { low: 120, medium: 130, high: 52, critical: 10 },
      alerts_by_camera: [],
      timeline: [],
    },
    status: 'completed',
    created_by: 'Alex Johnson',
    created_at: '2024-01-02T09:00:00Z',
  },
  {
    id: 'report-5',
    title: 'Daily Activity Report',
    type: 'summary',
    date_from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    date_to: new Date().toISOString(),
    camera_ids: mockCameras.slice(0, 7).map(c => c.id),
    content: {
      total_alerts: 23,
      alerts_by_severity: { low: 10, medium: 9, high: 3, critical: 1 },
      alerts_by_camera: [],
      timeline: [],
    },
    status: 'generating',
    created_by: 'Alex Johnson',
    created_at: new Date().toISOString(),
  },
];

// System metrics generator
export function generateSystemMetrics(): SystemMetrics {
  return {
    gpu_usage: 60 + Math.random() * 25,
    cpu_usage: 35 + Math.random() * 30,
    memory_usage: 50 + Math.random() * 20,
    inference_latency: 28 + Math.random() * 8,
    queue_depth: Math.floor(Math.random() * 15),
    websocket_connections: 12 + Math.floor(Math.random() * 8),
    uptime: 99.7 + Math.random() * 0.25,
  };
}

// KPI metrics
export function generateKPIMetrics(): KPIMetrics {
  const todayAlerts = mockAlerts.filter(a => {
    const alertDate = new Date(a.created_at);
    const today = new Date();
    return alertDate.toDateString() === today.toDateString();
  });

  return {
    active_cameras: mockCameras.filter(c => c.status === 'online').length,
    total_cameras: mockCameras.length,
    alerts_today: todayAlerts.length || 47,
    alerts_delta: -8,
    avg_inference_speed: 31.4 + (Math.random() - 0.5) * 2,
    anomalies_detected: 8,
    severity_breakdown: {
      low: 3,
      medium: 3,
      high: 1,
      critical: 1,
    },
  };
}

// Analytics data generator
export function generateAnalyticsData(): AnalyticsData {
  const now = new Date();

  return {
    overview: {
      total_alerts: mockAlerts.length,
      total_cameras: mockCameras.length,
      avg_response_time: 4.2,
      uptime_percentage: 99.7,
    },
    timeline: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(now.getTime() - (23 - i) * 60 * 60 * 1000).toISOString(),
      count: Math.floor(Math.random() * 20) + 5,
    })),
    by_camera: mockCameras.slice(0, 5).map(c => ({
      camera_id: c.id,
      name: c.name,
      count: Math.floor(Math.random() * 50) + 10,
    })),
    by_type: anomalyTypes.slice(0, 6).map(type => ({
      type,
      count: Math.floor(Math.random() * 40) + 5,
    })),
    by_severity: [
      { severity: 'low', count: Math.floor(Math.random() * 50) + 30 },
      { severity: 'medium', count: Math.floor(Math.random() * 40) + 25 },
      { severity: 'high', count: Math.floor(Math.random() * 30) + 15 },
      { severity: 'critical', count: Math.floor(Math.random() * 15) + 5 },
    ],
    hourly_heatmap: Array.from({ length: 24 }, (_, hour) => ({
      hour,
      count: Math.floor(Math.random() * 15) + (hour >= 8 && hour <= 18 ? 10 : 3),
    })),
    confidence_distribution: [
      { range: '60-70%', count: 25 },
      { range: '70-80%', count: 45 },
      { range: '80-90%', count: 35 },
      { range: '90-100%', count: 20 },
    ],
  };
}

// Service statuses
export const serviceStatuses = [
  { name: 'FastAPI Server', status: 'online' as const, latency: 12, last_check: new Date().toISOString() },
  { name: 'ML Inference Engine', status: 'online' as const, latency: 28, last_check: new Date().toISOString() },
  { name: 'PostgreSQL Database', status: 'online' as const, latency: 5, last_check: new Date().toISOString() },
  { name: 'Redis Cache', status: 'online' as const, latency: 2, last_check: new Date().toISOString() },
  { name: 'WebSocket Server', status: 'online' as const, latency: 8, last_check: new Date().toISOString() },
];

// Default settings
export const defaultSettings: AppSettings = {
  platform_name: 'SafeCity AI',
  timezone: 'UTC',
  date_format: 'MM/DD/YYYY',
  theme: 'dark',
  language: 'en',
  email_alerts: true,
  alert_email: 'ops@safecity.ai',
  alert_severity_threshold: 'medium',
  notification_sound: true,
  webhook_url: '',
  inference_backend: 'tensorrt',
  detection_confidence: 0.65,
  nms_threshold: 0.45,
  max_detections: 100,
};
