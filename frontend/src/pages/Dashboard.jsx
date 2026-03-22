import { useState, useEffect } from 'react';
import { Alerts } from '../components/Alerts';
import { CityMap } from '../components/CityMap';
import { AlertTriangle, Activity, Camera, UploadCloud, Terminal, Server } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const [events, setEvents] = useState([]);
    const [logs, setLogs] = useState(["System initialized...", "Connecting to satellite feed...", "AI Model loaded."]);
    
    // --- MOCK CHART DATA (Live "Heartbeat") ---
    const [chartData, setChartData] = useState([
        { time: '10:00', level: 20 }, { time: '10:05', level: 40 },
        { time: '10:10', level: 30 }, { time: '10:15', level: 70 },
        { time: '10:20', level: 50 }, { time: '10:25', level: 90 },
    ]);

    // --- UPLOAD LOGIC ---
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const addLog = (msg) => {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        setLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 4)]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) return;
        setUploading(true);
        addLog(`Uploading file: ${selectedFile.name}...`);
        
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://127.0.0.1:8000/analyze-upload", { method: "POST", body: formData });
            const data = await response.json();
            
            if (data.results && data.results.events) {
                const newEvents = data.results.events.map(ev => ({
                    type: ev.event_type, path: ev.path, file: "Uploaded Analysis"
                }));
                setEvents(prev => [...newEvents, ...prev]);
                addLog(`Analysis complete. Found ${newEvents.length} threats.`);
            } else {
                addLog("Analysis complete. No threats found.");
            }
        } catch (error) {
            addLog("Error: Upload failed.");
        } finally {
            setUploading(false);
            setSelectedFile(null);
        }
    };

    // Stats
    const totalEvents = events.length;
    const violenceCount = events.filter(e => e.type === 'VIOLENCE').length;

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/list").then(res => res.json()).then(data => {
            if(data.events) setEvents(data.events);
        });

        const socket = new WebSocket("ws://127.0.0.1:8000/ws");
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "NEW_ALERT") {
                setEvents(prev => [{
                    type: data.event_type, path: data.path, file: data.path.split('/').pop()
                }, ...prev]);
                addLog(`⚠️ ALERT: ${data.event_type} detected!`);
            }
        };
        return () => socket.close();
    }, []);

    return (
        <div style={{ padding: '30px', backgroundColor: '#0f172a', minHeight: '100vh', fontFamily: "'Courier New', monospace", color: '#e2e8f0' }}>
            
            {/* HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
                <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '15px', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    <Server /> SafeCity AI <span style={{ fontSize: '12px', background: '#38bdf8', color: 'black', padding: '2px 8px', borderRadius: '4px' }}>V.2.0 PRO</span>
                </h1>
                <div style={{ textAlign: 'right', fontSize: '14px', color: '#94a3b8' }}>
                    <div>SYSTEM STATUS: <span style={{ color: '#4ade80' }}>ONLINE</span></div>
                    <div>SECURE CONNECTION: ENCRYPTED</div>
                </div>
            </div>

            {/* TOP STATS ROW (Glassmorphism) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                <DarkCard title="Total Incidents" value={totalEvents} icon={Activity} color="#3b82f6" />
                <DarkCard title="Violence Detected" value={violenceCount} icon={AlertTriangle} color="#ef4444" pulse />
                <DarkCard title="Active Cameras" value="1" icon={Camera} color="#10b981" />
                
                {/* SYSTEM LOG TERMINAL */}
                <div style={{ backgroundColor: '#1e293b', padding: '15px', borderRadius: '12px', border: '1px solid #334155', fontSize: '12px', fontFamily: 'monospace', height: '100px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', marginBottom: '8px' }}>
                        <Terminal size={14} /> SYSTEM LOGS
                    </div>
                    {logs.map((log, i) => (
                        <div key={i} style={{ color: i === 0 ? '#4ade80' : '#64748b', marginBottom: '4px' }}>{log}</div>
                    ))}
                </div>
            </div>

            {/* FORENSIC UPLOAD (Dark Mode) */}
            <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', padding: '20px', borderRadius: '12px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '20px', backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '10px', backgroundColor: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px', color: '#38bdf8' }}><UploadCloud size={24} /></div>
                    <div>
                        <h3 style={{ margin: '0 0 5px 0', color: '#f1f5f9' }}>Forensic Analysis</h3>
                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>Upload CCTV clip for anomaly detection.</p>
                    </div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                    <input type="file" accept="video/*" onChange={(e) => setSelectedFile(e.target.files[0])} style={{ color: '#94a3b8' }} />
                    <button onClick={handleFileUpload} disabled={!selectedFile || uploading} style={{ backgroundColor: uploading ? '#475569' : '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        {uploading ? "SCANNING..." : "INITIATE SCAN"}
                    </button>
                </div>
            </div>

            {/* MAIN GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                
                {/* LEFT: VIDEO & MAP */}
                <div>
                    <h2 style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase' }}>Live Surveillance Feed</h2>
                    
                    {/* VIDEO FEED */}
                    <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #334155', boxShadow: '0 0 20px rgba(0,0,0,0.5)', marginBottom: '30px' }}>
                        <video src="/test.mp4" autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                        <div style={{ position: 'absolute', top: '15px', left: '15px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.7)', padding: '5px 10px', borderRadius: '4px', border: '1px solid #ef4444' }}>
                            <div style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px red', animation: 'pulse 1s infinite' }}></div>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}>LIVE // CAM-01</span>
                        </div>
                        
                        {/* ANIMATED BOX */}
                        <div style={{ position: 'absolute', top: '40%', left: '20%', width: '100px', height: '180px', border: '2px solid #00ff00', boxShadow: '0 0 15px rgba(0, 255, 0, 0.4)', animation: 'trackingMove 8s infinite linear' }}>
                            <div style={{ position: 'absolute', top: '-20px', background: '#00ff00', color: 'black', fontSize: '10px', padding: '2px 4px', fontWeight: 'bold' }}>TARGET LOCKED</div>
                        </div>
                    </div>

                    {/* LIVE ACTIVITY CHART */}
                    <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '15px' }}>THREAT LEVEL ANALYSIS</h3>
                        <div style={{ height: '150px', width: '100%' }}>
                            <ResponsiveContainer>
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Tooltip contentStyle={{ backgroundColor: '#334155', border: 'none', color: '#fff' }} />
                                    <Area type="monotone" dataKey="level" stroke="#ef4444" fillOpacity={1} fill="url(#colorLevel)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <CityMap />
                </div>

                {/* RIGHT: ALERTS */}
                <div>
                    <h2 style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase' }}>Recent Alerts</h2>
                    <div style={{ height: '800px', overflowY: 'auto', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '10px' }}>
                        <Alerts events={events} />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
                @keyframes trackingMove { 0% { left: 10%; } 50% { left: 60%; } 100% { left: 10%; } }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #0f172a; }
                ::-webkit-scrollbar-thumb { background: #334155; borderRadius: 4px; }
            `}</style>
        </div>
    );
}

// HELPER COMPONENT FOR DARK CARDS
function DarkCard({ title, value, icon: Icon, color, pulse }) {
    return (
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: pulse ? `0 0 15px ${color}40` : 'none' }}>
            <div style={{ backgroundColor: `${color}20`, padding: '10px', borderRadius: '8px', color: color }}>
                <Icon size={24} />
            </div>
            <div>
                <div style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase' }}>{title}</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{value}</div>
            </div>
        </div>
    );
}