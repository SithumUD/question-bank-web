import React, { useState } from 'react';
import { useQuestions } from '../utils/QuestionsContext';
import QuestionList from '../components/questions/QuestionList';
import FilterSidebar from '../components/questions/FilterSidebar';
import FloatingButton from '../components/ui/FloatingButton';
import { SlidersIcon, ArrowDownAZIcon, ArrowUpAZIcon, CalendarIcon, StarIcon } from 'lucide-react';

const Questions = () => {
  const { questions, categories, subCategories, tags } = useQuestions();
  const isDarkMode = document.documentElement.classList.contains('dark');
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    difficulty: 0,
    searchTerm: '',
    dateRange: '',
    mastered: '',
  });
  const [sortField, setSortField] = useState('lastReviewed');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div>
      <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Your Interview Question Bank
      </h1>
      <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Browse and filter your saved interview questions
      </p>

      {/* Sort options for desktop */}
      <div className="hidden md:flex justify-between items-center mb-6">
        <div className="flex items-center">
          <span className={`mr-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Sort by:
          </span>
          <div className="flex space-x-2">
            <SortButton
              label="Title"
              field="title"
              currentField={sortField}
              direction={sortDirection}
              onClick={() => handleSort('title')}
              darkMode={isDarkMode}
            />
            <SortButton
              label="Difficulty"
              field="difficulty"
              currentField={sortField}
              direction={sortDirection}
              onClick={() => handleSort('difficulty')}
              darkMode={isDarkMode}
            />
            <SortButton
              label="Last Reviewed"
              field="lastReviewed"
              currentField={sortField}
              direction={sortDirection}
              onClick={() => handleSort('lastReviewed')}
              darkMode={isDarkMode}
            />
          </div>
        </div>

        {/* Mobile filter toggle */}
        <button
          className="md:hidden flex items-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <SlidersIcon size={18} className="mr-2" />
          Filters
        </button>
      </div>

      {/* Mobile sort options */}
      <div className="md:hidden flex flex-wrap gap-2 mb-4">
        <span className={`w-full ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Sort by:
        </span>
        <SortButton
          label="Title"
          field="title"
          currentField={sortField}
          direction={sortDirection}
          onClick={() => handleSort('title')}
          darkMode={isDarkMode}
          mobile={true}
        />
        <SortButton
          label="Difficulty"
          field="difficulty"
          currentField={sortField}
          direction={sortDirection}
          onClick={() => handleSort('difficulty')}
          darkMode={isDarkMode}
          mobile={true}
        />
        <SortButton
          label="Last Reviewed"
          field="lastReviewed"
          currentField={sortField}
          direction={sortDirection}
          onClick={() => handleSort('lastReviewed')}
          darkMode={isDarkMode}
          mobile={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter sidebar - desktop always visible, mobile conditional */}
        <div className={`lg:col-span-1 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
          <FilterSidebar
            darkMode={isDarkMode}
            categories={categories}
            subCategories={subCategories}
            tags={tags}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
        </div>

        <div className="lg:col-span-3">
          <QuestionList
            darkMode={isDarkMode}
            questions={questions}
            activeFilters={activeFilters}
            sortField={sortField}
            sortDirection={sortDirection}
          />
        </div>
      </div>

      <FloatingButton to="/questions/add" darkMode={isDarkMode} />
    </div>
  );
};

const SortButton = ({
  label,
  field,
  currentField,
  direction,
  onClick,
  darkMode,
  mobile = false,
}) => {
  const isActive = currentField === field;
  let icon = null;

  if (field === 'title') {
    icon =
      isActive && direction === 'asc' ? (
        <ArrowDownAZIcon size={16} />
      ) : (
        <ArrowUpAZIcon size={16} />
      );
  } else if (field === 'difficulty') {
    icon = <StarIcon size={16} />;
  } else if (field === 'lastReviewed') {
    icon = <CalendarIcon size={16} />;
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-lg ${
        mobile ? 'text-xs' : 'text-sm'
      } transition-colors ${
        isActive
          ? darkMode
            ? 'bg-blue-600 text-white'
            : 'bg-blue-100 text-blue-700'
          : darkMode
          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {label}
      {isActive && <span className="ml-1">{direction === 'asc' ? '↑' : '↓'}</span>}
    </button>
  );
};

export default Questions;