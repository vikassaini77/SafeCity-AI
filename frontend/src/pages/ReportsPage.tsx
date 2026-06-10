import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Download,
  Trash2,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Card, Button, Badge, Modal, Input } from '../components/ui';
import { useAppStore } from '../store';
import { mockReports } from '../data/mockData';
import { formatDateTime, formatDate } from '../lib/utils';
import type { Report, ReportType } from '../types';

export default function ReportsPage() {
  const { reports, setReports } = useAppStore();
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [viewingReport, setViewingReport] = useState<Report | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const allReports = reports.length > 0 ? reports : mockReports;

  const statusIcon = (status: Report['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-accent-green" />;
      case 'generating':
        return <Loader2 className="w-4 h-4 text-accent-yellow animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-accent-red" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const typeBadgeVariant = (type: ReportType): 'info' | 'warning' | 'success' => {
    switch (type) {
      case 'summary':
        return 'info';
      case 'detailed':
        return 'warning';
      case 'executive':
        return 'success';
      default:
        return 'info';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Incident Reports</h1>
          <p className="text-gray-400 text-sm mt-1">
            Generate and manage security reports
          </p>
        </div>

        <Button onClick={() => setIsGenerateModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card padding="sm">
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-white">{allReports.length}</p>
            <p className="text-xs text-gray-500">Total Reports</p>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-accent-green">
              {allReports.filter((r) => r.status === 'completed').length}
            </p>
            <p className="text-xs text-gray-500">Completed</p>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-accent-yellow">
              {allReports.filter((r) => r.status === 'generating').length}
            </p>
            <p className="text-xs text-gray-500">Generating</p>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-gray-400">
              {allReports.filter((r) => r.type === 'executive').length}
            </p>
            <p className="text-xs text-gray-500">Executive</p>
          </div>
        </Card>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {allReports.map((report) => (
          <motion.div
            key={report.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4">
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-500" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium">{report.title}</h3>
                  {statusIcon(report.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(report.date_from)} - {formatDate(report.date_to)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDateTime(report.created_at)}
                  </span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2">
                <Badge variant={typeBadgeVariant(report.type)} size="sm">
                  {report.type}
                </Badge>
                <Badge variant={report.status === 'completed' ? 'success' : report.status === 'generating' ? 'warning' : 'error'} size="sm">
                  {report.status}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {report.status === 'completed' && (
                  <>
                    <Button size="sm" variant="ghost" onClick={() => setViewingReport(report)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => {
                      const content = `Report: ${report.title}\nDate: ${formatDate(report.date_from)} - ${formatDate(report.date_to)}\n\nSummary:\n${report.content.summary || ''}\n\nStats:\nTotal Alerts: ${report.content.total_alerts}\nLow: ${report.content.alerts_by_severity.low}\nMedium: ${report.content.alerts_by_severity.medium}\nHigh/Critical: ${report.content.alerts_by_severity.high + report.content.alerts_by_severity.critical}`;
                      const blob = new Blob([content], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${report.title.replace(/\s+/g, '_')}.txt`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </>
                )}
                <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(report.id)}>
                  <Trash2 className="w-4 h-4 text-accent-red" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {allReports.length === 0 && (
        <Card className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No reports generated yet</p>
          <Button className="mt-4" onClick={() => setIsGenerateModalOpen(true)}>
            Generate Your First Report
          </Button>
        </Card>
      )}

      {/* Generate Modal */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        title="Generate New Report"
        size="lg"
      >
        <ReportGenerator
          onClose={() => setIsGenerateModalOpen(false)}
          onGenerate={(report) => {
            setReports([report, ...allReports]);
            setIsGenerateModalOpen(false);
          }}
        />
      </Modal>

      {/* View Report Modal */}
      <Modal
        isOpen={!!viewingReport}
        onClose={() => setViewingReport(null)}
        title="Report Preview"
        size="xl"
      >
        {viewingReport && (
          <ReportPreview report={viewingReport} onClose={() => setViewingReport(null)} />
        )}
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Report"
        size="sm"
      >
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete this report? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (deleteConfirm) {
                setReports(allReports.filter((r) => r.id !== deleteConfirm));
                setDeleteConfirm(null);
              }
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

// Report Generator Component
function ReportGenerator({
  onClose,
  onGenerate,
}: {
  onClose: () => void;
  onGenerate: (report: Report) => void;
}) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ReportType>('summary');
  const [dateFrom, setDateFrom] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const report: Report = {
      id: `report-${Date.now()}`,
      title: title || `${type.charAt(0).toUpperCase() + type.slice(1)} Report - ${dateFrom}`,
      type,
      date_from: dateFrom,
      date_to: dateTo,
      camera_ids: [],
      content: {
        total_alerts: 45,
        alerts_by_severity: { low: 20, medium: 15, high: 8, critical: 2 },
        alerts_by_camera: [],
        timeline: [],
      },
      status: 'generating',
      created_by: 'Alex Johnson',
      created_at: new Date().toISOString(),
    };

    onGenerate(report);
  };

  return (
    <div className="space-y-4">
      <Input label="Report Title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Report Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as ReportType)}
          className="w-full px-4 py-3 bg-secondary-900/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        >
          <option value="summary">Summary</option>
          <option value="detailed">Detailed</option>
          <option value="executive">Executive</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="From Date" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        <Input label="To Date" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleGenerate} isLoading={isGenerating}>
          Generate Report
        </Button>
      </div>
    </div>
  );
}

// Report Preview Component
function ReportPreview({ report, onClose }: { report: Report; onClose: () => void }) {
  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Report Header */}
      <div className="border-b border-gray-800 pb-4">
        <h2 className="text-xl font-heading font-bold text-white">{report.title}</h2>
        <p className="text-sm text-gray-400 mt-1">
          {formatDate(report.date_from)} - {formatDate(report.date_to)}
        </p>
      </div>

      {/* Summary */}
      {report.content.summary && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Summary</h3>
          <p className="text-gray-300">{report.content.summary}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-secondary-900/50 rounded-lg">
          <p className="text-2xl font-heading font-bold text-white">{report.content.total_alerts}</p>
          <p className="text-sm text-gray-500">Total Alerts</p>
        </div>
        <div className="p-4 bg-severity-low/20 rounded-lg">
          <p className="text-2xl font-heading font-bold text-severity-low">{report.content.alerts_by_severity.low}</p>
          <p className="text-sm text-gray-500">Low</p>
        </div>
        <div className="p-4 bg-severity-medium/20 rounded-lg">
          <p className="text-2xl font-heading font-bold text-severity-medium">{report.content.alerts_by_severity.medium}</p>
          <p className="text-sm text-gray-500">Medium</p>
        </div>
        <div className="p-4 bg-severity-high/20 rounded-lg">
          <p className="text-2xl font-heading font-bold text-severity-high">{report.content.alerts_by_severity.high + report.content.alerts_by_severity.critical}</p>
          <p className="text-sm text-gray-500">High/Critical</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-800 shrink-0">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button onClick={() => {
          const content = `Report: ${report.title}\nDate: ${formatDate(report.date_from)} - ${formatDate(report.date_to)}\n\nSummary:\n${report.content.summary || ''}\n\nStats:\nTotal Alerts: ${report.content.total_alerts}\nLow: ${report.content.alerts_by_severity.low}\nMedium: ${report.content.alerts_by_severity.medium}\nHigh/Critical: ${report.content.alerts_by_severity.high + report.content.alerts_by_severity.critical}`;
          const blob = new Blob([content], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${report.title.replace(/\s+/g, '_')}.txt`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }}>
          <Download className="w-4 h-4" />
          Download Report
        </Button>
      </div>
    </div>
  );
}
