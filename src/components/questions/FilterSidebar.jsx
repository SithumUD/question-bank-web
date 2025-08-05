import React, { useState, useEffect } from 'react';
import { SlidersIcon, XIcon, ChevronDownIcon, ChevronUpIcon, CalendarIcon, TagIcon, CheckCircleIcon, StarIcon, FolderIcon } from 'lucide-react';
import { getQuestionCountByCategory, getQuestionCountBySubCategory } from '../../utils/firebase';

const FilterSidebar = ({
  darkMode,
  categories,
  subCategories,
  tags,
  activeFilters,
  setActiveFilters
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    difficulty: true,
    dateRange: true,
    mastered: true,
    tags: true
  });
  const [categoryCounts, setCategoryCounts] = useState({});
  const [subCategoryCounts, setSubCategoryCounts] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(true);

  // Fetch counts when categories or subcategories change
  useEffect(() => {
    const fetchCounts = async () => {
      setLoadingCounts(true);
      
      // Fetch category counts
      const newCategoryCounts = {};
      for (const category of categories) {
        newCategoryCounts[category.id] = await getQuestionCountByCategory(category.id);
      }
      setCategoryCounts(newCategoryCounts);
      
      // Fetch subcategory counts
      const newSubCategoryCounts = {};
      for (const subCategory of subCategories) {
        newSubCategoryCounts[subCategory.id] = await getQuestionCountBySubCategory(subCategory.id);
      }
      setSubCategoryCounts(newSubCategoryCounts);
      
      setLoadingCounts(false);
    };

    if (categories.length > 0 || subCategories.length > 0) {
      fetchCounts();
    }
  }, [categories, subCategories]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category) => {
    setActiveFilters(prev => ({
      ...prev,
      category
    }));
  };

  const handleDifficultyChange = (difficulty) => {
    setActiveFilters(prev => ({
      ...prev,
      difficulty
    }));
  };

  const handleDateRangeChange = (range) => {
    setActiveFilters(prev => ({
      ...prev,
      dateRange: range
    }));
  };

  const handleMasteredChange = (status) => {
    setActiveFilters(prev => ({
      ...prev,
      mastered: status
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      category: '',
      difficulty: 0,
      searchTerm: '',
      dateRange: '',
      mastered: ''
    });
  };

  const handleTagClick = (tag) => {
    setActiveFilters(prev => ({
      ...prev,
      searchTerm: tag
    }));
  };

  const renderSectionHeader = (title, section, icon) => (
    <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => toggleSection(section)}>
      <div className="flex items-center">
        {icon}
        <h3 className={`text-sm font-medium ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {title}
        </h3>
      </div>
      {expandedSections[section] ? (
        <ChevronUpIcon size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
      ) : (
        <ChevronDownIcon size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
      )}
    </div>
  );

  // Calculate total question count
  const totalQuestionCount = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div
      className={`w-full rounded-xl shadow-sm ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border p-6`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <SlidersIcon size={18} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
          <h2 className={`ml-2 text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Filters
          </h2>
        </div>
        <button
          onClick={clearFilters}
          className={`flex items-center text-xs ${
            darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <XIcon size={14} className="mr-1" /> Clear all
        </button>
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div className="border-b pb-5 border-gray-700">
          {renderSectionHeader(
            'Categories',
            'categories',
            <FolderIcon size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
          )}
          {expandedSections.categories && (
            <div className="space-y-2 mt-2">
              <div
                className={`flex items-center py-2 px-3 rounded-md cursor-pointer ${
                  activeFilters.category === ''
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-700'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleCategoryChange('')}
              >
                <span>All Categories</span>
                {!loadingCounts && (
                  <span
                    className={`ml-auto text-xs ${
                      activeFilters.category === ''
                        ? darkMode
                          ? 'text-blue-200'
                          : 'text-blue-500'
                        : darkMode
                        ? 'text-gray-500'
                        : 'text-gray-500'
                    }`}
                  >
                    {totalQuestionCount}
                  </span>
                )}
              </div>
              {categories.map((category) => (
                <div key={category.id}>
                  <div
                    className={`flex items-center py-2 px-3 rounded-md cursor-pointer ${
                      activeFilters.category === category.id
                        ? darkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 text-blue-700'
                        : darkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <span>{category.name}</span>
                    {!loadingCounts && (
                      <span
                        className={`ml-auto text-xs ${
                          activeFilters.category === category.id
                            ? darkMode
                              ? 'text-blue-200'
                              : 'text-blue-500'
                            : darkMode
                            ? 'text-gray-500'
                            : 'text-gray-500'
                        }`}
                      >
                        {categoryCounts[category.id] || 0}
                      </span>
                    )}
                  </div>

                  {/* Subcategories */}
                  {(activeFilters.category === category.id || activeFilters.category === '') &&
                    subCategories
                      .filter((sub) => sub.categoryId === category.id)
                      .map((subCategory) => (
                        <div
                          key={subCategory.id}
                          className={`flex items-center py-1.5 px-3 ml-4 mt-1 rounded-md cursor-pointer text-sm ${
                            activeFilters.category === subCategory.id
                              ? darkMode
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-50 text-blue-700'
                              : darkMode
                              ? 'text-gray-300 hover:bg-gray-700'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => handleCategoryChange(subCategory.id)}
                        >
                          <span>{subCategory.name}</span>
                          {!loadingCounts && (
                            <span
                              className={`ml-auto text-xs ${
                                activeFilters.category === subCategory.id
                                  ? darkMode
                                    ? 'text-blue-200'
                                    : 'text-blue-500'
                                  : darkMode
                                  ? 'text-gray-500'
                                  : 'text-gray-500'
                              }`}
                            >
                              {subCategoryCounts[subCategory.id] || 0}
                            </span>
                          )}
                        </div>
                      ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rest of the filter sections remain the same */}
        {/* Difficulty */}
        <div className="border-b pb-5 border-gray-700">
          {renderSectionHeader(
            'Difficulty',
            'difficulty',
            <StarIcon size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
          )}
          {expandedSections.difficulty && (
            <div className="space-y-2 mt-2">
              {[0, 1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`flex items-center py-2 px-3 rounded-md cursor-pointer ${
                    activeFilters.difficulty === level
                      ? darkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-700'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => handleDifficultyChange(level)}
                >
                  <span>{level === 0 ? 'Any Difficulty' : `Level ${level}`}</span>
                  {level > 0 && (
                    <div className="ml-auto flex">
                      {Array(5).fill(0).map((_, i) => (
                        <StarIcon
                          key={i}
                          size={14}
                          className={`${i < level ? 'text-yellow-400 fill-yellow-400' : darkMode ? 'text-gray-600' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date Range */}
        <div className="border-b pb-5 border-gray-700">
          {renderSectionHeader(
            'Last Reviewed',
            'dateRange',
            <CalendarIcon size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
          )}
          {expandedSections.dateRange && (
            <div className="space-y-2 mt-2">
              {['', 'today', 'week', 'month', 'quarter', 'year'].map((range) => (
                <div
                  key={range}
                  className={`flex items-center py-2 px-3 rounded-md cursor-pointer ${
                    activeFilters.dateRange === range
                      ? darkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-700'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => handleDateRangeChange(range)}
                >
                  <span>
                    {range === '' && 'Any Time'}
                    {range === 'today' && 'Today'}
                    {range === 'week' && 'This Week'}
                    {range === 'month' && 'This Month'}
                    {range === 'quarter' && 'This Quarter'}
                    {range === 'year' && 'This Year'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mastered Status */}
        <div className="border-b pb-5 border-gray-700">
          {renderSectionHeader(
            'Status',
            'mastered',
            <CheckCircleIcon size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
          )}
          {expandedSections.mastered && (
            <div className="space-y-2 mt-2">
              {['', 'mastered', 'not-mastered'].map((status) => (
                <div
                  key={status}
                  className={`flex items-center py-2 px-3 rounded-md cursor-pointer ${
                    activeFilters.mastered === status
                      ? darkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-700'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => handleMasteredChange(status)}
                >
                  <span>
                    {status === '' && 'All Questions'}
                    {status === 'mastered' && 'Mastered'}
                    {status === 'not-mastered' && 'Not Mastered'}
                  </span>
                  {status === 'mastered' && (
                    <CheckCircleIcon size={16} className="ml-auto text-green-500 fill-green-500" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          {renderSectionHeader(
            'Popular Tags',
            'tags',
            <TagIcon size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
          )}
          {expandedSections.tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.slice(0, 15).map((tag) => (
                <span
                  key={tag.id}
                  onClick={() => handleTagClick(tag.name)}
                  className={`px-3 py-1 text-xs rounded-full cursor-pointer ${
                    activeFilters.searchTerm === tag.name
                      ? darkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag.name} ({tag.count})
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;