import React from 'react';

// ✅ Fixed: Added "export function" to match "import { Alerts }"
// ✅ Fixed: Added "props" so we can pass the events list in later
export function Alerts({ events = [] }) { 

  // If no events are passed, show a message instead of crashing
  if (!events || events.length === 0) {
    return <div style={{ padding: 20 }}>No alerts detected yet.</div>;
  }

  return (
    <div>
      <h3>Recent Alerts</h3>
      {events.map((e, i) => {
        const isVideo = e.file.endsWith(".mp4");

        return (
          <div key={i} style={{ marginBottom: "16px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <strong>{e.type}</strong>
            <br />

            {isVideo ? (
              <video
                src={`http://127.0.0.1:8000${e.path}`}
                width="320"
                controls
              />
            ) : (
              <img
                src={`http://127.0.0.1:8000${e.path}`}
                alt="event"
                width="240"
                style={{ border: "2px solid red" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}