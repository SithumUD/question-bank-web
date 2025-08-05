import React, { useState, Fragment, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuestions } from '../../utils/QuestionsContext';
import { ArrowLeftIcon, EyeIcon, CodeIcon } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const QuestionForm = ({ editMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { questions, categories, subCategories, addQuestion, updateQuestion } = useQuestions();
  const isDarkMode = document.documentElement.classList.contains('dark');
  const [previewMode, setPreviewMode] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [question, setQuestion] = useState({
    title: '',
    category: '',
    subCategory: '',
    difficulty: 2,
    question: '',
    answer: '',
    tags: [],
    mastered: false,
    lastReviewed: new Date().toISOString(),
    dateAdded: new Date().toISOString()
  });

  useEffect(() => {
    if (editMode && id) {
      const existingQuestion = questions.find(q => q.id === id);
      if (existingQuestion) {
        setQuestion(existingQuestion);
      }
    }
  }, [editMode, id, questions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDifficultyChange = (level) => {
    setQuestion(prev => ({
      ...prev,
      difficulty: level,
    }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setQuestion(prev => ({
      ...prev,
      category,
      subCategory: '',
    }));
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !question.tags.includes(tagInput.trim())) {
      setQuestion(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tag) => {
    setQuestion(prev => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagAdd();
    }
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

  const filteredSubCategories = subCategories.filter(
    (sub) => sub.categoryId === question.category
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateQuestion(id, question);
      } else {
        await addQuestion(question);
      }
      navigate('/questions');
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/questions')}
          className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <ArrowLeftIcon size={18} className="mr-2" /> Back to Questions
        </button>
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className={`flex items-center px-4 py-2 rounded-lg ${
            isDarkMode
              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {previewMode ? (
            <>
              <CodeIcon size={18} className="mr-2" /> Edit
            </>
          ) : (
            <>
              <EyeIcon size={18} className="mr-2" /> Preview
            </>
          )}
        </button>
      </div>

      <div className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-6`}>
        <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {editMode ? 'Edit Question' : 'Add New Question'}
        </h1>

        {!previewMode ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Question Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={question.title}
                onChange={handleChange}
                placeholder="e.g. Explain React hooks lifecycle"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                    : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                } border`}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="category"
                  className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={question.category}
                  onChange={handleCategoryChange}
                  className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                      : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                  } border`}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="subCategory"
                  className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Subcategory
                </label>
                <select
                  id="subCategory"
                  name="subCategory"
                  value={question.subCategory}
                  onChange={handleChange}
                  disabled={!question.category}
                  className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                      : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                  } border ${!question.category ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <option value="">Select a subcategory</option>
                  {filteredSubCategories.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Difficulty
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleDifficultyChange(level)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      level <= question.difficulty
                        ? 'bg-yellow-400 text-white'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    ★
                  </button>
                ))}
                <span
                  className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  {question.difficulty === 1 && 'Easy'}
                  {question.difficulty === 2 && 'Beginner'}
                  {question.difficulty === 3 && 'Intermediate'}
                  {question.difficulty === 4 && 'Advanced'}
                  {question.difficulty === 5 && 'Expert'}
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="question"
                className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Question Text
              </label>
              <textarea
                id="question"
                name="question"
                value={question.question}
                onChange={handleChange}
                rows={4}
                placeholder="Enter your question here..."
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                    : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                } border`}
                required
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="answer"
                className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Answer
              </label>
              <div
                className={`mb-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                Use Markdown for formatting. Code blocks: ```language
                <br />
                code here```
              </div>
              <textarea
                id="answer"
                name="answer"
                value={question.answer}
                onChange={handleChange}
                rows={10}
                placeholder="Enter the detailed answer here..."
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                    : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                } border font-mono`}
                required
              ></textarea>
            </div>

            <div>
              <label
                className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`flex items-center px-3 py-1 text-sm rounded-full ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="ml-2 text-xs rounded-full w-4 h-4 flex items-center justify-center hover:bg-gray-400 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Add a tag (press Enter)"
                  className={`flex-grow px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                      : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                  } border`}
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  className={`px-4 py-2 rounded-r-lg ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/questions')}
                className={`px-6 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {editMode ? 'Update Question' : 'Add Question'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {question.title || 'Question Title'}
              </h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {question.category && (
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      isDarkMode
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {categories.find((c) => c.id === question.category)?.name ||
                      question.category}
                  </span>
                )}
                {question.subCategory && (
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {subCategories.find((s) => s.id === question.subCategory)
                      ?.name || question.subCategory}
                  </span>
                )}
                {question.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs rounded-full ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center mt-4">
                <div
                  className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  <span className="font-medium">Difficulty:</span>{' '}
                  <span className="ml-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < question.difficulty
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }
                        >
                          ★
                        </span>
                      ))}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <h3
                className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
              >
                Question:
              </h3>
              <p
                className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {question.question || 'Question text will appear here...'}
              </p>
            </div>

            <div>
              <h3
                className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
              >
                Answer:
              </h3>
              <div
                className={`mt-4 prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}
              >
                {question.answer ? (
                  answerParts.map((part, index) => (
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
                  ))
                ) : (
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Answer will appear here...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;