import { useState } from 'react'
import Home from '../pages/home'
import Login from '../pages/login';
import Register from '../pages/register';
import Dashboard from '../pages/UserDashboard';
import { ReactDOM} from 'react'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route index element={ <Home /> }/>
      <Route path='/login' element={ <Login /> }/>
      <Route path='/register' element={ <Register /> }/>
      <Route path='/dashboard' element={ <Dashboard /> }/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


