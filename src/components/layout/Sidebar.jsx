import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  BookOpenIcon, 
  BrainIcon, 
  SettingsIcon, 
  FolderIcon, 
  BriefcaseIcon 
} from 'lucide-react';
import { getQuestions, getCategories, getJobs } from '../../utils/firebase'; // Adjust the import path as needed

const Sidebar = ({ darkMode }) => {
  const location = useLocation();
  const [questionCount, setQuestionCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [lastStudied, setLastStudied] = useState('Never');

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        // Get question count
        const questions = await getQuestions();
        setQuestionCount(questions.length);
        
        // Get most recent question's date for "last studied"
        if (questions.length > 0) {
          const sortedQuestions = [...questions].sort((a, b) => 
            new Date(b.lastReviewed) - new Date(a.lastReviewed)
          );
          setLastStudied(formatDate(new Date(sortedQuestions[0].lastReviewed)));
        }
        
        // Get category count
        const categories = await getCategories();
        setCategoryCount(categories.length);
        
        // Get job count
        const jobs = await getJobs();
        setJobCount(jobs.length);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    };

    fetchData();
    
    // You could set up real-time listeners here if needed
    // const unsubscribe = onSnapshot(...)
    // return () => unsubscribe();
  }, []);

  const formatDate = (date) => {
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <HomeIcon size={20} />,
      count: null
    },
    {
      name: 'Questions',
      path: '/questions',
      icon: <BookOpenIcon size={20} />,
      count: questionCount
    },
    {
      name: 'Study Mode',
      path: '/study',
      icon: <BrainIcon size={20} />,
      count: null
    },
    {
      name: 'Categories',
      path: '/categories',
      icon: <FolderIcon size={20} />,
      count: categoryCount
    },
    {
      name: 'Job Tracker',
      path: '/job-tracker',
      icon: <BriefcaseIcon size={20} />,
      count: jobCount
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <SettingsIcon size={20} />,
      count: null
    },
  ];

  return (
    <div
      className={`w-64 h-screen fixed left-0 top-0 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg flex flex-col transition-colors duration-200 z-10`}
    >
      <div className="p-6">
        <h1
          className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          JobPrep
        </h1>
        <p
          className={`text-sm mt-1 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          Your Personal Question Bank
        </p>
      </div>

      <nav className="flex-1 px-4 mt-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-700'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
                {item.count !== null && (
                  <span 
                    className={`px-2 py-1 text-xs rounded-full ${
                      darkMode 
                        ? 'bg-gray-700 text-gray-200' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`p-4 mt-auto border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <div
          className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          <p>{questionCount} Questions</p>
          <p className="mt-1">Last studied: {lastStudied}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;