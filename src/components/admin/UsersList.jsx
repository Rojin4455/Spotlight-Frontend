import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/axiosConfig';
import { FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { setContent } from '../../slices/AdminContent';
import UserDetails from './UserDetails';
import UserBlogDetails from './UserBlogDetails';


function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const {subContent, userId} = useSelector((state)=> state.adminContent)


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('accounts/get-users/');
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.error("Something went wrong", response);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchUsers();
  }, []);

  const handleBlockUser = async (userId, currentStatus) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`accounts/toggle-user-status/${userId}/`);
      if (response.status === 200) {
        setUsers(users.map(user => 
          user.id === userId 
            ? { ...user, is_active: !currentStatus }
            : user
        ));
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
    } finally {
      setLoading(false);
    }
  };

  if (subContent === 'user-details'){
    return (
        <UserDetails userId={userId}/>
    )
  }

  if(subContent === 'blog-details'){

    return <UserBlogDetails/>
  
    }
  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Username</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Action</th>
              <th className="border p-2 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded-full text-sm border ${
                    user.is_active ? 'bg-green-100 text-green-800 border-green-800' : 'bg-red-100 text-red-800 border-red-800'
                  }`}>
                    {user.is_active ? 'Active' : 'Blocked'}
                  </span>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleBlockUser(user.id, user.is_active)}
                    disabled={loading}
                    className={`px-3 py-1 rounded text-sm ${
                      user.is_active 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    } disabled:opacity-50`}
                  >
                    {user.is_active ? 'Block' : 'Unblock'}
                  </button>
                </td>
                <td className='border p-2'>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary bg-fifth rounded-lg hover:bg-primaryhover hover:text-fifth transition-all"
                onClick={() => {dispatch(setContent({subContent:'user-details', userId:user.id, user:user}))}}
                >
      <FiEye className="text-lg" />
      View Details
    </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;