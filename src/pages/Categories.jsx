import React, { useState, useEffect } from 'react';
import CategoryManager from '../components/categories/CategoryManager';
import { 
  getCategories as firebaseGetCategories,
  getSubCategories as firebaseGetSubCategories,
  addCategory as firebaseAddCategory,
  updateCategory as firebaseUpdateCategory,
  deleteCategory as firebaseDeleteCategory,
  addSubCategory as firebaseAddSubCategory,
  updateSubCategory as firebaseUpdateSubCategory,
  deleteSubCategory as firebaseDeleteSubCategory,
  getQuestionCountByCategory,
  getQuestionCountBySubCategory
} from '../utils/firebase';

const Categories = () => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countsLoaded, setCountsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, subCategoriesData] = await Promise.all([
          firebaseGetCategories(),
          firebaseGetSubCategories()
        ]);
        
        setCategories(categoriesData);
        setSubCategories(subCategoriesData);
        setLoading(false);
        
        // Load counts after initial data is loaded
        loadQuestionCounts(categoriesData, subCategoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadQuestionCounts = async (cats, subs) => {
    try {
      // Load category counts
      const categoriesWithCounts = await Promise.all(cats.map(async (cat) => {
        const count = await getQuestionCountByCategory(cat.id);
        return { ...cat, count };
      }));
      
      // Load subcategory counts
      const subCategoriesWithCounts = await Promise.all(subs.map(async (sub) => {
        const count = await getQuestionCountBySubCategory(sub.id);
        return { ...sub, count };
      }));
      
      setCategories(categoriesWithCounts);
      setSubCategories(subCategoriesWithCounts);
      setCountsLoaded(true);
    } catch (error) {
      console.error("Error loading question counts:", error);
    }
  };

  // Category CRUD operations
  const handleAddCategory = async (name) => {
    try {
      const newCategory = await firebaseAddCategory(name);
      // Initialize with count 0
      setCategories([...categories, { ...newCategory, count: 0 }]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleUpdateCategory = async (id, name) => {
    try {
      await firebaseUpdateCategory(id, name);
      setCategories(
        categories.map((category) =>
          category.id === id ? { ...category, name } : category
        )
      );
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      // First delete all subcategories
      const subsToDelete = subCategories.filter(sub => sub.categoryId === id);
      await Promise.all(subsToDelete.map(sub => firebaseDeleteSubCategory(sub.id)));
      
      // Then delete the category
      await firebaseDeleteCategory(id);
      
      // Update state
      setCategories(categories.filter(category => category.id !== id));
      setSubCategories(subCategories.filter(sub => sub.categoryId !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // SubCategory CRUD operations
  const handleAddSubCategory = async (categoryId, name) => {
    try {
      const newSubCategory = await firebaseAddSubCategory(categoryId, name);
      // Initialize with count 0
      setSubCategories([...subCategories, { ...newSubCategory, count: 0 }]);
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  const handleUpdateSubCategory = async (id, name) => {
    try {
      await firebaseUpdateSubCategory(id, name);
      setSubCategories(
        subCategories.map((subCategory) =>
          subCategory.id === id ? { ...subCategory, name } : subCategory
        )
      );
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  const handleDeleteSubCategory = async (id) => {
    try {
      await firebaseDeleteSubCategory(id);
      setSubCategories(subCategories.filter(subCategory => subCategory.id !== id));
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-64 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Loading categories...
      </div>
    );
  }

  return (
    <div>
      <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Categories Management
      </h1>
      <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Organize your questions by creating categories relevant to your industry
        and job role
      </p>
      <CategoryManager
        darkMode={isDarkMode}
        categories={categories}
        subCategories={subCategories}
        countsLoaded={countsLoaded}
        onAddCategory={handleAddCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
        onAddSubCategory={handleAddSubCategory}
        onUpdateSubCategory={handleUpdateSubCategory}
        onDeleteSubCategory={handleDeleteSubCategory}
      />
    </div>
  );
};

export default Categories;