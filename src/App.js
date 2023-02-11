import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Home from './pages/Home';
import { Navigate } from 'react-router-dom';
import Layout from './components/Layout';


function App() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Layout>
      <Routes>
        <Route
          path='/'
          exact
          element={
            isLoggedIn ? <Navigate to='/home' /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/home'
          element={isLoggedIn ? <Home /> : <Navigate to='/login' />}
        />
        <Route path='/login' element={<Signup />} />
      </Routes>
    </Layout>
  );
}

export default App;
