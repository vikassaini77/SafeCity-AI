import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Calendar,
  Upload,
  Trash2,
  Save,
  AlertTriangle,
} from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/ui';
import { useAuthStore } from '../store';
import { formatDate } from '../lib/utils';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [fullName, setFullName] = useState(user?.full_name || 'Alex Johnson');
  const [email, setEmail] = useState(user?.email || 'demo@safecity.ai');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [organization, setOrganization] = useState('SafeCity Security Operations');
  const [bio, setBio] = useState('Security Operations Manager with 10+ years of experience in enterprise surveillance systems.');
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setUser({
      ...user!,
      full_name: fullName,
      email,
    });
    toast.success('Profile updated successfully!');
  };

  const handleAvatarUpload = () => {
    toast.success('Avatar upload feature coming soon!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">Profile Settings</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your account information
        </p>
      </div>

      {/* Profile Card */}
      <Card>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-primary-500/20 flex items-center justify-center overflow-hidden border-2 border-primary-500/30">
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-primary-500" />
                )}
              </div>
              <button
                onClick={handleAvatarUpload}
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-secondary-900 hover:bg-primary-400 transition-colors"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Click to upload</p>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
              />
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                leftIcon={<Phone className="w-4 h-4" />}
              />
              <Input
                label="Organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                leftIcon={<Building className="w-4 h-4" />}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Role</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value="Admin"
                  disabled
                  className="w-full pl-10 pr-4 py-3 bg-secondary-900/40 border border-gray-700 rounded-lg text-gray-400"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Role can only be changed by an administrator</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-secondary-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 mt-6 border-t border-gray-800">
          <Button onClick={handleSave} isLoading={isSaving}>
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Activity Summary */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-white mb-4">Activity Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-secondary-900/50 rounded-lg">
            <p className="text-3xl font-heading font-bold text-white">247</p>
            <p className="text-sm text-gray-500">Alerts Acknowledged</p>
          </div>
          <div className="p-4 bg-secondary-900/50 rounded-lg">
            <p className="text-3xl font-heading font-bold text-white">12</p>
            <p className="text-sm text-gray-500">Reports Created</p>
          </div>
          <div className="p-4 bg-secondary-900/50 rounded-lg">
            <p className="text-3xl font-heading font-bold text-white">5</p>
            <p className="text-sm text-gray-500">Cameras Added</p>
          </div>
          <div className="p-4 bg-secondary-900/50 rounded-lg">
            <p className="text-3xl font-heading font-bold text-white">89%</p>
            <p className="text-sm text-gray-500">Response Rate</p>
          </div>
        </div>
      </Card>

      {/* Account Info */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-white mb-4">Account Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Account Created</p>
            <p className="text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              {formatDate(user?.created_at || '2024-01-15')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Login</p>
            <p className="text-white">{formatDate(new Date().toISOString())}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Account Status</p>
            <Badge variant="success">Active</Badge>
          </div>
          <div>
            <p className="text-sm text-gray-500">Subscription</p>
            <Badge variant="info">Enterprise</Badge>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-accent-red/30">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-accent-red" />
          <div>
            <h3 className="text-lg font-heading font-bold text-white">Danger Zone</h3>
            <p className="text-sm text-gray-400">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>
        </div>

        <div className="p-4 bg-accent-red/10 border border-accent-red/30 rounded-lg">
          <p className="text-sm text-gray-300 mb-3">
            Type <span className="font-mono text-accent-red">DELETE</span> to confirm account deletion:
          </p>
          <input
            type="text"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            placeholder="Type DELETE to confirm"
            className="w-full px-4 py-2 bg-secondary-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-red/50 mb-4"
          />
          <Button
            variant="danger"
            disabled={deleteConfirmText !== 'DELETE'}
          >
            <Trash2 className="w-4 h-4" />
            Delete My Account
          </Button>
        </div>
      </Card>
    </div>
  );
}
