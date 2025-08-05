import React from 'react';
import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingButton = ({ to, darkMode }) => {
  return (
    <Link
      to={to}
      className={`fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 transform hover:scale-110 ${
        darkMode
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
    >
      <PlusIcon size={24} />
    </Link>
  );
};

export default FloatingButton;