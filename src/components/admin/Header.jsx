import React,{useState} from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { clearContent } from '../../slices/AdminContent';
import { clearUser } from '../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axiosConfig';

const Header = () => {
    const {userName} = useSelector((state)=> state.user)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const navigate = useNavigate()
    const closeModal = () => setIsModalOpen(false);
    const dispatch = useDispatch()
  
    const handleLogout = async () => {
      try{
          const response = await axiosInstance.post('accounts/logout/')
          if (response.status === 200) {
              console.log("response")
              dispatch(clearUser())
              dispatch(clearContent())
              navigate('/admin/login')
              
              closeModal();
  
          }else{
              console.log("error response: ", response)
          }
      }catch(error){
          console.log(error)
  
      }
    };



  return (
    <header className="bg-gradient-to-r from-third to-secondary text-fifth py-2 px-3 flex justify-between items-center shadow-md">
              <nav className="flex items-center justify-between px-16 py-6">
      <div className="text-2xl font-bold bg-gradient-to-r from-fifth to-[#EB5E28] bg-clip-text text-transparent">
      SPOTLIGHT.
    </div>
      </nav>
      <div className="flex items-center gap-4">
        <p className="text-sm">Welcome, <span className="font-semibold">{userName}</span></p>
        <FaUserCircle className="text-3xl cursor-pointer hover:text-gray-200 transition duration-200" 
        onClick={openModal}
        />
      </div>



      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center animate-spring justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 ">
            <h2 className="text-lg font-bold mb-4 text-black">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-primary hover:bg-primaryhover text-white py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
