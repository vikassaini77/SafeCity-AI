import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Activity, Globe, Map as MapIcon, TrendingUp, AlertTriangle, 
  Zap, BrainCircuit, Target, Video, Server, ChevronRight, BarChart2,
  Crosshair, Radio, Eye
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, Legend
} from 'recharts';

// ==========================================
// MOCK DATA FOR CHARTS & MAPS
// ==========================================

import ReactGlobe from 'react-globe.gl';

const globeData = [
  { lat: 40.7128, lng: -74.0060, name: 'New York', size: 20, color: '#00f2ff', risk: 'Medium' },
  { lat: 51.5074, lng: -0.1278, name: 'London', size: 15, color: '#00f2ff', risk: 'Low' },
  { lat: 28.6139, lng: 77.2090, name: 'Delhi', size: 35, color: '#ff3b3b', risk: 'High' },
  { lat: 35.6762, lng: 139.6503, name: 'Tokyo', size: 25, color: '#f59e0b', risk: 'High' },
  { lat: -33.8688, lng: 151.2093, name: 'Sydney', size: 10, color: '#00f2ff', risk: 'Low' },
  { lat: 19.0760, lng: 72.8777, name: 'Mumbai', size: 30, color: '#ff3b3b', risk: 'High' },
  { lat: 48.8566, lng: 2.3522, name: 'Paris', size: 15, color: '#00f2ff', risk: 'Medium' },
  { lat: 25.2048, lng: 55.2708, name: 'Dubai', size: 20, color: '#f59e0b', risk: 'Medium' },
  { lat: -23.5505, lng: -46.6333, name: 'São Paulo', size: 25, color: '#f59e0b', risk: 'High' },
  { lat: -1.2921, lng: 36.8219, name: 'Nairobi', size: 15, color: '#00f2ff', risk: 'Medium' },
];

const trendData = [
  { year: '2015', accidents: 45000, fatal: 12000, responseTime: 25 },
  { year: '2016', accidents: 46500, fatal: 12200, responseTime: 24 },
  { year: '2017', accidents: 48000, fatal: 12500, responseTime: 22 },
  { year: '2018', accidents: 49200, fatal: 12800, responseTime: 21 },
  { year: '2019', accidents: 51000, fatal: 13100, responseTime: 19 },
  { year: '2020', accidents: 38000, fatal: 9000, responseTime: 18 }, // COVID dip
  { year: '2021', accidents: 42000, fatal: 10500, responseTime: 16 },
  { year: '2022', accidents: 47000, fatal: 11000, responseTime: 14 },
  { year: '2023', accidents: 48500, fatal: 10800, responseTime: 12 },
  { year: '2024', accidents: 45000, fatal: 9500, responseTime: 9 },  // AI Deployment
  { year: '2025', accidents: 41000, fatal: 7200, responseTime: 6 },
];

const riskData = [
  { time: '00:00', risk: 30, traffic: 20 },
  { time: '04:00', risk: 20, traffic: 10 },
  { time: '08:00', risk: 75, traffic: 85 },
  { time: '12:00', risk: 60, traffic: 70 },
  { time: '16:00', risk: 65, traffic: 75 },
  { time: '20:00', risk: 90, traffic: 95 },
  { time: '23:00', risk: 50, traffic: 40 },
];

const liveIncidents = [
  { id: 1, type: 'Traffic Accident', location: 'Mumbai - Andheri East', time: '2 mins ago', severity: 'critical' },
  { id: 2, type: 'Vehicle Collision', location: 'Delhi - CP', time: '5 mins ago', severity: 'high' },
  { id: 3, type: 'Violence Alert', location: 'Bangalore - Indiranagar', time: '7 mins ago', severity: 'critical' },
  { id: 4, type: 'Crowd Anomaly', location: 'Hyderabad - Charminar', time: '10 mins ago', severity: 'medium' },
  { id: 5, type: 'Suspicious Activity', location: 'Pune - MG Road', time: '15 mins ago', severity: 'low' },
];

const indiaStates = [
  { name: 'Maharashtra', incidents: 12450, risk: 85, trend: '-12%' },
  { name: 'Uttar Pradesh', incidents: 15200, risk: 92, trend: '-5%' },
  { name: 'Karnataka', incidents: 8400, risk: 65, trend: '-18%' },
  { name: 'Delhi NCR', incidents: 11200, risk: 88, trend: '-22%' },
  { name: 'Tamil Nadu', incidents: 9100, risk: 70, trend: '-14%' },
  { name: 'Rajasthan', incidents: 7600, risk: 60, trend: '-8%' },
];

// ==========================================
// SUB-COMPONENTS
// ==========================================

const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = (duration * 1000) / end;
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 20);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime > 50 ? incrementTime : 50);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function IntelligenceCenterPage() {
  const [activeRegion, setActiveRegion] = useState('Global');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [cursorData, setCursorData] = useState<{name?: string, risk?: string, x: number, y: number, show: boolean, lat: number, lng: number} | null>(null);
  const [mousePos, setMousePos] = useState<{x: number, y: number, lat?: number | null, lng?: number | null}>({ x: 0, y: 0 });
  const [isHoveringMap, setIsHoveringMap] = useState(false);
  const globeRef = React.useRef<any>();

  return (
    <div className="min-h-screen bg-[#050914] text-white selection:bg-cyan-500/30 font-sans pt-20 pb-20 overflow-hidden">
      
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[1000px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* HERO SECTION */}
        <section className="pt-16 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-sm mb-8">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>NATIONAL COMMAND & CONTROL CENTER</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-blue-400">
              Transforming Surveillance Data Into <br className="hidden md:block"/> Public Safety Intelligence
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Analyze incidents, monitor trends, identify high-risk regions, and enable faster emergency response through AI-powered intelligence.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { label: 'Incidents Analyzed', value: 1.3, suffix: 'M+' },
                { label: 'Detection Accuracy', value: 97.8, suffix: '%' },
                { label: 'Connected Cameras', value: 500, suffix: '+' },
                { label: 'Monitoring', value: 24, suffix: '/7' },
                { label: 'Faster Response', value: 72, suffix: '%' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                  className="bg-[#0a0f1c]/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors shadow-glow-primary"
                >
                  <div className="text-3xl font-bold text-white mb-2 font-mono">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* GLOBAL SAFETY OVERVIEW (3D MAP ABSTRACTION) */}
          <section className="lg:col-span-8 bg-[#0a0f1c]/80 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden relative min-h-[500px]">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#050914]/50">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-cyan-500" />
                <h2 className="text-xl font-bold font-heading">Global Safety Overview</h2>
              </div>
              <div className="flex gap-2">
                {['Global', 'APAC', 'EMEA', 'AMER'].map(region => (
                  <button 
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`px-3 py-1 text-xs rounded-md font-mono transition-colors ${
                      activeRegion === region 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' 
                        : 'bg-gray-800/50 text-gray-400 hover:text-white border border-transparent'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
            
            <div 
              className="relative w-full h-[550px] flex items-center justify-center overflow-hidden rounded-xl bg-[#010409] cursor-crosshair border-t border-gray-800/50 shadow-inner"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                let lat = null;
                let lng = null;
                if (globeRef.current && globeRef.current.toGeoCoords) {
                  const coords = globeRef.current.toGeoCoords(x, y);
                  if (coords) {
                    lat = coords.lat;
                    lng = coords.lng;
                  }
                }
                
                setMousePos({ x, y, lat, lng });
              }}
              onMouseEnter={() => setIsHoveringMap(true)}
              onMouseLeave={() => {
                setIsHoveringMap(false);
                setCursorData(null);
              }}
            >
              <ReactGlobe
                ref={globeRef}
                height={550}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                labelsData={globeData}
                labelLat={(d: any) => d.lat}
                labelLng={(d: any) => d.lng}
                labelText={(d: any) => d.name}
                labelSize={1.5}
                labelDotRadius={0.5}
                labelColor={(d: any) => d.color}
                labelResolution={2}
                pointsData={globeData}
                pointLat={(d: any) => d.lat}
                pointLng={(d: any) => d.lng}
                pointColor={(d: any) => d.color}
                pointAltitude={0.01}
                pointRadius={0.2}
                ringsData={globeData}
                ringLat={(d: any) => d.lat}
                ringLng={(d: any) => d.lng}
                ringColor={(d: any) => d.color}
                ringMaxRadius={(d: any) => d.size / 15}
                ringPropagationSpeed={2}
                ringRepeatPeriod={(d: any) => 1000 + Math.random() * 2000}
                onPointHover={(point: any) => {
                  if (point) {
                    setCursorData({
                      x: 0, y: 0, show: true, name: point.name, lat: point.lat, lng: point.lng, risk: point.risk
                    });
                  } else {
                    setCursorData(null);
                  }
                }}
                onLabelHover={(label: any) => {
                  if (label) {
                    setCursorData({
                      x: 0, y: 0, show: true, name: label.name, lat: label.lat, lng: label.lng, risk: label.risk
                    });
                  } else {
                    setCursorData(null);
                  }
                }}
              />
              
              {/* Scanning Crosshair (Follows Mouse) */}
              <AnimatePresence>
                {isHoveringMap && !cursorData && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                    className="absolute pointer-events-none z-30 flex flex-col items-center"
                    style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -100%)', marginTop: '-15px' }}
                  >
                    <div className="bg-[#0a0f1c]/90 backdrop-blur-md border border-cyan-500/50 p-2 rounded shadow-[0_0_15px_rgba(0,242,255,0.2)] flex flex-col gap-1 items-center">
                      <div className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">
                        <Crosshair className="w-3 h-3 animate-[spin_3s_linear_infinite]" />
                        Scanning Sector...
                      </div>
                      {mousePos.lat != null && mousePos.lng != null && (
                        <div className="text-[9px] text-gray-400 font-mono flex gap-2">
                          <span>{mousePos.lat > 0 ? 'N' : 'S'} {Math.abs(mousePos.lat).toFixed(2)}°</span>
                          <span>{mousePos.lng > 0 ? 'E' : 'W'} {Math.abs(mousePos.lng).toFixed(2)}°</span>
                        </div>
                      )}
                    </div>
                    <div className="w-px h-10 bg-gradient-to-b from-cyan-500/80 to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* City Tooltip Overlay (Static Top Right) */}
              <AnimatePresence>
                {cursorData?.show && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-6 right-6 pointer-events-none z-30 flex flex-col items-end"
                  >
                    <div className="bg-[#0a0f1c]/90 backdrop-blur-md border border-cyan-500/50 p-4 rounded-xl shadow-[0_0_25px_rgba(0,242,255,0.2)] min-w-[200px]">
                      <div className="flex items-center gap-2 text-sm font-bold text-white mb-3 pb-2 border-b border-gray-800">
                        <Target className="w-4 h-4 text-cyan-400" />
                        {cursorData.name}
                      </div>
                      <div className="text-[11px] text-gray-400 font-mono mb-1 flex justify-between">
                        <span>LATITUDE:</span> <span className="text-cyan-400">{cursorData.lat.toFixed(4)}°</span>
                      </div>
                      <div className="text-[11px] text-gray-400 font-mono mb-3 flex justify-between">
                        <span>LONGITUDE:</span> <span className="text-cyan-400">{cursorData.lng.toFixed(4)}°</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold bg-gray-900/50 p-2 rounded">
                        <span className="text-gray-400">Risk Profile:</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${cursorData.risk === 'High' ? 'bg-red-500/20 text-red-500' : cursorData.risk === 'Medium' ? 'bg-orange-500/20 text-orange-500' : 'bg-cyan-500/20 text-cyan-400'}`}>
                          {cursorData.risk}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* LIVE INCIDENT FEED */}
          <section className="lg:col-span-4 bg-[#0a0f1c]/80 backdrop-blur-md border border-gray-800 rounded-2xl flex flex-col">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-[#050914]/50">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-red-500 animate-pulse" />
                <h2 className="text-xl font-bold font-heading">Live Incident Feed</h2>
              </div>
              <span className="text-xs font-mono text-gray-500 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE
              </span>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar h-[450px]">
              <AnimatePresence>
                {liveIncidents.map((incident, i) => (
                  <motion.div 
                    key={incident.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl border border-gray-800/50 bg-[#050914]/50 hover:bg-gray-800/30 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {incident.severity === 'critical' ? (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        ) : incident.severity === 'high' ? (
                          <Zap className="w-4 h-4 text-orange-500" />
                        ) : (
                          <Eye className="w-4 h-4 text-yellow-500" />
                        )}
                        <span className="font-semibold text-sm text-gray-200">{incident.type}</span>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">{incident.time}</span>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <Crosshair className="w-3 h-3" />
                      {incident.location}
                    </div>
                    <div className="mt-3 h-1 w-full bg-gray-900 rounded-full overflow-hidden">
                      <div className={`h-full ${
                        incident.severity === 'critical' ? 'bg-red-500 w-full' : 
                        incident.severity === 'high' ? 'bg-orange-500 w-3/4' : 'bg-yellow-500 w-1/2'
                      }`} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* ACCIDENT TREND ANALYTICS */}
          <section className="lg:col-span-7 bg-[#0a0f1c]/80 backdrop-blur-md border border-gray-800 rounded-2xl">
            <div className="p-6 border-b border-gray-800 bg-[#050914]/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-bold font-heading">2015–2025 Accident Trends</h2>
              </div>
            </div>
            <div className="p-6 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAccidents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFatal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff3b3b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ff3b3b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="year" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0f1c', borderColor: '#1f2937', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '14px' }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area type="monotone" dataKey="accidents" name="Total Accidents" stroke="#00f2ff" strokeWidth={2} fillOpacity={1} fill="url(#colorAccidents)" />
                  <Area type="monotone" dataKey="fatal" name="Fatalities" stroke="#ff3b3b" strokeWidth={2} fillOpacity={1} fill="url(#colorFatal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* PREDICTIVE RISK ENGINE */}
          <section className="lg:col-span-5 bg-[#0a0f1c]/80 backdrop-blur-md border border-gray-800 rounded-2xl flex flex-col">
            <div className="p-6 border-b border-gray-800 bg-[#050914]/50">
              <div className="flex items-center gap-3">
                <BrainCircuit className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-bold font-heading">Predictive Risk Engine</h2>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col gap-6">
              <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full" />
                <div className="flex justify-between items-end mb-4 relative z-10">
                  <div>
                    <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider">High Risk Forecast</div>
                    <div className="text-2xl font-bold text-white">Delhi NCR</div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-mono font-bold text-red-500">84%</div>
                    <div className="text-xs text-gray-400">Risk Probability</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6 relative z-10 border-t border-purple-500/20 pt-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Expected Peak</div>
                    <div className="text-sm text-gray-200 font-mono">6:00 PM – 9:00 PM</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Primary Factors</div>
                    <div className="text-sm text-gray-200 flex gap-2">
                      <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-[10px] uppercase">Heavy Traffic</span>
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-[10px] uppercase">Low Visibility</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis dataKey="time" stroke="#4b5563" fontSize={10} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0a0f1c', borderColor: '#1f2937', borderRadius: '8px' }}
                    />
                    <Line type="monotone" dataKey="risk" name="Risk %" stroke="#a855f7" strokeWidth={2} dot={{ r: 3, fill: '#a855f7' }} />
                    <Line type="monotone" dataKey="traffic" name="Traffic Vol." stroke="#4b5563" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* INDIA SAFETY DASHBOARD */}
          <section className="lg:col-span-12 bg-[#0a0f1c]/80 backdrop-blur-md border border-gray-800 rounded-2xl">
            <div className="p-6 border-b border-gray-800 bg-[#050914]/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <MapIcon className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-bold font-heading">India Safety Dashboard</h2>
              </div>
              <div className="px-3 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono">
                REGIONAL ANALYSIS
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-800">
              {indiaStates.map((state, i) => (
                <div key={i} className="p-6 hover:bg-gray-800/30 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">{state.name}</h3>
                    <div className="flex items-center gap-1 text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs font-mono">
                      Trending {state.trend}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Total Incidents</div>
                      <div className="text-xl font-mono text-white">{state.incidents.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Risk Score</div>
                      <div className="text-xl font-mono text-white flex items-center gap-2">
                        {state.risk}
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: state.risk > 80 ? '#ef4444' : state.risk > 65 ? '#f59e0b' : '#10b981' }} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${state.risk}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${state.risk > 80 ? 'bg-red-500' : state.risk > 65 ? 'bg-orange-500' : 'bg-green-500'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI INSIGHTS PANEL & SMART CITY HEATMAP */}
          <section className="lg:col-span-8 bg-[#0a0f1c]/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart2 className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-bold font-heading">Smart City Heatmap Density</h2>
            </div>
            
            {/* Conceptual CSS Grid Heatmap */}
            <div className="grid grid-cols-12 grid-rows-6 gap-1 md:gap-2 h-[300px]">
              {Array.from({ length: 72 }).map((_, i) => {
                const isHigh = Math.random() > 0.85;
                const isMed = Math.random() > 0.6;
                return (
                  <motion.div 
                    key={i}
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ 
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`rounded-sm md:rounded-md border border-gray-800/50 ${
                      isHigh ? 'bg-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 
                      isMed ? 'bg-orange-500/30' : 
                      Math.random() > 0.5 ? 'bg-yellow-500/20' : 'bg-cyan-500/10'
                    }`}
                  />
                );
              })}
            </div>
            <div className="flex gap-4 mt-6 justify-center text-xs font-mono text-gray-400">
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500/40 rounded-sm" /> High Risk</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500/30 rounded-sm" /> Elevated</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500/20 rounded-sm" /> Moderate</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-cyan-500/10 rounded-sm" /> Safe Zone</span>
            </div>
          </section>

          <section className="lg:col-span-4 bg-[#0a0f1c]/80 backdrop-blur-md border border-gray-800 rounded-2xl relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 p-32 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="p-6 border-b border-gray-800 bg-[#050914]/50 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold font-heading">AI Insights Panel</h2>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col gap-4 relative z-10">
              {[
                "Accident frequency increased by 12% in high-density traffic corridors.",
                "Most incidents occur between 6 PM and 9 PM due to visibility factors.",
                "AI recommends deploying additional monitoring resources in identified Delhi hotspots.",
                "Emergency dispatch success rate improved by 18% in Sector 7."
              ].map((insight, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.2) }}
                  className="p-4 bg-cyan-900/10 border border-cyan-500/20 rounded-xl flex gap-4 items-start"
                >
                  <BrainCircuit className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-cyan-100 leading-relaxed">{insight}</p>
                </motion.div>
              ))}
              
              <button 
                onClick={() => {
                  if (isGeneratingReport) return;
                  setIsGeneratingReport(true);
                  // Dynamic toast using react-hot-toast
                  import('react-hot-toast').then(({ toast }) => {
                    const toastId = toast.loading('Compiling deep regional safety report...', {
                      style: { background: '#0a0f1c', color: '#fff', border: '1px solid #00f2ff' },
                    });
                    
                    setTimeout(() => {
                      toast.success('Deep report generated and sent to your email!', {
                        id: toastId,
                        style: { background: '#0a0f1c', color: '#fff', border: '1px solid #00f2ff' },
                      });
                      setIsGeneratingReport(false);
                    }, 2500);
                  });
                }}
                disabled={isGeneratingReport}
                className={`mt-auto w-full py-3 rounded-xl border font-mono text-sm transition-colors flex items-center justify-center gap-2 ${
                  isGeneratingReport 
                    ? 'bg-cyan-900/40 border-cyan-500/30 text-cyan-500 cursor-wait' 
                    : 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/50 text-cyan-300'
                }`}
              >
                {isGeneratingReport ? (
                  <>
                    <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Deep Report <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
