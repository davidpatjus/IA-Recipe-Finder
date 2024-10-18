import { Heart, Home } from "lucide-react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <>
      <DesktopSideBar />
      <MobileSideBar />
    </>
  )
}

export default SideBar;

const DesktopSideBar = () => {
  return (
  <>
    <div className="p-3 md:p-10 border-r min-h-screen w-24 md:w-64 hidden sm:block bg-white">
      <div className="flex flex-col gap-20 sticky top-10 left-0">
        <div className="w-full border-b pb-6">
          <img src="/logo.svg" alt="logo" className="hidden md:block" />
          <img src="/logo.svg" alt="logo" className="md:hidden block" />
        </div>
        <ul className="flex flex-col items-center md:items-start gap-8">
          <Link to={"/"} className="flex gap-3">
            <Home color="black" />
            <span className="font-bold hidden md:block text-black">Inicio</span>
          </Link>
          <Link to={"/favorites"} className="flex gap-3">
            <Heart color="black" />
            <span className="font-bold hidden md:block text-black">Favoritos</span>
          </Link>
        </ul>
      </div>
    </div>
  </>
  )
  
}

const MobileSideBar = () => {
  return (
    <>
      <div className="flex justify-center gap-10 border-t fixed w-full bottom-0 left-0 bg-white z-10 p-2 sm:hidden">
        
        <Link to={'/'}>
        <Home size={"24"} className="cursor-pointer"/>
        </Link>
        
        <Link to={'/favorites'}>
        <Heart size={"24"} className="cursor-pointer"/>
        </Link>
      
      </div>
    </>
  )
}