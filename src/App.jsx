import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Questions from './pages/Questions';
import QuestionDetail from './pages/QuestionDetail';
import AddEditQuestion from './pages/AddEditQuestion';
import StudyMode from './pages/StudyMode';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import JobTracker from './pages/JobTracker';
import { QuestionsProvider } from './utils/QuestionsContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`w-full min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Router>
        <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
          <QuestionsProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/questions/:id" element={<QuestionDetail />} />
            <Route path="/questions/add" element={<AddEditQuestion />} />
            <Route path="/questions/edit/:id" element={<AddEditQuestion />} />
            <Route path="/study" element={<StudyMode />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/job-tracker" element={<JobTracker />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          </QuestionsProvider>
        </Layout>
      </Router>
    </div>
  );
}

export default App;