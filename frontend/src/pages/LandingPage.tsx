import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  Shield,
  Zap,
  Eye,
  Bell,
  ArrowRight,
  Check,
  Play,
  Building2,
  Car,
  Factory,
  ChevronRight,
  X,
} from 'lucide-react';
import { PublicLayout } from '../components/layout';
import { Button, Badge, LiveBadge } from '../components/ui';
import { CameraFeed } from '../components/dashboard';
import { mockCameras } from '../data/mockData';

// Particle network background
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
  const particleCount = 80;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 242, 255, 0.6)';
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 242, 255, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-60"
      style={{ background: 'transparent' }}
    />
  );
}

// Animated counter
function AnimatedCounter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

// Feature card
function FeatureCard({ icon: Icon, title, description, delay }: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="glass-card p-6 relative overflow-hidden">
        <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors">
          <Icon className="w-6 h-6 text-primary-500" />
        </div>
        <h3 className="text-lg font-heading font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Step card for "How it Works"
function StepCard({ number, title, description, icon: Icon }: {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: number * 0.15, duration: 0.5 }}
      className="relative flex items-start gap-4"
    >
      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-500/5 flex items-center justify-center border border-primary-500/30">
        <Icon className="w-8 h-8 text-primary-500" />
      </div>
      <div className="flex-1">
        <span className="text-xs font-mono text-primary-500 mb-1 block">Step {number}</span>
        <h4 className="text-lg font-heading font-bold text-white mb-1">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      {number < 4 && (
        <div className="hidden lg:block absolute left-[120%] top-1/2 w-16 h-[2px] bg-gradient-to-r from-primary-500/50 to-transparent" />
      )}
    </motion.div>
  );
}

// Use case card
function UseCaseCard({ icon: Icon, title, description, image }: {
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-xl group cursor-pointer"
    >
      <div className="aspect-[4/3] relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-primary-500" />
            <span className="text-xs font-mono text-primary-500 uppercase tracking-wider">
              Use Case
            </span>
          </div>
          <h4 className="text-xl font-heading font-bold text-white mb-2">{title}</h4>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const [showDemo, setShowDemo] = useState(false);

  const stats = [
    { value: 30, suffix: '+', label: 'FPS inference speed', description: 'Real-time detection at 30+ frames per second' },
    { value: 2.4, suffix: 'x', label: 'latency reduction', description: 'Compared to baseline systems', isDecimal: true },
    { value: 50, suffix: 'ms', label: 'alert delivery', description: 'Sub-50ms notification time' },
    { value: 99.7, suffix: '%', label: 'uptime', description: 'Enterprise-grade reliability', isDecimal: true },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Real-Time Detection',
      description: 'Powered by YOLOv8 + TensorRT for blazing-fast inference at 30+ FPS. Detect threats as they happen, not after.',
    },
    {
      icon: Eye,
      title: 'Multi-Camera Intelligence',
      description: 'Monitor unlimited camera streams simultaneously with N-stream parallel inference. Scale without limits.',
    },
    {
      icon: Bell,
      title: 'Instant Anomaly Alerts',
      description: 'WebSocket-powered push notifications deliver alerts in under 50ms. Know instantly when threats emerge.',
    },
  ];

  const steps = [
    { icon: Eye, title: 'Camera Ingestion', description: 'Connect any RTSP/HTTP stream. Our system ingests and preprocesses frames in real-time.' },
    { icon: Zap, title: 'AI Inference', description: 'TensorRT-accelerated YOLOv8 runs inference at 30+ FPS on every frame.' },
    { icon: Shield, title: 'Anomaly Scoring', description: 'Custom ML models analyze detections and score anomalies based on configurable rules.' },
    { icon: Bell, title: 'Alert Dispatch', description: 'Instant WebSocket push + email notifications for rapid response coordination.' },
  ];

  const useCases = [
    {
      icon: Building2,
      title: 'Smart City Surveillance',
      description: 'Monitor public spaces, traffic, and critical infrastructure 24/7.',
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
    },
    {
      icon: Car,
      title: 'Retail Loss Prevention',
      description: 'Detect theft, suspicious behavior, and optimize store operations.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    },
    {
      icon: Factory,
      title: 'Industrial Safety',
      description: 'Monitor workers, detect hazards, and ensure safety compliance.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a50e7e8b?w=800&h=600&fit=crop',
    },
  ];

  const testimonials = [
    {
      quote: "SafeCity AI reduced our incident response time by 73%. The real-time detection is game-changing.",
      author: "Sarah Chen",
      role: "Director of Security",
      company: "Metro Transit Authority",
    },
    {
      quote: "We deployed across 200+ cameras in a week. The ROI was visible within the first month.",
      author: "Marcus Rodriguez",
      role: "VP Operations",
      company: "Global Retail Corp",
    },
  ];

  return (
  <>
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface" />
        <ParticleBackground />

        {/* Radial glow */}
        <div className="absolute inset-0 bg-radial-glow opacity-50" />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-500 text-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              Enterprise-Grade AI Surveillance
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight"
          >
            <span className="text-white">Protect Every Corner.</span>
            <br />
            <span className="text-glow bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              In Real Time.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Powered by YOLOv8 and TensorRT for lightning-fast inference.
            Multi-camera AI surveillance that detects anomalies before they become incidents.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <NavLink to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </NavLink>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={() => setShowDemo(true)}>
              <Play className="w-4 h-4" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-1"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary-500"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
                  {stat.isDecimal ? (
                    <AnimatedCounter end={stat.value * 10} suffix={stat.suffix} />
                  ) : (
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-sm text-primary-500 font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Enterprise-Grade Security Intelligence
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built for modern security operations centers. Real-time AI that never blinks.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From camera feed to actionable alert in milliseconds
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <StepCard key={i} number={i + 1} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Built For Every Industry
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From smart cities to retail stores, SafeCity AI adapts to your security needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, i) => (
              <UseCaseCard key={i} {...useCase} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <p className="text-gray-300 mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <span className="text-primary-500 font-bold">{t.author[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{t.author}</p>
                    <p className="text-gray-500 text-sm">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-background to-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to Transform Your Security Operations?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join hundreds of organizations using SafeCity AI to protect what matters most.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NavLink to="/register">
                <Button size="lg">
                  Get Started Free
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </NavLink>
              <NavLink to="/login">
                <Button variant="secondary" size="lg">
                  View Live Demo
                </Button>
              </NavLink>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>

    {/* Demo Modal */}
    <AnimatePresence>
      {showDemo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowDemo(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-3">
                  <Zap className="w-6 h-6 text-primary-500" />
                  Live AI Detection Demo
                </h2>
                <p className="text-gray-400 mt-1">
                  Real-time person and vehicle detection with bounding boxes
                </p>
              </div>
              <button
                onClick={() => setShowDemo(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Demo Grid */}
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-4xl aspect-video relative">
                {mockCameras.filter(c => c.id === 'cam-1').map((camera) => (
                  <CameraFeed
                    key={camera.id}
                    camera={camera}
                    isLive={true}
                    showControls={false}
                  />
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="glass-card p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-500 rounded" />
                    <span className="text-sm text-gray-400">Person Detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-accent-green rounded" />
                    <span className="text-sm text-gray-400">Vehicle Detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LiveBadge />
                    <span className="text-sm text-gray-400">Real-time Detection</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="info">30+ FPS</Badge>
                  <Badge variant="success">YOLOv8</Badge>
                  <NavLink to="/register">
                    <Button size="sm">Try It Free</Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
  );
}
