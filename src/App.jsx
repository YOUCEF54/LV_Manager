import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';

import { Outlet } from 'react-router-dom'; // Import Outlet
import Nav from './components/layout/Nav.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contrats from './pages/Contrats.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import Login from './routes/Login.jsx';

// Define a simple NotFound component
const NotFound = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100">
    <h1 className="text-4xl font-bold text-red-500">404</h1>
    <p className="text-lg text-gray-600">Page Not Found</p>
    <a
      href="/"
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Go Back Home
    </a>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after a delay
    }, 2000); // Adjust delay as needed (2 seconds here)

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center fixed bg-primary">
        {/* Add a loading indicator here if needed */}
      </div>
    ); // Show loading screen if still loading
  }

  const MainLayout = () => (
    <Sidebar>
      <Outlet /> {/* This will render the matched child route */}
    </Sidebar>
  );

  const NoSidebarLayout = ({ children }) => (
    <>{children}</>
  );

  return (
    <div className="App bg-neutral-300 h-screen overflow-auto">
      <BrowserRouter>
        <Routes>
            <Route path="login" element={<NoSidebarLayout><Login /></NoSidebarLayout>} />
            <Route path="/" element={<NoSidebarLayout><Home /></NoSidebarLayout>} />
            <Route element={<MainLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/contrats" element={<Contrats />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
