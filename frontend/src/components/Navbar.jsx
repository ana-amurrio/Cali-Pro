import {Menu, X} from "lucide-react"
import { useState } from "react";
import logo from '../assets/logo.png'
export default  function Navbar({handleWhyUs, handleWorkFlowRef, handleReviewsRef, handleInterestRef}){

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  }

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm ">
        <div className="flex justify-between items-center">
          {/* logo */}
          <div className="flex items-center flex-shrink-0">
            <img className='h-10 w-10 mr-2' src={logo} alt=""/>
            <span className='text-xl tracking-tight'>Cali Pro</span>
          </div>
          {/* Nav links... show this when it's a large screen */}
          <ul className="hidden lg:flex ml-14 space-x-12">
              <button onClick={handleWhyUs}>Why Us</button>
              <button onClick={handleWorkFlowRef}>Workflow</button>
              <button onClick={handleReviewsRef}>Testimonials</button>
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <button onClick={handleInterestRef} className="bg-gradient-to-r from-purple-500 to-purple-800 py-2 px-3 rounded-md">Contact Us</button>
          </div>
          {/* if large screen, hide. this is the navbar for phones*/}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X/> : <Menu/>}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              <li><button className="py-4" onClick={() => {handleWhyUs(); toggleNavbar();}}>Why Us</button></li>
              <li><button className="py-4" onClick={() => {handleWorkFlowRef(); toggleNavbar();}}>Workflow</button></li>
              <li><button className="py-4" onClick={() => {handleReviewsRef(); toggleNavbar();}}>Testimonials</button></li>
            </ul>
            <div className="py-4 flex space-x-6">
              <button  
              className="py-2 px-3 rounded-md bg-gradient-to-r from-purple-500 to-purple-800"
              onClick={() => { 
                handleInterestRef(); 
                toggleNavbar();
              }}
              >Concast Us</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
