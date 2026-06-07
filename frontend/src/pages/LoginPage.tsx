import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button, Input } from '../components/ui';
import { useAuthStore } from '../store';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Demo login check
      if (data.email === 'demo@safecity.ai' && data.password === 'Demo@1234') {
        setUser({
          id: '1',
          email: data.email,
          full_name: 'Alex Johnson',
          role: 'admin',
          is_active: true,
          created_at: new Date().toISOString(),
        });
        toast.success('Welcome back, Alex!');
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Try demo@safecity.ai / Demo@1234');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Visual */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-surface to-secondary-900" />

        {/* Animated detection boxes */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563982632107-86316b5872a0?w=1920')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />

          {/* Simulated detection boxes */}
          <motion.div
            animate={{
              x: [0, 20, 0],
              y: [0, 10, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] left-[30%] w-32 h-48 border-2 border-primary-500 rounded"
          >
            <span className="absolute -top-6 left-0 px-2 py-1 bg-primary-500 text-secondary-900 text-xs font-mono font-bold rounded">
              Person 94%
            </span>
          </motion.div>

          <motion.div
            animate={{
              x: [0, -15, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-[40%] left-[60%] w-40 h-24 border-2 border-accent-green rounded"
          >
            <span className="absolute -top-6 left-0 px-2 py-1 bg-accent-green text-secondary-900 text-xs font-mono font-bold rounded">
              Vehicle 87%
            </span>
          </motion.div>
        </div>

        {/* Overlay text */}
        <div className="absolute inset-0 flex items-end p-16">
          <div>
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              Real-Time AI Surveillance
            </h2>
            <p className="text-gray-400 max-w-md">
              Protect your assets with enterprise-grade anomaly detection powered by YOLOv8 and TensorRT.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-500" />
            </div>
            <span className="text-xl font-heading font-bold text-white">
              SafeCity <span className="text-primary-500">AI</span>
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-heading font-bold text-white mb-2">
              Welcome back
            </h1>
            <p className="text-gray-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-accent-red/20 border border-accent-red/30 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-accent-red shrink-0 mt-0.5" />
              <p className="text-accent-red text-sm">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Email address"
                  className={`w-full pl-10 pr-4 py-3 bg-secondary-900/80 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    errors.email ? 'border-accent-red focus:ring-accent-red/50' : 'border-gray-700 focus:ring-primary-500/50 focus:border-primary-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-accent-red">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className={`w-full pl-10 pr-12 py-3 bg-secondary-900/80 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    errors.password ? 'border-accent-red focus:ring-accent-red/50' : 'border-gray-700 focus:ring-primary-500/50 focus:border-primary-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-accent-red">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register('remember')}
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 bg-secondary-900 text-primary-500 focus:ring-primary-500/30"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-primary-500 hover:text-primary-400 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-gray-600">Or continue with</span>
            </div>
          </div>

          {/* Social login */}
          <button
            disabled
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-secondary-900/50 border border-gray-700 rounded-lg text-gray-400 hover:bg-secondary-900 hover:text-white hover:border-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Sign in with Google</span>
            <span className="text-xs text-gray-600">(Coming Soon)</span>
          </button>

          {/* Sign up link */}
          <p className="mt-8 text-center text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-500 hover:text-primary-400 transition-colors font-medium">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
