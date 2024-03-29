import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Home from './scenes/home/home'
import Login from './scenes/login/login'
import Dashboard from './scenes/dashboard/dashboard';
import Expenses from './scenes/expenses/expenses';

function App() {

  const { user } = useSelector(state => state.userReducer);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/expense-tracker-demo-serverless' element={<Home />}/>
          <Route path='/login' element={user === null ? <Login /> : <Navigate to="/expense" replace={true} />}/>
          {/* <Route path='/dashboard' element={user === null ? <Navigate to="/login" replace={true} /> : <Dashboard />}/> */}
          <Route path='/expense' element={user === null ? <Navigate to="/login" replace={true} /> : <Expenses />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
