import React, { useState } from 'react';
import { SaveIcon } from 'lucide-react';

const NotificationSettings = ({ darkMode }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    studyReminders: true,
    interviewReminders: true,
    weeklyDigest: false,
    jobAlerts: true,
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    alert('Notification settings updated!');
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
        Notification Settings
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`font-medium ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                Email Notifications
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Receive email notifications about your account activity
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
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

          {/* Study Reminders */}
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`font-medium ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                Study Reminders
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Get reminders to study your interview questions
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.studyReminders}
                onChange={() => handleToggle('studyReminders')}
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

          {/* Interview Reminders */}
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`font-medium ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                Interview Reminders
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Get notified about upcoming interviews
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.interviewReminders}
                onChange={() => handleToggle('interviewReminders')}
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

          {/* Weekly Digest */}
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`font-medium ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                Weekly Digest
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Receive a weekly summary of your study progress
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.weeklyDigest}
                onChange={() => handleToggle('weeklyDigest')}
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

          {/* Job Application Alerts */}
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`font-medium ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                Job Application Alerts
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Get notified about status changes in your job applications
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.jobAlerts}
                onChange={() => handleToggle('jobAlerts')}
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

        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg flex items-center ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <SaveIcon size={18} className="mr-2" /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationSettings;