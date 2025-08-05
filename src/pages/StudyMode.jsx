import React, { useState, useEffect } from 'react';
import Flashcard from '../components/study/Flashcard';
import QuizMode from '../components/study/QuizMode';
import { BookOpenIcon, BrainIcon } from 'lucide-react';
import { useQuestions } from '../utils/QuestionsContext';

const StudyMode = () => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const [mode, setMode] = useState('flashcard');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownQuestions, setKnownQuestions] = useState([]);
  const [unknownQuestions, setUnknownQuestions] = useState([]);
  const { questions, loading, error } = useQuestions();

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleMarkKnown = (id) => {
    if (!knownQuestions.includes(id)) {
      setKnownQuestions([...knownQuestions, id]);
    }
    if (unknownQuestions.includes(id)) {
      setUnknownQuestions(unknownQuestions.filter((qId) => qId !== id));
    }
    handleNext();
  };

  const handleMarkUnknown = (id) => {
    if (!unknownQuestions.includes(id)) {
      setUnknownQuestions([...unknownQuestions, id]);
    }
    if (knownQuestions.includes(id)) {
      setKnownQuestions(knownQuestions.filter((qId) => qId !== id));
    }
    handleNext();
  };

  // Reset index when questions change
  useEffect(() => {
    setCurrentIndex(0);
  }, [questions]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-900/20 text-red-300' : 'bg-red-100 text-red-700'}`}>
        Error loading questions: {error}
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
        No questions available. Please add some questions first.
      </div>
    );
  }

  return (
    <div>
      <h1
        className={`text-3xl font-bold mb-8 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}
      >
        Study Mode
      </h1>

      <div className="mb-8 flex justify-center">
        <div
          className={`inline-flex rounded-md ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          } p-1`}
        >
          <button
            onClick={() => setMode('flashcard')}
            className={`px-4 py-2 rounded-md flex items-center ${
              mode === 'flashcard'
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-white shadow-sm text-gray-800'
                : isDarkMode
                ? 'text-gray-400 hover:text-gray-200'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BookOpenIcon size={18} className="mr-2" /> Flashcards
          </button>
          <button
            onClick={() => setMode('quiz')}
            className={`px-4 py-2 rounded-md flex items-center ${
              mode === 'quiz'
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-white shadow-sm text-gray-800'
                : isDarkMode
                ? 'text-gray-400 hover:text-gray-200'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BrainIcon size={18} className="mr-2" /> Quiz Mode
          </button>
        </div>
      </div>

      <div
        className={`rounded-xl shadow-sm ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border p-6`}
      >
        {mode === 'flashcard' ? (
          <Flashcard
            darkMode={isDarkMode}
            questions={questions}
            currentIndex={currentIndex}
            onNext={handleNext}
            onPrev={handlePrev}
            onMarkKnown={handleMarkKnown}
            onMarkUnknown={handleMarkUnknown}
          />
        ) : (
          <QuizMode 
            darkMode={isDarkMode} 
            questions={questions} 
            onMarkKnown={handleMarkKnown}
            onMarkUnknown={handleMarkUnknown}
          />
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress */}
        <div
          className={`rounded-xl shadow-sm ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border p-4`}
        >
          <h3
            className={`font-medium mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Progress
          </h3>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${(knownQuestions.length / questions.length) * 100}%`,
              }}
            ></div>
          </div>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {knownQuestions.length} of {questions.length} mastered
          </p>
        </div>

        {/* Known */}
        <div
          className={`rounded-xl shadow-sm ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border p-4`}
        >
          <h3
            className={`font-medium mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Known
          </h3>
          <div
            className={`text-2xl font-bold ${
              isDarkMode ? 'text-green-400' : 'text-green-500'
            }`}
          >
            {knownQuestions.length}
          </div>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Questions marked as known
          </p>
        </div>

        {/* Need Review */}
        <div
          className={`rounded-xl shadow-sm ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border p-4`}
        >
          <h3
            className={`font-medium mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Need Review
          </h3>
          <div
            className={`text-2xl font-bold ${
              isDarkMode ? 'text-red-400' : 'text-red-500'
            }`}
          >
            {unknownQuestions.length}
          </div>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Questions to review again
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudyMode;