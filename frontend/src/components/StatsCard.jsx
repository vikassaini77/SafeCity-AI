import React from 'react';

export function StatsCard({ title, value, icon: Icon, color }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      minWidth: '200px'
    }}>
      <div style={{
        backgroundColor: color,
        padding: '12px',
        borderRadius: '8px',
        color: 'white'
      }}>
        <Icon size={24} />
      </div>
      <div>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{title}</p>
        <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{value}</h3>
      </div>
    </div>
  );
}