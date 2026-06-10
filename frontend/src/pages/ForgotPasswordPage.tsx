import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, Mail, ArrowLeft, Check } from 'lucide-react';
import { Button } from '../components/ui';
import toast from 'react-hot-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  useEffect(() => {
    if (isSubmitted && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, countdown]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email })
      });
      
      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      toast.success('Reset link sent to your email');
    } catch {
      toast.error('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setCountdown(60);
    toast.success('Reset link sent again');
  };

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
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-heading font-bold text-white mb-2">
                  Forgot your password?
                </h1>
                <p className="text-gray-400">
                  No worries, we'll send you reset instructions.
                </p>
              </div>

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

                <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-green/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-accent-green" />
              </div>

              <h2 className="text-xl font-heading font-bold text-white mb-2">
                Check your email
              </h2>
              <p className="text-gray-400 mb-6">
                We sent a password reset link to
              </p>
              <p className="text-primary-500 font-medium mb-6">{submittedEmail}</p>

              <div className="space-y-4">
                <Button
                  onClick={handleResend}
                  variant="secondary"
                  className="w-full"
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `Resend in ${countdown}s` : 'Resend email'}
                </Button>

                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </Link>
              </div>
            </div>
          )}
        </motion.div>

        {!isSubmitted && (
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 mt-6 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        )}
      </div>
    </div>
  );
}
