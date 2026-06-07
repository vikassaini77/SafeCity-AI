import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, Lock, Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from '../components/ui';
import toast from 'react-hot-toast';

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-2 text-sm ${met ? 'text-accent-green' : 'text-gray-500'}`}>
      {met ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
      <span>{text}</span>
    </div>
  );
}

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch('password') || '';

  useEffect(() => {
    // Simulate token validation
    const validateToken = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (token) {
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
      }
    };
    validateToken();
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      toast.success('Password reset successfully!');
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isTokenValid === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isTokenValid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-red/20 flex items-center justify-center">
            <X className="w-8 h-8 text-accent-red" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white mb-2">
            Invalid or Expired Link
          </h1>
          <p className="text-gray-400 mb-6">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <Link to="/forgot-password">
            <Button>Request New Link</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-500" />
          </div>
          <span className="text-xl font-heading font-bold text-white">
            SafeCity <span className="text-primary-500">AI</span>
          </span>
        </Link>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8"
        >
          {isSuccess ? (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-green/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-accent-green" />
              </div>
              <h2 className="text-xl font-heading font-bold text-white mb-2">
                Password Reset
              </h2>
              <p className="text-gray-400 mb-6">
                Your password has been reset successfully. Redirecting to login...
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-heading font-bold text-white mb-2">
                  Set new password
                </h1>
                <p className="text-gray-400">
                  Your new password must be different from previous passwords.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="New password"
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
                  <div className="mt-3 space-y-1">
                    <PasswordRequirement met={password.length >= 8} text="At least 8 characters" />
                    <PasswordRequirement met={/[A-Z]/.test(password)} text="One uppercase letter" />
                    <PasswordRequirement met={/[0-9]/.test(password)} text="One number" />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      {...register('confirm_password')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm new password"
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

                <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                  Reset Password
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
