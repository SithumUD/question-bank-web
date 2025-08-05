import React from 'react';
import { useParams } from 'react-router-dom';
import QuestionForm from '../components/questions/QuestionForm';
import { questions, categories, subCategories } from '../utils/data';

const AddEditQuestion = () => {
  const { id } = useParams();
  const isDarkMode = document.documentElement.classList.contains('dark');
  const isEditMode = !!id;
  const questionId = parseInt(id || '0');
  const question = questions.find((q) => q.id === questionId);

  return (
    <QuestionForm
      darkMode={isDarkMode}
      editMode={isEditMode}
      initialQuestion={question}
      categories={categories}
      subCategories={subCategories}
    />
  );
};

export default AddEditQuestion;