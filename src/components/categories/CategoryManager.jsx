import React, { useState } from 'react';
import { PlusIcon, TrashIcon, EditIcon, FolderIcon, SaveIcon, XIcon } from 'lucide-react';

const CategoryManager = ({
  darkMode,
  categories,
  subCategories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onAddSubCategory,
  onUpdateSubCategory,
  countsLoaded,
  onDeleteSubCategory
}) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [editingSubCategoryId, setEditingSubCategoryId] = useState(null);
  const [editingSubCategoryName, setEditingSubCategoryName] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName('');
    }
  };

  // Update the count display to show loading state if counts aren't loaded yet
  const renderCount = (count) => (
    <span
      className={`ml-3 px-2 py-1 text-xs rounded-full ${
        darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
      }`}
    >
      {countsLoaded ? `${count} questions` : 'Loading...'}
    </span>
  );

  const handleEditCategory = (id, name) => {
    setEditingCategoryId(id);
    setEditingCategoryName(name);
  };

  const handleSaveCategory = () => {
    if (editingCategoryId && editingCategoryName.trim()) {
      onUpdateCategory(editingCategoryId, editingCategoryName.trim());
      setEditingCategoryId(null);
      setEditingCategoryName('');
    }
  };

  const handleCancelEditCategory = () => {
    setEditingCategoryId(null);
    setEditingCategoryName('');
  };

  const handleAddSubCategory = (e, categoryId) => {
    e.preventDefault();
    if (newSubCategoryName.trim()) {
      onAddSubCategory(categoryId, newSubCategoryName.trim());
      setNewSubCategoryName('');
    }
  };

  const handleEditSubCategory = (id, name) => {
    setEditingSubCategoryId(id);
    setEditingSubCategoryName(name);
  };

  const handleSaveSubCategory = () => {
    if (editingSubCategoryId && editingSubCategoryName.trim()) {
      onUpdateSubCategory(editingSubCategoryId, editingSubCategoryName.trim());
      setEditingSubCategoryId(null);
      setEditingSubCategoryName('');
    }
  };

  const handleCancelEditSubCategory = () => {
    setEditingSubCategoryId(null);
    setEditingSubCategoryName('');
  };

  const toggleCategoryExpansion = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Category */}
      <div className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
        <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Add New Category
        </h2>
        <form onSubmit={handleAddCategory} className="flex">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name"
            className={`flex-grow px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 ${
              darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
            } border`}
            required
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-r-lg flex items-center ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <PlusIcon size={18} className="mr-2" /> Add
          </button>
        </form>
        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Add categories relevant to your job industry or interview focus areas
        </p>
      </div>

      {/* Your Categories */}
      <div className={`rounded-xl shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-6`}>
        <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Your Categories
        </h2>
        {categories.length === 0 ? (
          <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No categories yet. Add your first category above.
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className={`rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                {/* Category Header */}
                <div
                  className={`p-4 flex justify-between items-center ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  } rounded-t-lg`}
                >
                  {editingCategoryId === category.id ? (
                    <div className="flex flex-grow">
                      <input
                        type="text"
                        value={editingCategoryName}
                        onChange={(e) => setEditingCategoryName(e.target.value)}
                        className={`flex-grow px-3 py-1 rounded-lg focus:outline-none focus:ring-2 ${
                          darkMode
                            ? 'bg-gray-600 text-white border-gray-500 focus:ring-blue-500'
                            : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                        } border`}
                        required
                      />
                      <button
                        onClick={handleSaveCategory}
                        className={`ml-2 p-1 rounded-full ${
                          darkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-600'
                        }`}
                      >
                        <SaveIcon size={18} />
                      </button>
                      <button
                        onClick={handleCancelEditCategory}
                        className={`ml-2 p-1 rounded-full ${
                          darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        <XIcon size={18} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleCategoryExpansion(category.id)}
                          className={`mr-3 p-1 rounded-full ${
                            darkMode ? 'bg-gray-600 text-blue-300' : 'bg-blue-100 text-blue-600'
                          }`}
                        >
                          <FolderIcon size={18} />
                        </button>
                        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {category.name}
                        </h3>
                        <span
                          className={`ml-3 px-2 py-1 text-xs rounded-full ${
                            darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {renderCount(category.count || 0)}
                        </span>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => handleEditCategory(category.id, category.name)}
                          className={`p-1 rounded-full ${
                            darkMode
                              ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          <EditIcon size={18} />
                        </button>
                        <button
                          onClick={() => onDeleteCategory(category.id)}
                          className={`ml-2 p-1 rounded-full ${
                            darkMode ? 'bg-red-900 text-red-300 hover:bg-red-800' : 'bg-red-100 text-red-600 hover:bg-red-200'
                          }`}
                        >
                          <TrashIcon size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Subcategories (Expanded View) */}
                {expandedCategory === category.id && (
                  <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h4 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Subcategories
                    </h4>
                    <div className="space-y-3">
                      {subCategories
                        .filter((sub) => sub.categoryId === category.id)
                        .map((subCategory) => (
                          <div
                            key={subCategory.id}
                            className={`p-3 rounded-lg flex justify-between items-center ${
                              darkMode ? 'bg-gray-700' : 'bg-gray-50'
                            }`}
                          >
                            {editingSubCategoryId === subCategory.id ? (
                              <div className="flex flex-grow">
                                <input
                                  type="text"
                                  value={editingSubCategoryName}
                                  onChange={(e) => setEditingSubCategoryName(e.target.value)}
                                  className={`flex-grow px-3 py-1 rounded-lg focus:outline-none focus:ring-2 ${
                                    darkMode
                                      ? 'bg-gray-600 text-white border-gray-500 focus:ring-blue-500'
                                      : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                                  } border`}
                                  required
                                />
                                <button
                                  onClick={handleSaveSubCategory}
                                  className={`ml-2 p-1 rounded-full ${
                                    darkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-600'
                                  }`}
                                >
                                  <SaveIcon size={16} />
                                </button>
                                <button
                                  onClick={handleCancelEditSubCategory}
                                  className={`ml-2 p-1 rounded-full ${
                                    darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                                  }`}
                                >
                                  <XIcon size={16} />
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center">
                                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {subCategory.name}
                                  </span>
                                  <span
                                    className={`ml-3 px-2 py-1 text-xs rounded-full ${
                                      darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                                    }`}
                                  >
                                    {renderCount(subCategory.count || 0)}
                                  </span>
                                </div>
                                <div className="flex">
                                  <button
                                    onClick={() => handleEditSubCategory(subCategory.id, subCategory.name)}
                                    className={`p-1 rounded-full ${
                                      darkMode
                                        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                    }`}
                                  >
                                    <EditIcon size={16} />
                                  </button>
                                  <button
                                    onClick={() => onDeleteSubCategory(subCategory.id)}
                                    className={`ml-2 p-1 rounded-full ${
                                      darkMode
                                        ? 'bg-red-900 text-red-300 hover:bg-red-800'
                                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                                    }`}
                                  >
                                    <TrashIcon size={16} />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}

                      {/* Add Subcategory Input */}
                      <form onSubmit={(e) => handleAddSubCategory(e, category.id)} className="flex mt-4">
                        <input
                          type="text"
                          value={newSubCategoryName}
                          onChange={(e) => setNewSubCategoryName(e.target.value)}
                          placeholder="New subcategory"
                          className={`flex-grow px-3 py-2 rounded-l-lg focus:outline-none focus:ring-2 text-sm ${
                            darkMode
                              ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                              : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                          } border`}
                          required
                        />
                        <button
                          type="submit"
                          className={`px-3 py-2 rounded-r-lg flex items-center text-sm ${
                            darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          <PlusIcon size={16} className="mr-1" /> Add
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;