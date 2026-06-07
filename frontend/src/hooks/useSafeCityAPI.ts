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
        const res = await fetch('http://127.0.0.1:8000/api/list');
        const data = await res.json();
        
        // Map backend alerts to frontend types
        const mappedAlerts: Alert[] = data.events.map((e: any, index: number) => ({
          id: `initial-${index}-${Date.now()}`,
          camera_id: 'cam-main',
          camera_name: 'Main Entrance Camera',
          anomaly_type: e.event_type || e.type,
          severity: 'high',
          confidence: 0.95,
          frame_snapshot_url: `http://127.0.0.1:8000${e.path}`,
          video_clip_url: e.video_path ? `http://127.0.0.1:8000${e.video_path}` : undefined,
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
      const socket = new WebSocket('ws://127.0.0.1:8000/ws');
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
              frame_snapshot_url: `http://127.0.0.1:8000${data.path}`,
              video_clip_url: data.video_path ? `http://127.0.0.1:8000${data.video_path}` : undefined,
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
        console.log('WebSocket Disconnected');
        setWsConnected(false);
        // Reconnect after 3 seconds
        setTimeout(connectWs, 3000);
      };

      socket.onerror = (error) => {
        console.error('WebSocket Error:', error);
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
