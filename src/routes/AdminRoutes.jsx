import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLoginPage from '../pages/admin/AdminLoginPage'
import AdminHomePage from '../pages/admin/AdminHomePage'
import AdminProtectedRoute from './AdminProtectedRoutes'


function AdminRoutes() {
  return (
    <Routes>
        <Route path='login/' element={<AdminLoginPage/>} />
        <Route path='home/' element={<AdminProtectedRoute><AdminHomePage/></AdminProtectedRoute>} />

    </Routes>
  )
}

export default AdminRoutes