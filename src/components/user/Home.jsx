import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Header'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
function Home() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user)
    console.log("user: ", user)
    const handleStartReading = () => {
      if(user){
        navigate('/list-blog')
      }else{
          toast.error("Please Login First!")
      }
    }
    
  return (
    <div className="relative min-h-screen">
    {/* Background Pattern */}
    <div
  className="absolute inset-0 bg-no-repeat bg-left"
  style={{
    backgroundImage: "url('/assets/1.png')",
    backgroundSize: "cover", // Make sure the image covers the whole area
    backgroundPosition: "center", // Center the image
    opacity: 0.4,
  }}
/>
{/* <nav className=" relative flex items-center justify-between px-16 py-6 z-10">
    <div className="text-2xl font-bold bg-gradient-to-r from-[#403D39] to-[#EB5E28] bg-clip-text text-transparent">
      SPOTLIGHT.
    </div>
    <div className="flex items-center gap-6">
      <button className="text-gray-700 hover:text-secondary">Write</button>
      <button className="text-gray-700 hover:text-secondary"
        onClick={() => navigate('/login')}
      >Sign in</button>
      <button className="px-4 py-2 bg-primary text-fifth rounded-full hover:bg-primaryhover">Get Started</button>
    </div>
  </nav> */}

  <Navbar/>

    {/* Content */}
    <div className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
      <div className="max-w-2xl">
        <h1 className="text-6xl font-bold text-secondary tracking-tight leading-tight mb-6">
          SHARE IDEAS,
          <br />
          SPARK
          <br />
          CURIOSITY.
        </h1>
        <p className="text-xl text-gray-600 mb-8">A place to read, write, and deepen your understanding</p>
        <button className="px-8 py-3 bg-primary text-white rounded-full text-lg hover:bg-primaryhover transition-colors"
        onClick={handleStartReading}
        >

          Start Reading
        </button>
      </div>
    </div>
  </div>
  )
}

export default Home