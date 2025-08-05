import React from 'react';
import { CheckCircleIcon, PlusCircleIcon, BookOpenIcon, BarChart2Icon } from 'lucide-react';

const StatsCard = ({ darkMode, stats }) => {
  const cards = [
    {
      title: 'Total Questions',
      value: stats.totalQuestions,
      icon: <BookOpenIcon size={24} className={`${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />,
      color: darkMode ? 'bg-gray-800' : 'bg-white',
      textColor: darkMode ? 'text-white' : 'text-gray-800',
    },
    {
      title: 'Mastered',
      value: stats.masteredQuestions,
      icon: <CheckCircleIcon size={24} className={`${darkMode ? 'text-green-400' : 'text-green-500'}`} />,
      color: darkMode ? 'bg-gray-800' : 'bg-white',
      textColor: darkMode ? 'text-white' : 'text-gray-800',
    },
    {
      title: 'Recently Added',
      value: stats.recentlyAdded,
      icon: <PlusCircleIcon size={24} className={`${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />,
      color: darkMode ? 'bg-gray-800' : 'bg-white',
      textColor: darkMode ? 'text-white' : 'text-gray-800',
    },
    {
      title: 'Studied This Week',
      value: stats.studiedThisWeek,
      icon: <BarChart2Icon size={24} className={`${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />,
      color: darkMode ? 'bg-gray-800' : 'bg-white',
      textColor: darkMode ? 'text-white' : 'text-gray-800',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} rounded-xl shadow-sm p-6 transition-transform duration-200 hover:transform hover:scale-105 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3
              className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {card.title}
            </h3>
            {card.icon}
          </div>
          <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;