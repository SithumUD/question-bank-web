import React, { useState } from 'react';
import { SaveIcon } from 'lucide-react';

const ProfileSettings = ({ darkMode }) => {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    jobTitle: 'Full Stack Developer',
    location: 'San Francisco, CA',
    bio: 'Passionate developer with 5 years of experience in web technologies.',
    linkedIn: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    alert('Profile updated successfully!');
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
        Profile Settings
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                  : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
              } border`}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                  : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
              } border`}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={profile.jobTitle}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                  : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
              } border`}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                  : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
              } border`}
            />
          </div>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Bio
          </label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
            } border`}
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              LinkedIn
            </label>
            <input
              type="text"
              name="linkedIn"
              value={profile.linkedIn}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                  : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
              } border`}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              GitHub
            </label>
            <input
              type="text"
              name="github"
              value={profile.github}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                  : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
              } border`}
            />
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
            <SaveIcon size={18} className="mr-2" /> Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;