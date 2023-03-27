import React from 'react';
import { Home, Register, Login } from "./components"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthUser from './components/auth/AuthUser';
import './App.css';

const App = () => {

  const { user } = AuthUser();

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          { user && <Route path='/home' element={<Home/>}/> }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
