import React, { useState } from 'react';
import { CheckIcon, XIcon, ArrowRightIcon } from 'lucide-react';

const QuizMode = ({ darkMode, questions, onMarkKnown, onMarkUnknown }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleMarkAnswer = (known) => {
    const questionId = questions[currentIndex].id;
    const newResults = {
      ...results,
      [questionId]: known,
    };
    setResults(newResults);

    if (known) {
      onMarkKnown(questionId);
    } else {
      onMarkUnknown(questionId);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setResults({});
    setQuizCompleted(false);
  };

  const correctAnswers = Object.values(results).filter((result) => result).length;
  const totalAnswered = Object.values(results).length;
  const percentage = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;

  if (quizCompleted) {
    return (
      <div
        className={`rounded-xl shadow-sm ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border p-6 max-w-2xl mx-auto`}
      >
        <h2
          className={`text-2xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          Quiz Completed!
        </h2>

        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            <div
              className={`absolute inset-0 rounded-full ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            ></div>
            <div
              className="absolute inset-0 rounded-full bg-blue-500"
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${
                  percentage >= 25
                    ? '100% 0%'
                    : `${50 + 50 * percentage / 25}% 0%`
                }, ${
                  percentage >= 25
                    ? percentage >= 50
                      ? '100% 100%'
                      : `100% ${percentage * 2}%`
                    : '50% 50%'
                }, ${
                  percentage >= 50
                    ? percentage >= 75
                      ? '0% 100%'
                      : `${100 - (percentage - 50) * 4}% 100%`
                    : '50% 50%'
                }, ${
                  percentage >= 75
                    ? `0% ${100 - (percentage - 75) * 4}%`
                    : '50% 50%'
                }, 50% 50%)`,
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`text-3xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                {percentage}%
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <p
            className={`text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            You got{' '}
            <span className="font-bold">{correctAnswers}</span> out of{' '}
            <span className="font-bold">{totalAnswered}</span> questions correct.
          </p>
          <p
            className={`mt-2 ${
              percentage >= 80
                ? 'text-green-500'
                : percentage >= 60
                ? 'text-yellow-500'
                : 'text-red-500'
            }`}
          >
            {percentage >= 80
              ? 'Excellent work!'
              : percentage >= 60
              ? "Good job, but there's room for improvement."
              : 'You might need more practice with these concepts.'}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={resetQuiz}
            className={`px-6 py-3 rounded-lg ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div
      className={`rounded-xl shadow-sm ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border p-6 max-w-2xl mx-auto`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          Question {currentIndex + 1} of {questions.length}
        </h2>
        <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600"
            style={{
              width: `${(currentIndex / questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h3
          className={`text-lg font-medium mb-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          {currentQuestion.title}
        </h3>
        <div
          className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}
        >
          <p
            className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {currentQuestion.question}
          </p>
        </div>
      </div>

      {!showAnswer ? (
        <div className="flex justify-center">
          <button
            onClick={handleShowAnswer}
            className={`px-6 py-3 rounded-lg ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Show Answer
          </button>
        </div>
      ) : (
        <>
          <div
            className={`p-4 rounded-lg mb-6 ${
              darkMode ? 'bg-gray-700' : 'bg-blue-50'
            }`}
          >
            <h4
              className={`text-md font-medium mb-2 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              Answer:
            </h4>
            <p
              className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {currentQuestion.answer.split('\n\n')[0]}
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleMarkAnswer(false)}
              className={`flex items-center px-6 py-3 rounded-lg ${
                darkMode
                  ? 'bg-red-900 text-white hover:bg-red-800'
                  : 'bg-red-100 text-red-600 hover:bg-red-200'
              }`}
            >
              <XIcon size={18} className="mr-2" /> Got it wrong
            </button>
            <button
              onClick={() => handleMarkAnswer(true)}
              className={`flex items-center px-6 py-3 rounded-lg ${
                darkMode
                  ? 'bg-green-900 text-white hover:bg-green-800'
                  : 'bg-green-100 text-green-600 hover:bg-green-200'
              }`}
            >
              <CheckIcon size={18} className="mr-2" /> Got it right
            </button>
          </div>
        </>
      )}

      <div className="flex justify-between items-center mt-8">
        <div
          className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {Object.keys(results).length} of {questions.length} answered
        </div>
        <button
          onClick={() => setQuizCompleted(true)}
          className={`flex items-center text-sm ${
            darkMode
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          End quiz early <ArrowRightIcon size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default QuizMode;