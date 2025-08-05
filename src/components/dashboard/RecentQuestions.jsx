import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, StarIcon } from 'lucide-react';
import { useQuestions } from '../../utils/QuestionsContext';

const RecentQuestions = ({ darkMode, questions }) => {
  const { categories, subCategories } = useQuestions();

  const renderDifficulty = (difficulty) => {
    return Array(5).fill(0).map((_, i) => (
      <StarIcon
        key={i}
        size={16}
        className={`${i < difficulty
            ? 'text-yellow-400 fill-yellow-400'
            : darkMode
              ? 'text-gray-600'
              : 'text-gray-300'
          }`}
      />
    ));
  };

  // Helper function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId; // Fallback to ID if not found
  };

  // Helper function to get subcategory name by ID
  const getSubCategoryName = (subCategoryId) => {
    const subCategory = subCategories.find(s => s.id === subCategoryId);
    return subCategory ? subCategory.name : subCategoryId; // Fallback to ID if not found
  };



  return (
    <div
      className={`rounded-xl shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border p-6`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'
            }`}
        >
          Recent Questions
        </h2>
        <Link
          to="/questions"
          className={`flex items-center text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
            }`}
        >
          View all <ArrowRightIcon size={16} className="ml-1" />
        </Link>
      </div>
      <div className="space-y-4">
        {questions.slice(0, 5).map((question) => (
          <Link
            key={question.id}
            to={`/questions/${question.id}`}
            className={`block p-4 rounded-lg transition-colors duration-200 ${darkMode
                ? 'hover:bg-gray-700 border-gray-700'
                : 'hover:bg-gray-50 border-gray-100'
              } border`}
          >
            <div className="flex justify-between">
              <h3
                className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'
                  }`}
              >
                {question.title}
              </h3>
              <div className="flex">{renderDifficulty(question.difficulty)}</div>
            </div>
            <div className="flex mt-2 justify-between">
              <div className="flex space-x-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
                    }`}
                >
                  {getCategoryName(question.category)}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}
                >
                  {getSubCategoryName(question.subCategory)}
                </span>
              </div>
              <span
                className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
              >
                Last reviewed:{' '}
                {new Date(question.lastReviewed).toLocaleDateString()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentQuestions;