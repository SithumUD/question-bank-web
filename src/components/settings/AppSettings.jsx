import React, { useState } from 'react';
import { SaveIcon } from 'lucide-react';

const AppSettings = ({ darkMode }) => {
  const [settings, setSettings] = useState({
    theme: 'system',
    questionDisplayCount: 10,
    defaultDifficulty: 'all',
    autoSave: true,
    showHints: true,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target;
      setSettings((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    alert('App settings updated!');
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
        App Preferences
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Theme
          </label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
            } border`}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Questions per page
          </label>
          <select
            name="questionDisplayCount"
            value={settings.questionDisplayCount}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
            } border`}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Default difficulty filter
          </label>
          <select
            name="defaultDifficulty"
            value={settings.defaultDifficulty}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
            } border`}
          >
            <option value="all">All Difficulties</option>
            <option value="1">Easy (1)</option>
            <option value="2">Medium (2)</option>
            <option value="3">Hard (3)</option>
            <option value="4">Expert (4)</option>
            <option value="5">Advanced (5)</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoSave"
            name="autoSave"
            checked={settings.autoSave}
            onChange={handleChange}
            className={`w-4 h-4 rounded ${
              darkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-white border-gray-300'
            } focus:ring-blue-500 focus:ring-2`}
          />
          <label
            htmlFor="autoSave"
            className={`ml-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Auto-save question edits
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="showHints"
            name="showHints"
            checked={settings.showHints}
            onChange={handleChange}
            className={`w-4 h-4 rounded ${
              darkMode
                ? 'bg-gray-700 border-gray-600'
                : 'bg-white border-gray-300'
            } focus:ring-blue-500 focus:ring-2`}
          />
          <label
            htmlFor="showHints"
            className={`ml-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Show hints in study mode
          </label>
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
            <SaveIcon size={18} className="mr-2" /> Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppSettings;