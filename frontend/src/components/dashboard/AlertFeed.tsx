import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, X, AlertTriangle, Eye, ChevronRight } from 'lucide-react';
import { cn, formatDistanceToNow, getSeverityColor } from '../../lib/utils';
import { Badge } from '../ui';
import type { Alert, AlertSeverity } from '../../types';

interface AlertFeedProps {
  alerts: Alert[];
  onAcknowledge?: (id: string) => void;
  onResolve?: (id: string) => void;
  onView?: (alert: Alert) => void;
  maxItems?: number;
}

export function AlertFeed({ alerts, onAcknowledge, onResolve, onView, maxItems = 10 }: AlertFeedProps) {
  const displayedAlerts = alerts.slice(0, maxItems);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary-500" />
          <h3 className="text-sm font-semibold text-white">Recent Alerts</h3>
          <span className="px-1.5 py-0.5 bg-primary-500/20 text-primary-500 text-xs font-mono rounded">
            {alerts.length}
          </span>
        </div>
        {alerts.filter(a => a.status === 'active').length > 0 && (
          <span className="flex items-center gap-1.5 text-xs text-accent-red">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
            {alerts.filter(a => a.status === 'active').length} Active
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence initial={false}>
          {displayedAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'px-4 py-3 border-b border-gray-800/50 hover:bg-white/5 transition-colors cursor-pointer',
                alert.status === 'active' && 'bg-accent-red/5'
              )}
              onClick={() => onView?.(alert)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className={cn('w-3.5 h-3.5', getSeverityColor(alert.severity))} />
                    <span className="text-sm font-medium text-white truncate">
                      {alert.anomaly_type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{alert.camera_name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={alert.severity as any} size="sm">
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-gray-600 font-mono">
                      {(alert.confidence * 100).toFixed(0)}% conf
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(alert.created_at)}
                  </span>
                  {alert.status === 'active' && (
                    <div className="flex items-center gap-1 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAcknowledge?.(alert.id);
                        }}
                        className="p-1 text-gray-400 hover:text-accent-green hover:bg-accent-green/10 rounded transition-colors"
                        title="Acknowledge"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onResolve?.(alert.id);
                        }}
                        className="p-1 text-gray-400 hover:text-accent-red hover:bg-accent-red/10 rounded transition-colors"
                        title="Resolve"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {displayedAlerts.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-500">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recent alerts</p>
          </div>
        )}
      </div>

      {alerts.length > maxItems && (
        <div className="px-4 py-3 border-t border-gray-800">
          <button
            onClick={() => onView?.({} as Alert)}
            className="flex items-center justify-center w-full gap-1 text-sm text-primary-500 hover:text-primary-400 transition-colors"
          >
            View all {alerts.length} alerts
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// Alert detail panel
interface AlertDetailPanelProps {
  alert: Alert | null;
  onClose: () => void;
  onAcknowledge?: () => void;
  onResolve?: () => void;
  onEscalate?: () => void;
  onFalsePositive?: () => void;
}

export function AlertDetailPanel({
  alert,
  onClose,
  onAcknowledge,
  onResolve,
  onEscalate,
  onFalsePositive,
}: AlertDetailPanelProps) {
  if (!alert) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed right-0 top-16 bottom-0 w-96 bg-surface border-l border-gray-800 overflow-y-auto z-30"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Badge variant={alert.severity as any}>{alert.severity.toUpperCase()}</Badge>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Snapshot / Video */}
        <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-700 mb-6 bg-black">
          {alert.video_clip_url ? (
            <video
              src={alert.video_clip_url}
              controls
              autoPlay
              loop
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={alert.frame_snapshot_url}
              alt="Alert frame"
              className="w-full h-full object-cover"
            />
          )}
          {/* Bounding boxes overlay */}
          {alert.bounding_boxes.map((box, i) => (
            <div
              key={i}
              className="absolute border-2 border-primary-500 bg-primary-500/20"
              style={{
                left: `${box.x * 100}%`,
                top: `${box.y * 100}%`,
                width: `${box.width * 100}%`,
                height: `${box.height * 100}%`,
              }}
            >
              <span className="absolute -top-5 left-0 px-1.5 py-0.5 bg-primary-500 text-secondary-900 text-[10px] font-mono font-bold rounded">
                {box.label} {(box.confidence * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Anomaly Type</p>
            <p className="text-white font-medium">{alert.anomaly_type}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Camera</p>
              <p className="text-white text-sm">{alert.camera_name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Location</p>
              <p className="text-white text-sm">{alert.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Confidence</p>
              <p className="text-white font-mono">{(alert.confidence * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <Badge variant="default">{alert.status}</Badge>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Timestamp</p>
            <p className="text-white text-sm font-mono">
              {new Date(alert.created_at).toLocaleString()}
            </p>
          </div>

          {alert.acknowledged_by && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Acknowledged By</p>
              <p className="text-white text-sm">{alert.acknowledged_by}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 pt-6 border-t border-gray-800 space-y-3">
          {alert.status === 'active' && (
            <>
              <button
                onClick={onAcknowledge}
                className="w-full py-2.5 bg-accent-yellow/20 text-accent-yellow border border-accent-yellow/30 rounded-lg font-medium hover:bg-accent-yellow/30 transition-colors"
              >
                Acknowledge
              </button>
              <button
                onClick={onResolve}
                className="w-full py-2.5 bg-accent-green/20 text-accent-green border border-accent-green/30 rounded-lg font-medium hover:bg-accent-green/30 transition-colors"
              >
                Resolve
              </button>
            </>
          )}

          {alert.status === 'acknowledged' && (
            <button
              onClick={onResolve}
              className="w-full py-2.5 bg-accent-green/20 text-accent-green border border-accent-green/30 rounded-lg font-medium hover:bg-accent-green/30 transition-colors"
            >
              Resolve
            </button>
          )}

          <div className="flex gap-2">
            <button
              onClick={onEscalate}
              className="flex-1 py-2 bg-accent-red/20 text-accent-red border border-accent-red/30 rounded-lg text-sm font-medium hover:bg-accent-red/30 transition-colors"
            >
              Escalate
            </button>
            <button
              onClick={onFalsePositive}
              className="flex-1 py-2 bg-gray-700/50 text-gray-400 border border-gray-600/50 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              False Positive
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
