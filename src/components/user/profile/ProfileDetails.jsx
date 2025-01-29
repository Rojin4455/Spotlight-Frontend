import React from 'react'
import UserBlogs from './UserBlogs';
import { useSelector } from 'react-redux';

const ProfileDetails = ({ activeSection }) => {
    const user = useSelector((state) => state.user.user)
    const renderContent = () => {
      switch (activeSection) {
        case 'profile':
  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg">
      

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Username</h3>
          <p className="text-lg font-medium text-gray-800">{user.username}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Email</h3>
          <p className="text-lg font-medium text-gray-800">{user.email}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg col-span-2">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Bio</h3>
          <p className="text-gray-700">
            Creative developer and passionate writer exploring the intersection of technology and storytelling.
          </p>
        </div>
      </div>
    </div>
  );
        case 'blogs':
          return <UserBlogs/>;
        case 'saved':
          return <div>Saved Posts Content</div>;
        case 'analytics':
          return <div>Analytics Content</div>;
        case 'settings':
          return <div>Settings Content</div>;
        default:
          return null;
      }
    };
  
    return (
      <div className="flex-1 p-6 bg-gray-50">
        {renderContent()}
      </div>
    );
  };

export default ProfileDetails