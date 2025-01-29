import React, { useState } from 'react';
import BlogListHeader from '../../components/user/BlogListHeader';
import BlogList from '../../components/user/BlogList';
import Navbar from '../../components/user/Header';




function BlogListPage() {

  return (
    <>
    <Navbar/>

    <div className="max-w-screen-xl mx-auto px-20">
        {/* <BlogListHeader/> */}
        <BlogList/>
    </div>
    </>
  )
}

export default BlogListPage