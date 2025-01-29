import React from 'react';
import { FaUsers, FaCog, FaChartLine, FaAddressBook, FaBlog } from 'react-icons/fa';
import { setContent } from '../../slices/AdminContent';
import { useDispatch, useSelector } from 'react-redux';

const AdminSideBar = () => {
  const options = [
    { id: 'users', label: 'Users', icon: <FaUsers /> },
    { id: 'blogs', label: 'Blogs', icon: <FaBlog /> },
    // { id: 'reports', label: 'Reports', icon: <FaChartLine /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> },

    
  ];

  const dispatch = useDispatch()

const contentName = useSelector((state)=>state.adminContent.contentName)

  return (
    <aside className=" w-64 h-full">
      <div className="py-6 px-4">
        <h2 className="text-lg font-bold text-gray-700">Navigation</h2>
        <ul className="mt-6 space-y-4">
          {options.map(option => (
            <li
              key={option.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer  transition ${contentName === option.id? `bg-primary hover:bg-primaryhover text-fifth` : "hover:bg-gray-200" } `}
              onClick={() => dispatch(setContent({contentName:option.id}))}
            >
              {option.icon}
              <span className={`text-gray-800 font-medium ${contentName === option.id? ` text-white` : "text-gray-800" }  `}>{option.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AdminSideBar;
