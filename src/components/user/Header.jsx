import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, PenSquare, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../axios/axiosConfig';
import { toast } from 'sonner';
import { persistor } from '../../store';
import { clearUser } from '../../slices/userSlice';
import { IoIosArrowForward } from "react-icons/io";




export default function Navbar() {
  const navigate = useNavigate();
  //   const { user, logout } = useAuth();
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  const [userModal, setUserModal] = useState(false)


  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('accounts/logout/')
      if (response.status === 200) {
        
        dispatch(clearUser())
        navigate('/')
        toast.success("User Signout Successfully!")
      }
    } catch {
      toast.error("something went wrong!d")
    }
  };



  return (
    <nav className="relative flex items-center justify-between px-16 py-6 z-10">
      <div
        className="text-2xl font-bold bg-gradient-to-r from-[#403D39] to-[#EB5E28] bg-clip-text text-transparent cursor-pointer"
        onClick={() => navigate('/')}
      >
        SPOTLIGHT.
      </div>

      <div className="flex items-center gap-6">
        {user ? (
          // Logged in user navbar
          <>
            <button
              className="flex items-center gap-2 text-gray-700 hover:text-secondary"
              onClick={() => navigate('/write-blog')}
            >
              <PenSquare size={20} />
              Write
            </button>

            <button
              className="text-gray-700 hover:text-secondary relative"
              onClick={() => navigate('/notifications')}
            >
              <Bell size={20} />
              {/* Notification badge - show if there are unread notifications */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <div className="relative">
              <button className="flex items-center gap-2 cursor-pointer"
                onClick={() => setUserModal(!userModal)}
              >
                <User size={23} />
              </button>
              {userModal && (
                <div className=" absolute right-0 mt-2 w-56">
                  <div className="bg-white rounded-lg shadow-lg transition-all duration-200 border">
                    <div className="py-2">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={20} className="text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {user.name || user.username}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {/* Dropdown Menu Items */}
                      <div className="py-1">
                        <button
                          className="w-full px-1 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center justify-between transition-colors duration-200"
                          onClick={() => navigate(`/profile`)}
                        >
                          {/* Left Section */}
                          <div className="flex items-center gap-2 pl-3">
                            <User size={16} className="text-gray-500" />
                            <span>Profile</span>
                          </div>

                          {/* Right Section */}
                          <IoIosArrowForward className="text-gray-500" />
                        </button>

                        <button
                          className="w-full px-1 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center justify-between transition-colors duration-200"
                          onClick={() => navigate('/settings')}
                        >
                          <div className="flex items-center gap-2 pl-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-500"
                          >
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          <span>Settings</span>
                          </div>
                         <IoIosArrowForward className="text-gray-500" />
                          
                        </button>
                      </div>

                      {/* Logout Section */}
                      <div className="border-t border-gray-100 py-1">
                        <button
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors duration-200"
                          onClick={() => {
                            // setUserDropdownVisible(false);
                            handleLogout();
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-red-500"
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" x2="9" y1="12" y2="12" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}




            </div>
          </>
        ) : (
          // Visitor navbar
          <>
            <button
              className="text-gray-700 hover:text-secondary"
              onClick={() => toast.error("Please Login First!")}
            >
              Write
            </button>
            <button
              className="text-gray-700 hover:text-secondary"
              onClick={() => navigate('/login')}
            >
              Sign in
            </button>
            <button
              className="px-4 py-2 bg-primary text-fifth rounded-full hover:bg-primaryhover"
              onClick={() => navigate('/register')}
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
}