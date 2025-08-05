import React, { useState } from 'react';
import { UserIcon, BellIcon, ShieldIcon, SettingsIcon } from 'lucide-react';
import ProfileSettings from '../components/settings/ProfileSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import AppSettings from '../components/settings/AppSettings';
import SecuritySettings from '../components/settings/SecuritySettings';

const Settings = () => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    {
      id: 'profile',
      name: 'Profile',
      icon: <UserIcon size={18} />,
      component: <ProfileSettings darkMode={isDarkMode} />,
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: <BellIcon size={18} />,
      component: <NotificationSettings darkMode={isDarkMode} />,
    },
    {
      id: 'app',
      name: 'Preferences',
      icon: <SettingsIcon size={18} />,
      component: <AppSettings darkMode={isDarkMode} />,
    },
    {
      id: 'security',
      name: 'Security',
      icon: <ShieldIcon size={18} />,
      component: <SecuritySettings darkMode={isDarkMode} />,
    },
  ];

  return (
    <div>
      <h1
        className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}
      >
        Settings
      </h1>
      <p
        className={`text-lg mb-8 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        Manage your account preferences
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div
          className={`md:w-64 p-4 rounded-xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-sm`}
        >
          <nav>
            <ul className="space-y-1">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? isDarkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 text-blue-700'
                        : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default Settings;