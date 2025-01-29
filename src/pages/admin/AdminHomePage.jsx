import React from 'react'
import Header from '../../components/admin/Header';
import Content from '../../components/admin/Content';
import AdminSideBar from '../../components/admin/AdminSideBar';

function AdminHomePage() {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <div className="flex flex-grow">
      <AdminSideBar/>
      <main className="flex-grow bg-gray-50">
        <Content/>
      </main>
    </div>
  </div>
  )
}

export default AdminHomePage