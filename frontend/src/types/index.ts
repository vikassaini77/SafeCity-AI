export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  organization?: string;
  role: 'admin' | 'operator' | 'viewer';
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  last_login?: string;
}

export interface Camera {
  id: string;
  name: string;
  location: string;
  stream_url: string;
  zone: string;
  status: 'online' | 'offline' | 'maintenance';
  sensitivity: number;
  confidence_threshold: number;
  owner_id: string;
  created_at: string;
  updated_at: string;
  last_frame_url?: string;
}

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved' | 'escalated' | 'false_positive';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
}

export interface Alert {
  id: string;
  camera_id: string;
  camera_name: string;
  anomaly_type: string;
  severity: AlertSeverity;
  confidence: number;
  frame_snapshot_url: string;
  video_clip_url?: string;
  bounding_boxes: BoundingBox[];
  status: AlertStatus;
  acknowledged_by?: string;
  resolved_at?: string;
  created_at: string;
  location: string;
}

export type ReportType = 'summary' | 'detailed' | 'executive';

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  date_from: string;
  date_to: string;
  camera_ids: string[];
  content: ReportContent;
  pdf_url?: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  created_by: string;
  created_at: string;
}

export interface ReportContent {
  summary?: string;
  total_alerts: number;
  alerts_by_severity: Record<AlertSeverity, number>;
  alerts_by_camera: { camera_id: string; count: number }[];
  timeline: { date: string; count: number }[];
}

export interface SystemMetrics {
  gpu_usage: number;
  cpu_usage: number;
  memory_usage: number;
  inference_latency: number;
  queue_depth: number;
  websocket_connections: number;
  uptime: number;
}

export interface ServiceStatus {
  name: string;
  status: 'online' | 'offline' | 'degraded';
  latency?: number;
  last_check: string;
}

export interface AppSettings {
  platform_name: string;
  timezone: string;
  date_format: string;
  theme: 'dark' | 'light';
  language: string;
  email_alerts: boolean;
  alert_email?: string;
  alert_severity_threshold: AlertSeverity;
  notification_sound: boolean;
  webhook_url?: string;
  inference_backend: 'pytorch' | 'onnx' | 'tensorrt';
  detection_confidence: number;
  nms_threshold: number;
  max_detections: number;
}

export interface KPIMetrics {
  active_cameras: number;
  total_cameras: number;
  alerts_today: number;
  alerts_delta: number;
  avg_inference_speed: number;
  anomalies_detected: number;
  severity_breakdown: Record<AlertSeverity, number>;
}

export interface AnalyticsData {
  overview: {
    total_alerts: number;
    total_cameras: number;
    avg_response_time: number;
    uptime_percentage: number;
  };
  timeline: { timestamp: string; count: number }[];
  by_camera: { camera_id: string; name: string; count: number }[];
  by_type: { type: string; count: number }[];
  by_severity: { severity: AlertSeverity; count: number }[];
  hourly_heatmap: { hour: number; count: number }[];
  confidence_distribution: { range: string; count: number }[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
