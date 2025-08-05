import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../components/dashboard/StatsCard';
import RecentQuestions from '../components/dashboard/RecentQuestions';
import FloatingButton from '../components/ui/FloatingButton';
import { useQuestions } from '../utils/QuestionsContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { questions, loading, error } = useQuestions();
  const isDarkMode = document.documentElement.classList.contains('dark');

  // Calculate stats from questions data
  const stats = {
    totalQuestions: questions.length,
    masteredQuestions: questions.filter(q => q.mastered).length,
    recentlyAdded: questions.filter(q => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(q.dateAdded) > oneWeekAgo;
    }).length,
    studiedThisWeek: questions.filter(q => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return q.lastReviewed && new Date(q.lastReviewed) > oneWeekAgo;
    }).length,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading data: {error}
      </div>
    );
  }

  return (
    <div>
      <h1
        className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}
      >
        Interview Preparation Dashboard
      </h1>
      <p
        className={`text-lg mb-8 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        Prepare for your next interview with your personalized question bank
      </p>

      <StatsCard darkMode={isDarkMode} stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentQuestions 
          darkMode={isDarkMode} 
          questions={questions
            .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
            .slice(0, 5)
          } 
        />

        <div
          className={`rounded-xl shadow-sm ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border p-6`}
        >
          <h2
            className={`text-xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/questions/add')}
              className={`p-4 rounded-lg flex items-center ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-blue-900 text-blue-200'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                +
              </div>
              <span className="ml-3">Add New Question</span>
            </button>

            <button
              onClick={() => navigate('/categories')}
              className={`p-4 rounded-lg flex items-center ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-indigo-900 text-indigo-200'
                    : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                C
              </div>
              <span className="ml-3">Manage Categories</span>
            </button>

            <button
              onClick={() => navigate('/study')}
              className={`p-4 rounded-lg flex items-center ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-purple-900 text-purple-200'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                S
              </div>
              <span className="ml-3">Study Mode</span>
            </button>

            <button
              onClick={() => navigate('/questions')}
              className={`p-4 rounded-lg flex items-center ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-green-900 text-green-200'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                B
              </div>
              <span className="ml-3">Browse Questions</span>
            </button>
          </div>
        </div>
      </div>

      <FloatingButton to="/questions/add" darkMode={isDarkMode} />
    </div>
  );
};

export default Dashboard;