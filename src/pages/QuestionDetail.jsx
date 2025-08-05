import React from 'react';
import { useParams } from 'react-router-dom';
import QuestionDetailComponent from '../components/questions/QuestionDetail';
import { useQuestions } from '../utils/QuestionsContext';

const QuestionDetail = () => {
  const { id } = useParams(); // id is always a string from URL params
  const { questions } = useQuestions();
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  // Find question by string ID (no need to parse to number)
  const question = questions.find((q) => q.id === id);

  if (!question) {
    return (
      <div className={`h-64 flex items-center justify-center ${
        isDarkMode ? 'text-white' : 'text-gray-800'
      }`}>
        Question not found
      </div>
    );
  }

  const relatedQuestions = questions.filter((q) =>
    question.relatedQuestions?.includes(q.id)
  );

  return (
    <QuestionDetailComponent
      darkMode={isDarkMode}
      question={question}
      relatedQuestions={relatedQuestions}
    />
  );
};

export default QuestionDetail;