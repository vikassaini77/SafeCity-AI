import React from 'react';
import { Eye, Activity, Camera, AlertTriangle, BarChart, Server, Shield, Zap, Lock, Database, Search, Target, Users, Map, Video, CheckCircle, Clock } from 'lucide-react';

export const productData: Record<string, any> = {
  'overview': {
    category: 'Product Overview',
    title: <>End-to-End <span className="text-primary-500">Security Intelligence</span></>,
    description: 'SafeCity AI is the operating system for modern public safety. Ingest thousands of camera streams, run state-of-the-art computer vision models, and route real-time alerts to responders—all from a single pane of glass.',
    stats: [
      { value: '50ms', label: 'Average Latency' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '10k+', label: 'Cameras Supported' },
      { value: 'Zero', label: 'Biometrics Used' }
    ],
    features: [
      { icon: <Activity />, title: 'Real-Time Anomaly Detection', description: 'Automatically detect fights, accidents, and unauthorized access in real-time.' },
      { icon: <Search />, title: 'Intelligent Search', description: 'Search through weeks of footage using natural language or semantic attributes.' },
      { icon: <Shield />, title: 'Privacy by Design', description: 'No facial recognition. All processing focuses on behavioral and object analytics.' },
      { icon: <Server />, title: 'Hybrid Cloud Architecture', description: 'Run inference at the edge or in the cloud depending on your compliance requirements.' },
      { icon: <Zap />, title: 'Automated Workflows', description: 'Trigger webhooks, SMS, or API calls instantly when critical events are detected.' },
      { icon: <Database />, title: 'Tamper-Proof Evidence', description: 'Securely archive event footage with cryptographic hashing to ensure chain of custody.' }
    ]
  },
  'architecture': {
    category: 'Platform Architecture',
    title: <>Built for <span className="text-primary-500">Massive Scale</span></>,
    description: 'SafeCity AI employs a distributed microservices architecture designed to process millions of frames per second. Our unique Edge-to-Cloud hybrid model ensures high availability and compliance.',
    stats: [
      { value: 'Kubernetes', label: 'Orchestration' },
      { value: 'TensorRT', label: 'Inference Engine' },
      { value: 'WebRTC', label: 'Streaming Protocol' },
      { value: 'AES-256', label: 'Encryption' }
    ],
    features: [
      { icon: <Server />, title: 'Edge Nodes', description: 'Deploy localized inference boxes to process video locally and save outbound bandwidth.' },
      { icon: <Database />, title: 'Data Lakehouse', description: 'Store petabytes of metadata in a scalable, highly queryable data lakehouse.' },
      { icon: <Lock />, title: 'Zero Trust Security', description: 'Every internal service requires mTLS authentication and authorization.' }
    ]
  },
  'ai-engine': {
    category: 'AI Detection Engine',
    title: <>State-of-the-Art <span className="text-primary-500">Computer Vision</span></>,
    description: 'Our proprietary ensemble of neural networks is trained on millions of hours of diverse, anonymized security footage. We deliver the highest precision in the industry with the lowest false positive rates.',
    stats: [
      { value: '99.4%', label: 'Detection Accuracy' },
      { value: 'FP16', label: 'Quantization' },
      { value: '30+', label: 'Object Classes' },
      { value: '15+', label: 'Behavior Classes' }
    ],
    features: [
      { icon: <Target />, title: 'YOLOv8 Core', description: 'Utilizing the latest in single-shot object detection for unmatched speed.' },
      { icon: <Activity />, title: 'Temporal Action Localization', description: 'Understanding sequence over time to differentiate a hug from a fight.' },
      { icon: <Eye />, title: 'Adversarial Robustness', description: 'Models trained to resist noise, poor lighting, and weather occlusions.' }
    ]
  },
  'real-time-monitoring': {
    category: 'Real-Time Monitoring',
    title: <>Sub-Second <span className="text-primary-500">Situational Awareness</span></>,
    description: 'Monitor thousands of cameras without human fatigue. The system actively brings the most critical feeds to your attention automatically.',
    features: [
      { icon: <Camera />, title: 'Dynamic Grid', description: 'The dashboard automatically re-arranges to prioritize cameras where events are occurring.' },
      { icon: <Zap />, title: 'WebRTC Streaming', description: 'Experience true real-time viewing with sub-200ms latency across the globe.' },
      { icon: <Map />, title: 'Geospatial Mapping', description: 'View all active cameras and alerts overlaid on a live 3D map of your facility or city.' }
    ]
  },
  'incident-response': {
    category: 'Incident Response System',
    title: <>Automate <span className="text-primary-500">Emergency Workflows</span></>,
    description: 'When seconds count, manual dispatch is too slow. SafeCity AI automatically routes the right context to the right responders instantly.',
    features: [
      { icon: <AlertTriangle />, title: 'Smart Dispatch', description: 'Route alerts to police, fire, or medical depending on the AI classification.' },
      { icon: <Video />, title: 'Contextual Payloads', description: 'Alerts include a 10-second pre-event video clip and exact GPS coordinates.' },
      { icon: <CheckCircle />, title: 'Audit Trails', description: 'Track exactly when an alert was generated, viewed, and resolved.' }
    ]
  },
  'smart-city': {
    category: 'Smart City Intelligence',
    title: <>Data-Driven <span className="text-primary-500">Urban Planning</span></>,
    description: 'Turn your existing camera infrastructure into the ultimate sensor network. Measure traffic flows, pedestrian density, and usage patterns.',
    features: [
      { icon: <BarChart />, title: 'Traffic Heatmaps', description: 'Identify congestion choke points and optimize traffic light timing.' },
      { icon: <Users />, title: 'Crowd Density', description: 'Monitor public squares and transit hubs to prevent dangerous overcrowding.' },
      { icon: <Activity />, title: 'Trend Analysis', description: 'Compare historical data to measure the impact of urban policy changes.' }
    ]
  },
  'multi-camera': {
    category: 'Multi-Camera Analytics',
    title: <>Track Across <span className="text-primary-500">Blind Spots</span></>,
    description: 'Our DeepSORT implementation allows the system to maintain object persistence even as subjects move between different, non-overlapping camera views.',
    features: [
      { icon: <Search />, title: 'Re-Identification (ReID)', description: 'Match subjects based on clothing color, vehicle make, and trajectory without facial recognition.' },
      { icon: <Map />, title: 'Trajectory Mapping', description: 'Draw the path of a suspicious vehicle across an entire campus map automatically.' },
      { icon: <Clock />, title: 'Timeline Reconstruction', description: 'Automatically stitch together clips from multiple cameras to form a chronological narrative.' }
    ]
  }
};

export const featureData: Record<string, any> = {
  'accident-detection': {
    category: 'Accident Detection',
    title: <>Detect <span className="text-primary-500">Traffic Collisions</span> Instantly</>,
    description: 'Our models are trained on thousands of hours of dashcam and intersection footage to instantly recognize vehicular crashes, reducing emergency response times by up to 40%.',
    features: [
      { icon: <Target />, title: 'Impact Recognition', description: 'Detect high-velocity impacts between vehicles, pedestrians, or infrastructure.' },
      { icon: <Zap />, title: 'Immediate EMS Routing', description: 'Bypass manual 911 calls by routing crash data directly to local dispatch centers.' },
      { icon: <Video />, title: 'Liability Context', description: 'Securely lock the 30 seconds before and after the crash for insurance and legal review.' }
    ]
  },
  'violence-detection': {
    category: 'Violence Detection',
    title: <>Proactive <span className="text-primary-500">Threat Mitigation</span></>,
    description: 'Detect physical altercations, aggressive posturing, and crowd panic before situations escalate into severe tragedies.',
    features: [
      { icon: <Activity />, title: 'Kinematic Analysis', description: 'Analyze the speed and velocity of limbs to differentiate between play-fighting and real violence.' },
      { icon: <AlertTriangle />, title: 'Weapon Detection', description: 'Identify drawn firearms or bladed weapons instantly.' },
      { icon: <Users />, title: 'Crowd Panic Detection', description: 'Identify sudden dispersal or stampede patterns in large crowds.' }
    ]
  },
  'crowd-monitoring': {
    category: 'Crowd Monitoring',
    title: <>Maintain <span className="text-primary-500">Public Order</span></>,
    description: 'Ensure stadiums, transit hubs, and public squares remain safe by continuously monitoring density and flow rates.',
    features: [
      { icon: <Users />, title: 'Density Estimation', description: 'Calculate people per square meter in real-time.' },
      { icon: <AlertTriangle />, title: 'Crush Prevention', description: 'Trigger alerts when density exceeds safe thresholds for the given geometry.' },
      { icon: <BarChart />, title: 'Flow Analysis', description: 'Measure the rate of ingress and egress to optimize staffing.' }
    ]
  },
  'vehicle-analytics': {
    category: 'Vehicle Analytics',
    title: <>Intelligent <span className="text-primary-500">Traffic Management</span></>,
    description: 'Extract rich metadata from every vehicle passing through your infrastructure without needing dedicated ALPR hardware.',
    features: [
      { icon: <Target />, title: 'Make & Model Recognition', description: 'Identify the make, model, and color of vehicles even at high speeds.' },
      { icon: <Activity />, title: 'Wrong-Way Detection', description: 'Instantly alert authorities to vehicles traveling against the flow of traffic.' },
      { icon: <Search />, title: 'Loitering Detection', description: 'Detect vehicles parked illegally in loading zones or critical infrastructure areas.' }
    ]
  },
  'emergency-response': {
    category: 'Emergency Response Automation',
    title: <>Zero-Touch <span className="text-primary-500">Dispatching</span></>,
    description: 'Integrate directly with CAD (Computer Aided Dispatch) systems to automate the initiation of emergency workflows.',
    features: [
      { icon: <Zap />, title: 'API Integrations', description: 'Pre-built connectors for RapidSOS, Motorola Solutions, and other CAD systems.' },
      { icon: <Lock />, title: 'CJIS Compliant', description: 'All data transmission meets the strict requirements of the FBI CJIS Security Policy.' },
      { icon: <Map />, title: 'Dynamic Routing', description: 'Provide responders with the fastest route based on live traffic data.' }
    ]
  },
  'alerting': {
    category: 'AI Alerting System',
    title: <>Cut Through <span className="text-primary-500">the Noise</span></>,
    description: 'Stop suffering from alert fatigue. Our sophisticated rules engine ensures you only receive notifications that actually matter.',
    features: [
      { icon: <Search />, title: 'Custom Thresholds', description: 'Set specific confidence score minimums or time-in-zone requirements.' },
      { icon: <Clock />, title: 'Schedule-Based Rules', description: 'Only alert on loitering if it occurs between 10 PM and 5 AM.' },
      { icon: <Shield />, title: 'Escalation Policies', description: 'If an alert isn\'t acknowledged in 60 seconds, page the next person on call.' }
    ]
  },
  'dashboard': {
    category: 'Analytics Dashboard',
    title: <>Your Central <span className="text-primary-500">Command Center</span></>,
    description: 'A beautiful, dark-mode optimized web application that brings all your cameras, alerts, and analytics into one unified interface.',
    features: [
      { icon: <Camera />, title: 'Customizable Layouts', description: 'Drag and drop camera feeds to create the perfect multi-monitor setup.' },
      { icon: <BarChart />, title: 'Rich Data Viz', description: 'Explore historical trends with interactive charts and graphs.' },
      { icon: <Lock />, title: 'Role-Based Access', description: 'Ensure users only see the cameras and data they are authorized to view.' }
    ]
  }
};
