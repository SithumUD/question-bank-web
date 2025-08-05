import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getQuestions,
  getCategories,
  getSubCategories,
  getTags,
  addQuestion as firebaseAddQuestion,
  updateQuestion as firebaseUpdateQuestion,
  deleteQuestion as firebaseDeleteQuestion
} from './firebase';

const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [questionsData, categoriesData, subCategoriesData, tagsData] = await Promise.all([
        getQuestions(),
        getCategories(),
        getSubCategories(),
        getTags()
      ]);
      setQuestions(questionsData);
      setCategories(categoriesData);
      setSubCategories(subCategoriesData);
      setTags(tagsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = async (question) => {
    try {
      const id = await firebaseAddQuestion(question);
      setQuestions(prev => [...prev, { ...question, id }]);
      return id;
    } catch (err) {
      throw err;
    }
  };

  const updateQuestion = async (id, question) => {
    try {
      await firebaseUpdateQuestion(id, question);
      setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...question } : q));
    } catch (err) {
      throw err;
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await firebaseDeleteQuestion(id);
      setQuestions(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        categories,
        subCategories,
        tags,
        loading,
        error,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        refresh: fetchData
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
};