"use client";

import { useState } from "react";
import { Save, Bell, Moon, Sun, Mail, Clock, Calendar, Users, Shield, Globe } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General settings
    siteName: "EventFlow Admin",
    darkMode: true,
    language: "english",
    
    // Notifications
    notificationsEnabled: true,
    emailNotifications: false,
    eventReminders: true,
    reminderTime: 24,
    
    // Security
    autoLogout: 30,
    twoFactorAuth: false,
    passwordExpiry: 90,
    
    // Events settings
    defaultEventDuration: 60,
    allowGuestRegistration: true,
    requireApproval: false,
    maxAttendeesDefault: 100,
    
    // User settings
    defaultUserRole: "attendee",
    allowSelfRegistration: true,
    moderationEnabled: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : 
              type === "number" ? parseInt(value) : value
    });
  };

  const handleSaveSettings = (e: React.FormEvent | null) => {
    if (e) e.preventDefault();
    // Here you would typically save settings to backend
    alert("Settings saved successfully!");
  };

  const TabButton = ({ id, label, icon }: { id: string; label: string; icon: React.ElementType }) => {
    const Icon = icon;
    return (
      <button
        type="button"
        onClick={() => setActiveTab(id)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          activeTab === id 
            ? "bg-blue-600 text-white" 
            : "text-white/60 hover:bg-gray-800 hover:text-white"
        }`}
      >
        <Icon size={18} />
        <span>{label}</span>
      </button>
    );
  };

  const FormField = ({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) => (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-white/80 mb-1">
        {label}
      </label>
      {children}
    </div>
  );

  const Toggle = ({ 
    name, 
    checked, 
    onChange, 
    label 
  }: { 
    name: string; 
    checked: boolean; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    label: string;
  }) => (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-white/80">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-light">Settings</h1>
        <p className="text-white/60">Manage your event management system preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col gap-1">
            <TabButton id="general" label="General" icon={Globe} />
            <TabButton id="notifications" label="Notifications" icon={Bell} />
            <TabButton id="security" label="Security" icon={Shield} />
            <TabButton id="events" label="Events" icon={Calendar} />
            <TabButton id="users" label="Users" icon={Users} />
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <div className="bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div>
              {/* General Settings */}
              {activeTab === "general" && (
                <div>
                  <h2 className="text-xl font-medium mb-4">General Settings</h2>
                  <FormField label="Platform Name" htmlFor="siteName">
                    <input
                      type="text"
                      id="siteName"
                      name="siteName"
                      value={settings.siteName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </FormField>

                  <Toggle
                    name="darkMode"
                    checked={settings.darkMode}
                    onChange={handleChange}
                    label="Dark Mode"
                  />

                  <FormField label="Language" htmlFor="language">
                    <select
                      id="language"
                      name="language"
                      value={settings.language}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </FormField>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-medium mb-4">Notification Settings</h2>
                  <Toggle
                    name="notificationsEnabled"
                    checked={settings.notificationsEnabled}
                    onChange={handleChange}
                    label="Enable Notifications"
                  />

                  <Toggle
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                    label="Email Notifications"
                  />

                  <Toggle
                    name="eventReminders"
                    checked={settings.eventReminders}
                    onChange={handleChange}
                    label="Event Reminders"
                  />

                  <FormField label="Reminder Time (hours before event)" htmlFor="reminderTime">
                    <input
                      type="number"
                      id="reminderTime"
                      name="reminderTime"
                      value={settings.reminderTime}
                      onChange={handleChange}
                      min="1"
                      max="72"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </FormField>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-medium mb-4">Security Settings</h2>
                  <FormField label="Auto Logout (minutes of inactivity)" htmlFor="autoLogout">
                    <input
                      type="number"
                      id="autoLogout"
                      name="autoLogout"
                      value={settings.autoLogout}
                      onChange={handleChange}
                      min="5"
                      max="120"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </FormField>

                  <Toggle
                    name="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onChange={handleChange}
                    label="Two-Factor Authentication"
                  />

                  <FormField label="Password Expiry (days)" htmlFor="passwordExpiry">
                    <input
                      type="number"
                      id="passwordExpiry"
                      name="passwordExpiry"
                      value={settings.passwordExpiry}
                      onChange={handleChange}
                      min="30"
                      max="365"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </FormField>
                </div>
              )}

              {/* Events Settings */}
              {activeTab === "events" && (
                <div>
                  <h2 className="text-xl font-medium mb-4">Events Settings</h2>
                  <FormField label="Default Event Duration (minutes)" htmlFor="defaultEventDuration">
                    <input
                      type="number"
                      id="defaultEventDuration"
                      name="defaultEventDuration"
                      value={settings.defaultEventDuration}
                      onChange={handleChange}
                      min="15"
                      step="15"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </FormField>

                  <Toggle
                    name="allowGuestRegistration"
                    checked={settings.allowGuestRegistration}
                    onChange={handleChange}
                    label="Allow Guest Registration"
                  />

                  <Toggle
                    name="requireApproval"
                    checked={settings.requireApproval}
                    onChange={handleChange}
                    label="Require Approval for Event Registration"
                  />

                  <FormField label="Default Max Attendees" htmlFor="maxAttendeesDefault">
                    <input
                      type="number"
                      id="maxAttendeesDefault"
                      name="maxAttendeesDefault"
                      value={settings.maxAttendeesDefault}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </FormField>
                </div>
              )}

              {/* User Settings */}
              {activeTab === "users" && (
                <div>
                  <h2 className="text-xl font-medium mb-4">User Settings</h2>
                  <FormField label="Default User Role" htmlFor="defaultUserRole">
                    <select
                      id="defaultUserRole"
                      name="defaultUserRole"
                      value={settings.defaultUserRole}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="attendee">Attendee</option>
                      <option value="organizer">Organizer</option>
                      <option value="moderator">Moderator</option>
                    </select>
                  </FormField>

                  <Toggle
                    name="allowSelfRegistration"
                    checked={settings.allowSelfRegistration}
                    onChange={handleChange}
                    label="Allow Self Registration"
                  />

                  <Toggle
                    name="moderationEnabled"
                    checked={settings.moderationEnabled}
                    onChange={handleChange}
                    label="Enable User Moderation"
                  />
                </div>
              )}

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white"
                >
                  <Save size={18} />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}