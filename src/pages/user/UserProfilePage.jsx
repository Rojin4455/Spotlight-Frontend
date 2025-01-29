import React, { useState } from 'react';
import { User, Settings, Activity, BookOpen, Heart, Share2 } from 'lucide-react';
import Navbar from '../../components/user/Header';
import ProfileSidebar from '../../components/user/profile/ProfileSidebar';
import ProfileDetails from '../../components/user/profile/ProfileDetails';


function UserProfilePage() {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <>
    <Navbar/>
    
    <div className="min-h-screen bg-white flex">
        
      <ProfileSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <ProfileDetails activeSection={activeSection} />
    </div>
    </>
  );
}

export default UserProfilePage;