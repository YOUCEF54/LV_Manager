
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import netlogo from '/desktopicon.png';

import { useState,useEffect } from 'react';
import './index.css';

import { Outlet } from 'react-router-dom';  // Import Outlet


import Nav from './components/layout/Nav.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';

function App() {

  const [loading, setLoading] = useState(true);  // Step 1: Track loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);  // Step 2: Stop loading after a delay
    }, 2000);  // Adjust delay as needed (2 seconds here)

    return () => clearTimeout(timer);  // Cleanup timeout on unmount
  }, []);

  if (loading) {
    return <div className='w-screen h-screen flex items-center fixed bg-primary'>
      {/* <img
      src={netlogo}
      height={150}
      width={150}
      className='m-auto animate-pulse'

      /> */}
    </div>;  // Step 3: Show loading screen if still loading
  }


  const MainLayout = () => (
      <Nav>
      <Outlet /> 
      </Nav>
        );
  

  
  return (
    <div className="App bg-neutral-300 h-screen">
      <BrowserRouter>
        <Routes>
        
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
           
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
