'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Save } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    contactEmail: '',
    contactPhone: '',
    contactAddress: '',
    aboutText: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      const data = await res.json();
      setFormData({
        contactEmail: data.contactEmail || '',
        contactPhone: data.contactPhone || '',
        contactAddress: data.contactAddress || '',
        aboutText: data.aboutText || '',
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update settings');
      }

      setSuccess('Settings updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-text-main">Website Settings</h1>
      
      <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
              {success}
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold text-text-main mb-4">Contact Information</h2>
            <p className="text-sm text-text-light mb-4">These details will be displayed in the website footer.</p>
            
            <div className="space-y-4">
              <Input
                label="Contact Email"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                required
              />
              <Input
                label="Contact Phone"
                name="contactPhone"
                type="text"
                value={formData.contactPhone}
                onChange={handleChange}
                required
              />
              <Input
                label="Office Address"
                name="contactAddress"
                type="text"
                value={formData.contactAddress}
                onChange={handleChange}
                required
              />
              <div>
                <label className="block text-sm font-medium text-text-main mb-1">
                  About Us / Slogan (Footer Text)
                </label>
                <textarea
                  name="aboutText"
                  value={formData.aboutText}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <Button type="submit" isLoading={isSaving} className="flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
