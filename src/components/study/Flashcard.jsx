import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, XIcon, ArrowRightIcon, ArrowLeftIcon } from 'lucide-react';
import { useQuestions } from '../../utils/QuestionsContext';

const Flashcard = ({
  darkMode,
  questions,
  currentIndex,
  onNext,
  onPrev,
  onMarkKnown,
  onMarkUnknown
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const currentQuestion = questions[currentIndex];
  const { categories, subCategories } = useQuestions();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    onNext();
  };

  const handlePrev = () => {
    setIsFlipped(false);
    onPrev();
  };

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  // Get subcategory name by ID
  const getSubCategoryName = (subCategoryId) => {
    const subCategory = subCategories.find(sub => sub.id === subCategoryId);
    return subCategory ? subCategory.name : 'Unknown Subcategory';
  };

  // Extract the first paragraph of the answer for the card
  const getAnswerPreview = (answer) => {
    const firstParagraph = answer.split('\n\n')[0];
    return firstParagraph.length > 150
      ? firstParagraph.substring(0, 150) + '...'
      : firstParagraph;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl">
        {/* Progress & Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Card {currentIndex + 1} of {questions.length}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onMarkUnknown(currentQuestion.id)}
              className={`p-2 rounded-full ${
                darkMode
                  ? 'bg-red-900 text-red-200 hover:bg-red-800'
                  : 'bg-red-100 text-red-600 hover:bg-red-200'
              }`}
            >
              <XIcon size={18} />
            </button>
            <button
              onClick={() => onMarkKnown(currentQuestion.id)}
              className={`p-2 rounded-full ${
                darkMode
                  ? 'bg-green-900 text-green-200 hover:bg-green-800'
                  : 'bg-green-100 text-green-600 hover:bg-green-200'
              }`}
            >
              <CheckIcon size={18} />
            </button>
          </div>
        </div>

        {/* Flashcard */}
        <div className="perspective-1000 w-full cursor-pointer" onClick={handleFlip}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isFlipped ? 'back' : 'front'}
              initial={{
                rotateY: isFlipped ? -90 : 90,
                opacity: 0
              }}
              animate={{
                rotateY: 0,
                opacity: 1
              }}
              exit={{
                rotateY: isFlipped ? 90 : -90,
                opacity: 0
              }}
              transition={{ duration: 0.4 }}
              className={`w-full h-96 rounded-xl shadow-lg ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border p-6 flex flex-col`}
            >
              {!isFlipped ? (
                <>
                  {/* Front Side (Question) */}
                  <div className="mb-4 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          darkMode
                            ? 'bg-blue-900 text-blue-200'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {getCategoryName(currentQuestion.category)}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {getSubCategoryName(currentQuestion.subCategory)}
                      </span>
                    </div>
                    <div className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < currentQuestion.difficulty
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }
                          >
                            ★
                          </span>
                        ))}
                    </div>
                  </div>

                  <h3
                    className={`text-xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {currentQuestion.title}
                  </h3>

                  <div
                    className={`mt-4 flex-grow overflow-auto ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {currentQuestion.question}
                  </div>

                  <div
                    className={`mt-4 text-center text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Click to reveal answer
                  </div>
                </>
              ) : (
                <>
                  {/* Back Side (Answer) */}
                  <h3
                    className={`text-xl font-bold mb-4 ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    Answer
                  </h3>

                  <div
                    className={`flex-grow overflow-auto ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {getAnswerPreview(currentQuestion.answer)}
                  </div>

                  <div
                    className={`mt-4 text-center text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Click to see question
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            } ${
              darkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            <ArrowLeftIcon size={18} className="mr-2" /> Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentIndex === questions.length - 1
                ? 'opacity-50 cursor-not-allowed'
                : ''
            } ${
              darkMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next <ArrowRightIcon size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;