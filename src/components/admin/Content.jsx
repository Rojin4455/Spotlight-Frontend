import React from 'react';
import { useSelector } from 'react-redux';
import UsersList from './UsersList';
import UserDetails from './UserDetails';

const Content = ({ selectedOption }) => {
    const contentName = useSelector((state)=> state.adminContent.contentName)

  const renderContent = () => {
    switch (contentName) {
        case 'users':
            return <UsersList/>
        case 'blogs':
            return <div className="text-xl font-bold text-gray-700">blogs</div>

        case 'settings':
                return <h2 className="text-xl font-bold text-gray-700">Settings Section</h2>;        
        // case 'user-details':
        //         return <UserDetails/>;
    
      default:
        return <h2 className="text-xl font-bold text-gray-700">Select an option from the sidebar.</h2>;
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default Content;
