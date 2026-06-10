import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSafeCityAPI } from './hooks/useSafeCityAPI';
import { useAuthStore } from './store';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import LiveFeedsPage from './pages/LiveFeedsPage';
import AlertsPage from './pages/AlertsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CamerasPage from './pages/CamerasPage';
import ReportsPage from './pages/ReportsPage';
import SystemPage from './pages/SystemPage';
import SettingsPage from './pages/settings/SettingsPage';
import ProfilePage from './pages/ProfilePage';

import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import ApiDocsPage from './pages/ApiDocsPage';
import { ApiDocsV2Page } from './pages/ApiDocsV2Page';
import ChangelogPage from './pages/ChangelogPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import SecurityPage from './pages/SecurityPage';
import DynamicContentPage from './pages/DynamicContentPage';
import IntelligenceCenterPage from './pages/IntelligenceCenterPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { JobApplicationPage } from './pages/JobApplicationPage';
import { ComplianceReportPage } from './pages/ComplianceReportPage';
import { SSOLoginPage } from './pages/SSOLoginPage';

// Layouts
import { DashboardLayout } from './components/layout';

// 404 Page
function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 mb-8">Page not found</p>
        <a href="/dashboard" className="btn-primary">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}

function App() {
  useSafeCityAPI();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          className: 'bg-secondary-900 border border-gray-800 text-white',
          duration: 3000,
          style: {
            background: '#1a1a2e',
            border: '1px solid rgba(0, 242, 255, 0.2)',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#00FF88',
              secondary: '#080C18',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF3B3B',
              secondary: '#080C18',
            },
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sso-login" element={<SSOLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/intelligence" element={<IntelligenceCenterPage />} />
        
        {/* Dynamic Enterprise Content Hubs */}
        <Route path="/product/:slug" element={<DynamicContentPage type="product" />} />
        <Route path="/features/:slug" element={<DynamicContentPage type="feature" />} />
        
        {/* Commercial & Technical Hubs */}
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/api-docs" element={<ApiDocsV2Page />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/blog/post" element={<BlogPostPage />} />
        <Route path="/job-application" element={<JobApplicationPage />} />
        <Route path="/compliance" element={<ComplianceReportPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="live-feeds" element={<LiveFeedsPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="cameras" element={<CamerasPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="system" element={<SystemPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
