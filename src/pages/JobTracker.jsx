import React from 'react';
import JobTrackerComponent from '../components/jobs/JobTracker';

const JobTracker = () => {
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}
      >
        Job Applications
      </h1>
      <p
        className={`text-lg mb-8 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        Track and manage your job applications
      </p>
      <JobTrackerComponent darkMode={isDarkMode} />
    </div>
  );
};

export default JobTracker;