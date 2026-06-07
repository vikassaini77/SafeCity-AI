import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, Mail, Lock, Eye, EyeOff, User, AlertCircle, Check } from 'lucide-react';
import { Button } from '../components/ui';
import { useAuthStore } from '../store';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirm_password: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

function PasswordStrength({ password }: { password: string }) {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const labels = ['Weak', 'Weak', 'Medium', 'Strong', 'Strong'];
  const colors = ['bg-accent-red', 'bg-accent-red', 'bg-accent-yellow', 'bg-accent-green', 'bg-accent-green'];

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded ${
              i < strength ? colors[strength] : 'bg-gray-700'
            } transition-colors`}
          />
        ))}
      </div>
      <p className={`text-xs ${strength < 2 ? 'text-accent-red' : strength < 3 ? 'text-accent-yellow' : 'text-accent-green'}`}>
        {password && labels[strength]}
      </p>
    </div>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      confirm_password: '',
      terms: false,
    },
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setUser({
        id: '1',
        email: data.email,
        full_name: data.full_name,
        role: 'admin',
        is_active: true,
        created_at: new Date().toISOString(),
      });

      toast.success('Account created successfully! Welcome to SafeCity AI.');
      navigate('/dashboard');
    } catch {
      toast.error('Registration failed. Please try again.');
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-surface to-secondary-900" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        </div>

        {/* Feature list */}
        <div className="absolute inset-0 flex items-center p-16">
          <div className="max-w-md">
            <h2 className="text-4xl font-heading font-bold text-white mb-6">
              Start Securing Your Assets Today
            </h2>
            <div className="space-y-4">
              {[
                'Free 14-day trial, no credit card required',
                'Setup your first camera in under 5 minutes',
                'Access to all enterprise features',
                '24/7 support during trial',
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-accent-green/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-accent-green" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
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
              Create your account
            </h1>
            <p className="text-gray-400">
              Join thousands of organizations using SafeCity AI
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  {...register('full_name')}
                  type="text"
                  placeholder="Full name"
                  className={`w-full pl-10 pr-4 py-3 bg-secondary-900/80 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    errors.full_name ? 'border-accent-red focus:ring-accent-red/50' : 'border-gray-700 focus:ring-primary-500/50 focus:border-primary-500'
                  }`}
                />
              </div>
              {errors.full_name && (
                <p className="mt-1.5 text-sm text-accent-red">{errors.full_name.message}</p>
              )}
            </div>

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
              {password && <PasswordStrength password={password} />}
              {errors.password && (
                <p className="mt-1.5 text-sm text-accent-red">{errors.password.message}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  {...register('confirm_password')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  className={`w-full pl-10 pr-12 py-3 bg-secondary-900/80 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    errors.confirm_password ? 'border-accent-red focus:ring-accent-red/50' : 'border-gray-700 focus:ring-primary-500/50 focus:border-primary-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirm_password && (
                <p className="mt-1.5 text-sm text-accent-red">{errors.confirm_password.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  {...register('terms')}
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 rounded border-gray-600 bg-secondary-900 text-primary-500 focus:ring-primary-500/30"
                />
                <span className="text-sm text-gray-400">
                  I agree to the{' '}
                  <Link to="#" className="text-primary-500 hover:text-primary-400">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="#" className="text-primary-500 hover:text-primary-400">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1.5 text-sm text-accent-red">{errors.terms.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          {/* Sign in link */}
          <p className="mt-8 text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-400 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
