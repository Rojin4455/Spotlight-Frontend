import { Activity, BookOpen, Heart, Settings, User } from 'lucide-react';
import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';


const ProfileSidebar = ({ activeSection, setActiveSection }) => {
    const user = useSelector((state) => state.user.user)

    const sidebarItems = [
      { 
        icon: <User size={20} />, 
        label: 'Profile', 
        section: 'profile' 
      },
      { 
        icon: <BookOpen size={20} />, 
        label: 'My Blogs', 
        section: 'blogs' 
      },
      { 
        icon: <Heart size={20} />, 
        label: 'Saved Posts', 
        section: 'saved' 
      },
      { 
        icon: <Activity size={20} />, 
        label: 'Analytics', 
        section: 'analytics' 
      },
      { 
        icon: <Settings size={20} />, 
        label: 'Settings', 
        section: 'settings' 
      }
    ];
  
    return (
      <div className="w-64 bg-white border-r border-gray-200 p-4 h-full">
        <div className="mb-6 text-center">
            
        <FaUserCircle size={75} className="w-24 h-24 rounded-full text-primaryhover mx-auto mb-4 object-cover border-4 border-primary/20" />
          {/* <img 
            src="/api/placeholder/150/150" 
            alt="Profile" 
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
          /> */}
          <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
  
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.section}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeSection === item.section 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection(item.section)}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    );
  };

export default ProfileSidebar