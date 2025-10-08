import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage'; 


const SettingsPage = () => <div className="details-section"><h2>Settings</h2><p> ediot and upload the settings page .</p></div>;
const SigninPage = () => <div className="details-section"><h2>Sign In</h2><p>Authentication form will be here.</p></div>;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;