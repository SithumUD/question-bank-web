import React from 'react';
import { SearchIcon, BellIcon, MoonIcon, SunIcon } from 'lucide-react';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header
      className={`h-16 px-6 flex items-center justify-between ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}
    >
      <div className="flex items-center w-1/3">
        <div
          className={`relative w-full max-w-xs ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          <input
            type="text"
            placeholder="Search questions..."
            className={`w-full py-2 pl-10 pr-4 rounded-lg focus:outline-none ${
              darkMode
                ? 'bg-gray-700 focus:bg-gray-600 border-gray-600'
                : 'bg-gray-100 focus:bg-white border-gray-300'
            } border`}
          />
          <SearchIcon
            size={18}
            className="absolute left-3 top-2.5 text-gray-400"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className={`p-2 rounded-full ${
            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          <BellIcon
            size={20}
            className={darkMode ? 'text-gray-300' : 'text-gray-600'}
          />
        </button>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${
            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          {darkMode ? (
            <SunIcon size={20} className="text-gray-300" />
          ) : (
            <MoonIcon size={20} className="text-gray-600" />
          )}
        </button>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            JP
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;