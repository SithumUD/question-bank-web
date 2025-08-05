import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, CheckCircleIcon } from 'lucide-react';
import { useQuestions } from '../../utils/QuestionsContext';

const QuestionList = ({ darkMode, questions, activeFilters, sortField, sortDirection }) => {
  const { categories, subCategories } = useQuestions();

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

  const filteredQuestions = questions.filter((question) => {
    if (activeFilters.category && 
        activeFilters.category !== 'all' && 
        question.category !== activeFilters.category && 
        question.subCategory !== activeFilters.category) {
      return false;
    }

    if (activeFilters.difficulty > 0 && question.difficulty !== activeFilters.difficulty) {
      return false;
    }

    if (activeFilters.searchTerm &&
        !question.title.toLowerCase().includes(activeFilters.searchTerm.toLowerCase()) &&
        !question.tags.some(tag => tag.toLowerCase().includes(activeFilters.searchTerm.toLowerCase()))) {
      return false;
    }

    if (activeFilters.dateRange) {
      const lastReviewed = new Date(question.lastReviewed);
      const now = new Date();

      if (activeFilters.dateRange === 'today') {
        if (lastReviewed.getDate() !== now.getDate() || 
            lastReviewed.getMonth() !== now.getMonth() || 
            lastReviewed.getFullYear() !== now.getFullYear()) {
          return false;
        }
      } else if (activeFilters.dateRange === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        if (lastReviewed < weekAgo) {
          return false;
        }
      } else if (activeFilters.dateRange === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        if (lastReviewed < monthAgo) {
          return false;
        }
      } else if (activeFilters.dateRange === 'quarter') {
        const quarterAgo = new Date();
        quarterAgo.setMonth(now.getMonth() - 3);
        if (lastReviewed < quarterAgo) {
          return false;
        }
      } else if (activeFilters.dateRange === 'year') {
        const yearAgo = new Date();
        yearAgo.setFullYear(now.getFullYear() - 1);
        if (lastReviewed < yearAgo) {
          return false;
        }
      }
    }

    if (activeFilters.mastered) {
      if ((activeFilters.mastered === 'mastered' && !question.mastered) ||
          (activeFilters.mastered === 'not-mastered' && question.mastered)) {
        return false;
      }
    }

    return true;
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortField === 'title') {
      return sortDirection === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortField === 'difficulty') {
      return sortDirection === 'asc'
        ? a.difficulty - b.difficulty
        : b.difficulty - a.difficulty;
    } else if (sortField === 'lastReviewed') {
      return sortDirection === 'asc'
        ? new Date(a.lastReviewed).getTime() - new Date(b.lastReviewed).getTime()
        : new Date(b.lastReviewed).getTime() - new Date(a.lastReviewed).getTime();
    }
    return 0;
  });

  const renderDifficulty = (difficulty) => {
    return Array(5).fill(0).map((_, i) => (
      <StarIcon
        key={i}
        size={14}
        className={`${
          i < difficulty
            ? 'text-yellow-400 fill-yellow-400'
            : darkMode
            ? 'text-gray-600'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div
      className={`rounded-xl shadow-sm overflow-hidden ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
    >
      <div
        className={`grid grid-cols-12 gap-4 p-4 ${
          darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-600'
        } border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
      >
        <div className="col-span-5">
          <span className="font-medium">Question</span>
        </div>
        <div className="col-span-2">
          <span>Category</span>
        </div>
        <div className="col-span-2">
          <span>Difficulty</span>
        </div>
        <div className="col-span-2">
          <span>Last Reviewed</span>
        </div>
        <div className="col-span-1">
          <span>Status</span>
        </div>
      </div>

      <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
        {sortedQuestions.map((question) => (
          <Link
            key={question.id}
            to={`/questions/${question.id}`}
            className={`grid grid-cols-12 gap-4 p-4 transition-colors ${
              darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-50 text-gray-800'
            }`}
          >
            <div className="col-span-5">
              <h3 className="font-medium">{question.title}</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {question.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                {question.tags.length > 3 && (
                  <span
                    className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    +{question.tags.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-2 flex flex-col gap-1.5">
              <span
                className={`inline-flex items-center px-2 py-1 text-xs rounded-lg w-fit ${
                  darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
                }`}
              >
                {getCategoryName(question.category)}
              </span>
              <span
                className={`inline-flex items-center px-2 py-1 text-xs rounded-lg w-fit ${
                  darkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                {getSubCategoryName(question.subCategory)}
              </span>
            </div>

            <div className="col-span-2 flex items-center">
              <div className="flex">{renderDifficulty(question.difficulty)}</div>
            </div>

            <div className="col-span-2 flex items-center">
              <span
                className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {new Date(question.lastReviewed).toLocaleDateString()}
              </span>
            </div>

            <div className="col-span-1 flex items-center justify-center">
              {question.mastered ? (
                <div className="relative group">
                  <CheckCircleIcon
                    size={20}
                    className="text-green-500 fill-green-500"
                  />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    Mastered
                  </span>
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              )}
            </div>
          </Link>
        ))}

        {sortedQuestions.length === 0 && (
          <div
            className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            No questions match your filters. Try adjusting your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionList;