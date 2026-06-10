import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/authStore';
import { Alert } from '../types';

export const useSafeCityAPI = () => {
  const { addAlert, setWsConnected, setAlerts } = useAppStore();
  const wsRef = useRef<WebSocket | null>(null);

  // Fetch initial alerts
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/api/list`);
        const data = await res.json();
        
        // Map backend alerts to frontend types
        const mappedAlerts: Alert[] = data.events.map((e: any, index: number) => ({
          id: `initial-${index}-${Date.now()}`,
          camera_id: 'cam-main',
          camera_name: 'Main Entrance Camera',
          anomaly_type: e.event_type || e.type,
          severity: 'high',
          confidence: 0.95,
          frame_snapshot_url: `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}${e.path}`,
          video_clip_url: e.video_path ? `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}${e.video_path}` : undefined,
          bounding_boxes: [],
          status: 'active',
          created_at: new Date().toISOString(),
          location: 'Main Entrance'
        }));

        setAlerts(mappedAlerts);
      } catch (err) {
        console.error('Failed to fetch initial alerts:', err);
      }
    };

    fetchAlerts();
  }, [setAlerts]);

  // Handle WebSocket connection
  useEffect(() => {
    const connectWs = () => {
      const socket = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:8000/ws');
      wsRef.current = socket;

      socket.onopen = () => {
        console.log('WebSocket Connected');
        setWsConnected(true);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'NEW_ALERT' || data.event_type) {
            const newAlert: Alert = {
              id: `alert-${Date.now()}`,
              camera_id: 'cam-main',
              camera_name: 'Main Entrance Camera',
              anomaly_type: data.event_type || 'Unknown',
              severity: 'high',
              confidence: 0.95,
              frame_snapshot_url: `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}${data.path}`,
              video_clip_url: data.video_path ? `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}${data.video_path}` : undefined,
              bounding_boxes: [],
              status: 'active',
              created_at: new Date().toISOString(),
              location: 'Main Entrance'
            };
            addAlert(newAlert);
          }
        } catch (err) {
          console.error('Failed to parse WebSocket message', err);
        }
      };

      socket.onclose = () => {
        console.log('WebSocket Disconnected (Backend might be down)');
        setWsConnected(false);
        // Reconnect after 30 seconds to prevent console spam
        setTimeout(connectWs, 30000);
      };

      socket.onerror = () => {
        // Silently handle WS error to prevent console spam (browser will still log the connection failure once)
      };
    };

    connectWs();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [addAlert, setWsConnected]);
};
