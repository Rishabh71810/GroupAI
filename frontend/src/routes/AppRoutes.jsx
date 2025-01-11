import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import LoginPage from '../screens/Login.jsx'
import SignupPage from '../screens/Register.jsx'
import Home from '../screens/Home.jsx'
import Project from '../screens/Project.jsx'
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<SignupPage/>} />
        <Route path="/logout" element={<div>Logout</div>} />
        <Route path="/project" element={<Project/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
