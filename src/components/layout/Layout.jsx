import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, darkMode, toggleDarkMode }) => {
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar darkMode={darkMode} />
      <div className="ml-64">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;