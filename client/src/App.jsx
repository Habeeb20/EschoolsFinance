import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';


// Navigate is used for protected routes

import Home from './pages/Home';
import Navbar from './component/Navbar';
import Login from './pages/Login';
import Sigup from './pages/signup';

function App() {

  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/signup' element={!user ? <Sigup /> : <Navigate to='/' />} />
            
          
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
