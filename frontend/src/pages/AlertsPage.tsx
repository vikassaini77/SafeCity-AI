import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  Download,
  Check,
  X,
  Eye,
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { AlertDetailPanel } from '../components/dashboard';
import { useAppStore } from '../store';
import { mockAlerts } from '../data/mockData';
import { formatDistanceToNow, cn } from '../lib/utils';
import type { Alert, AlertSeverity, AlertStatus } from '../types';

export default function AlertsPage() {
  const { alerts, setAlerts } = useAppStore();
  const [search, setSearch] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<AlertSeverity | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<AlertStatus | 'all'>('all');
  const [selectedCamera, setSelectedCamera] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Alert>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Use mock alerts if store is empty
  const allAlerts = alerts;

  // Get unique cameras
  const cameras = useMemo(() => {
    const unique = new Map();
    allAlerts.forEach((a) => unique.set(a.camera_id, a.camera_name));
    return Array.from(unique.entries()).map(([id, name]) => ({ id, name }));
  }, [allAlerts]);

  // Filter and sort alerts
  const filteredAlerts = useMemo(() => {
    let result = [...allAlerts];

    // Search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.anomaly_type.toLowerCase().includes(searchLower) ||
          a.camera_name.toLowerCase().includes(searchLower) ||
          a.location.toLowerCase().includes(searchLower)
      );
    }

    // Filters
    if (selectedSeverity !== 'all') {
      result = result.filter((a) => a.severity === selectedSeverity);
    }
    if (selectedStatus !== 'all') {
      result = result.filter((a) => a.status === selectedStatus);
    }
    if (selectedCamera !== 'all') {
      result = result.filter((a) => a.camera_id === selectedCamera);
    }

    // Sort
    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return result;
  }, [allAlerts, search, selectedSeverity, selectedStatus, selectedCamera, sortField, sortDir]);

  // Pagination
  const totalPages = Math.ceil(filteredAlerts.length / pageSize);
  const paginatedAlerts = filteredAlerts.slice((page - 1) * pageSize, page * pageSize);

  // Handlers
  const handleSort = (field: keyof Alert) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.size === paginatedAlerts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedAlerts.map((a) => a.id)));
    }
  };

  const handleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleBulkAction = (action: 'resolve' | 'acknowledge') => {
    const updated = allAlerts.map((a) =>
      selectedIds.has(a.id)
        ? { ...a, status: action === 'resolve' ? 'resolved' as const : 'acknowledged' as const }
        : a
    );
    setAlerts(Array.isArray(updated) ? updated : []);
    setSelectedIds(new Set());
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'Camera', 'Location', 'Type', 'Severity', 'Confidence', 'Status', 'Timestamp'].join(','),
      ...filteredAlerts.map((a) =>
        [a.id, a.camera_name, a.location, a.anomaly_type, a.severity, a.confidence, a.status, a.created_at].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alerts-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const severityBadgeVariant = (severity: AlertSeverity) => {
    const map: Record<AlertSeverity, 'low' | 'medium' | 'high' | 'critical'> = {
      low: 'low',
      medium: 'medium',
      high: 'high',
      critical: 'critical',
    };
    return map[severity];
  };

  const statusBadgeVariant = (status: AlertStatus) => {
    if (status === 'active') return 'error';
    if (status === 'acknowledged' || status === 'escalated') return 'warning';
    if (status === 'resolved') return 'success';
    return 'default';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Alert Center</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage and investigate all detected anomalies
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="info">{filteredAlerts.length} total alerts</Badge>
          <Button variant="secondary" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>
          </div>

          {/* Severity Filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value as AlertSeverity | 'all')}
            className="px-3 py-2 bg-secondary-900/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          >
            <option value="all">All Severities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as AlertStatus | 'all')}
            className="px-3 py-2 bg-secondary-900/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
            <option value="escalated">Escalated</option>
            <option value="false_positive">False Positive</option>
          </select>

          {/* Camera Filter */}
          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="px-3 py-2 bg-secondary-900/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          >
            <option value="all">All Cameras</option>
            {cameras.map((cam) => (
              <option key={cam.id} value={cam.id}>{cam.name}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-4 px-4 py-3 bg-primary-500/10 border border-primary-500/30 rounded-lg"
          >
            <span className="text-sm text-primary-500">{selectedIds.size} selected</span>
            <Button size="sm" variant="secondary" onClick={() => handleBulkAction('acknowledge')}>
              <Check className="w-4 h-4" />
              Acknowledge
            </Button>
            <Button size="sm" variant="secondary" onClick={() => handleBulkAction('resolve')}>
              <X className="w-4 h-4" />
              Resolve
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setSelectedIds(new Set())}>
              Clear
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-900/50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === paginatedAlerts.length && paginatedAlerts.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-600 bg-secondary-900 text-primary-500 focus:ring-primary-500/30"
                  />
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort('id')}
                >
                  ID {sortField === 'id' && <ChevronDown className="inline w-4 h-4" />}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort('camera_name')}
                >
                  Camera {sortField === 'camera_name' && <ChevronDown className="inline w-4 h-4" />}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort('anomaly_type')}
                >
                  Type {sortField === 'anomaly_type' && <ChevronDown className="inline w-4 h-4" />}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort('severity')}
                >
                  Severity {sortField === 'severity' && <ChevronDown className="inline w-4 h-4" />}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort('confidence')}
                >
                  Confidence {sortField === 'confidence' && <ChevronDown className="inline w-4 h-4" />}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort('status')}
                >
                  Status {sortField === 'status' && <ChevronDown className="inline w-4 h-4" />}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort('created_at')}
                >
                  Time {sortField === 'created_at' && <ChevronDown className="inline w-4 h-4" />}
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {paginatedAlerts.map((alert) => (
                <tr
                  key={alert.id}
                  className={cn(
                    'hover:bg-white/5 transition-colors cursor-pointer',
                    selectedIds.has(alert.id) && 'bg-primary-500/10',
                    alert.status === 'active' && 'bg-accent-red/5'
                  )}
                  onClick={() => setSelectedAlert(alert)}
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(alert.id)}
                      onChange={() => handleSelect(alert.id)}
                      className="w-4 h-4 rounded border-gray-600 bg-secondary-900 text-primary-500 focus:ring-primary-500/30"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300 font-mono">
                    {alert.id.slice(0, 8)}...
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-white">{alert.camera_name}</div>
                    <div className="text-xs text-gray-500">{alert.location}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">{alert.anomaly_type}</td>
                  <td className="px-4 py-3">
                    <Badge variant={severityBadgeVariant(alert.severity)} size="sm">
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300 font-mono">
                    {(alert.confidence * 100).toFixed(0)}%
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusBadgeVariant(alert.status)} size="sm">
                      {alert.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {formatDistanceToNow(alert.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedAlert(alert)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="px-2 py-1 bg-secondary-900 border border-gray-700 rounded text-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>per page</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="ghost"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedAlert && (
          <AlertDetailPanel
            alert={selectedAlert}
            onClose={() => setSelectedAlert(null)}
            onAcknowledge={() => {
              const updated = allAlerts.map((a) =>
                a.id === selectedAlert.id ? { ...a, status: 'acknowledged' as const } : a
              );
              setAlerts(Array.isArray(updated) ? updated : []);
              setSelectedAlert(null);
            }}
            onResolve={() => {
              const updated = allAlerts.map((a) =>
                a.id === selectedAlert.id ? { ...a, status: 'resolved' as const } : a
              );
              setAlerts(Array.isArray(updated) ? updated : []);
              setSelectedAlert(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
