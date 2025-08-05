import React, { useState } from 'react';
import { SaveIcon, KeyIcon } from 'lucide-react';

const SecuritySettings = ({ darkMode }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (newPassword && newPassword.length < 8) {
      alert('Password must be at least 8 characters!');
      return;
    }
    // In a real app, this would save to backend
    alert('Security settings updated!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-sm ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border`}
    >
      <h2
        className={`text-xl font-bold mb-6 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}
      >
        Security Settings
      </h2>
      <div className="space-y-8">
        {/* Change Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3
            className={`text-lg font-medium ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Change Password
          </h3>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                  : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
              } border`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                  : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
              } border`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                  : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
              } border`}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg flex items-center ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <KeyIcon size={18} className="mr-2" /> Update Password
            </button>
          </div>
        </form>

        {/* Two-Factor Authentication */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3
            className={`text-lg font-medium mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Two-Factor Authentication
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Enable two-factor authentication for additional security
              </p>
              <p
                className={`text-sm mt-1 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                You'll be asked for an authentication code when signing in from
                new devices
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={twoFactorEnabled}
                onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
              />
              <div
                className={`w-11 h-6 rounded-full peer ${
                  darkMode
                    ? 'bg-gray-700 peer-checked:bg-blue-600'
                    : 'bg-gray-200 peer-checked:bg-blue-600'
                } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white`}
              ></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;