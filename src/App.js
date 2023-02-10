import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Home from './components/Home';
import { Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Compose from './components/Compose';

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
         <Route 
         path="/compose"
         element={isLoggedIn ? <Compose /> : <Navigate to='/compose' />}
          />
          
        <Route path='/login' element={<Signup />} />
      </Routes>
    </Layout>
  );
}

export default App;
