import React, { useState, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuestions } from '../../utils/QuestionsContext';
import { ArrowLeftIcon, EditIcon, TrashIcon, CheckIcon, HistoryIcon, CodeIcon } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const QuestionDetail = () => {
  const { id } = useParams();
  const { questions, deleteQuestion, updateQuestion, categories, subCategories } = useQuestions();
  const isDarkMode = document.documentElement.classList.contains('dark');
  const [activeTab, setActiveTab] = useState('answer');

  const question = questions.find(q => q.id === id);
  const relatedQuestions = questions.filter(q => 
    question?.relatedQuestions?.includes(q.id)
  ) || [];

  if (!question) {
    return (
      <div className={`h-64 flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Question not found
      </div>
    );
  }

  // Helper function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId; // Fallback to ID if not found
  };

  // Helper function to get subcategory name by ID
  const getSubCategoryName = (subCategoryId) => {
    const subCategory = subCategories.find(s => s.id === subCategoryId);
    return subCategory ? subCategory.name : subCategoryId; // Fallback to ID if not found
  };

  const processAnswer = (text) => {
    const codeBlockRegex = /```([\w-]+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    const parts = [];
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index),
        });
      }

      parts.push({
        type: 'code',
        language: match[1] || 'plaintext',
        content: match[2].trim(),
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex),
      });
    }

    return parts;
  };

  const answerParts = processAnswer(question.answer);

  const renderDifficulty = (difficulty) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < difficulty ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      await deleteQuestion(question.id);
      window.location.href = '/questions';
    }
  };

  const toggleMastered = async () => {
    const updatedQuestion = {
      ...question,
      mastered: !question.mastered,
      lastReviewed: new Date().toISOString()
    };
    
    try {
      await updateQuestion(question.id, updatedQuestion);
    } catch (err) {
      console.error('Error updating question:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link
          to="/questions"
          className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <ArrowLeftIcon size={18} className="mr-2" /> Back to Questions
        </Link>
      </div>

      <div className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-6`}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {question.title}
            </h1>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className={`px-2 py-1 text-xs rounded-full ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>
                {getCategoryName(question.category)}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                {getSubCategoryName(question.subCategory)}
              </span>
              {question.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 text-xs rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center mt-4 space-x-4">
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="font-medium">Difficulty:</span>{' '}
                <span className="ml-1">{renderDifficulty(question.difficulty)}</span>
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="font-medium">Added:</span>{' '}
                <span className="ml-1">
                  {new Date(question.dateAdded).toLocaleDateString()}
                </span>
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="font-medium">Last reviewed:</span>{' '}
                <span className="ml-1">
                  {new Date(question.lastReviewed).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Link
              to={`/questions/edit/${question.id}`}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <EditIcon size={18} />
            </Link>
            <button
              onClick={handleDelete}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <TrashIcon size={18} />
            </button>
            <button
              onClick={toggleMastered}
              className={`p-2 rounded-full ${
                question.mastered
                  ? isDarkMode
                    ? 'bg-green-800 text-green-200'
                    : 'bg-green-100 text-green-600'
                  : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <CheckIcon size={18} />
            </button>
          </div>
        </div>

        <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h2 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Question:
          </h2>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {question.question}
          </p>
        </div>

        <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab('answer')}
              className={`pb-4 px-1 flex items-center ${
                activeTab === 'answer'
                  ? isDarkMode
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'border-b-2 border-blue-600 text-blue-600'
                  : isDarkMode
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <CodeIcon size={18} className="mr-2" /> Answer
            </button>
          </div>
        </div>

        <div className="mt-6">
          {activeTab === 'answer' && (
            <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
              {answerParts.map((part, index) => (
                <Fragment key={index}>
                  {part.type === 'text' ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: part.content.replace(/\n/g, '<br />'),
                      }}
                    />
                  ) : (
                    <div className="my-4">
                      <SyntaxHighlighter
                        language={part.language}
                        style={isDarkMode ? atomOneDark : docco}
                        className="rounded-md"
                      >
                        {part.content}
                      </SyntaxHighlighter>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {question.editHistory?.map((history, index) => (
                <div key={index} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {history.description}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(history.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      className={`text-sm ${
                        isDarkMode
                          ? 'text-blue-400 hover:text-blue-300'
                          : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      View Changes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {relatedQuestions.length > 0 && (
        <div className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-6`}>
          <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Related Questions
          </h2>
          <div className="space-y-3">
            {relatedQuestions.map((relatedQuestion) => (
              <Link
                key={relatedQuestion.id}
                to={`/questions/${relatedQuestion.id}`}
                className={`block p-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-700 border-gray-700'
                    : 'hover:bg-gray-50 border-gray-100'
                } border`}
              >
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {relatedQuestion.title}
                </h3>
                <div className="flex mt-2 justify-between">
                  <div className="flex space-x-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>
                      {relatedQuestion.category}
                    </span>
                  </div>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <span
                        key={i}
                        className={i < relatedQuestion.difficulty ? 'text-yellow-400' : 'text-gray-300'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;