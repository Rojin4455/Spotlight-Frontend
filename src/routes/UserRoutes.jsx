import React from "react";
import {Route, Routes} from 'react-router-dom'
import UserProtectedRoute from "./UserProtectedRoutes";
import HomePage from "../pages/user/HomePage";
import LoginPage from "../pages/user/LoginPage";
import SignUpPage from "../pages/user/SignupPage";
import BlogListPage from "../pages/user/BlogListPage";
import CreateBlogPage from "../pages/user/CreateBlogPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import BlogDetailsPage from "../pages/user/BlogDetailsPage";



function UserRoutes() {
    return (
<Routes>
    <Route path={"/"} element={<HomePage/>}/>
    <Route path={'/login'} element={<LoginPage/>} />
    <Route path={'/signup'} element={<SignUpPage/>} />
    <Route path={'/list-blog'} element={<UserProtectedRoute><BlogListPage/></UserProtectedRoute>} />
    <Route path={'/write-blog'} element={<UserProtectedRoute><CreateBlogPage/></UserProtectedRoute>} />
    <Route  path={'/profile'} element={<UserProtectedRoute><UserProfilePage/></UserProtectedRoute>}/>
    <Route  path={'/blog-details'} element={<UserProtectedRoute><BlogDetailsPage/></UserProtectedRoute>}/>
</Routes>
    )

}

export default UserRoutes