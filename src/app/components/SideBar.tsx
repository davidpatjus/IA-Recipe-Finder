"use client"
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Heart, Home, Bot, ChefHat } from "lucide-react";
import Link from "next/link";

function SideBar() {
  return (
    <>
      <DesktopSideBar />
      <MobileSideBar />
    </>
  );
}

export default SideBar;

const DesktopSideBar = () => {
  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-green-100 to-white border-r min-h-screen w-24 md:w-64 hidden sm:block">
      <div className="flex flex-col gap-16 sticky top-10 left-0">
        <div className="w-full pb-6 border-b border-gray-300">
          <Link href={"/"} >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <ChefHat className="h-8 w-8 text-green-600" />
              <span className="text-[14px] font-bold text-green-700">IA-RECIPE-FINDER</span>
            </motion.div>
          </Link>
        </div>
        <ul className="flex flex-col items-center md:items-start gap-8">
          <Link href={"/dashboard"} className="flex items-center gap-3 group">
            <Home className="text-green-700 group-hover:text-green-500 transition-colors duration-300" />
            <span className="font-semibold text-gray-800 hidden md:block group-hover:text-green-600 transition-colors duration-300">
              Inicio
            </span>
          </Link>
          <Link href={"/dashboard/favorites"} className="flex items-center gap-3 group">
            <Heart className="text-green-700 group-hover:text-green-500 transition-colors duration-300" />
            <span className="font-semibold text-gray-800 hidden md:block group-hover:text-green-600 transition-colors duration-300">
              Favoritos
            </span>
          </Link>
          <Link href={"/dashboard/chat"} className="flex items-center gap-3 group">
            <Bot className="text-green-700 group-hover:text-green-500 transition-colors duration-300" />
            <span className="font-semibold text-gray-800 hidden md:block group-hover:text-green-600 transition-colors duration-300">
              ChatBot
            </span>
          </Link>
          <UserButton />
        </ul>
      </div>
    </div>
  );
};

const MobileSideBar = () => {
  return (
    <div className="flex justify-evenly items-center gap-8 border-t bg-white shadow-lg fixed w-full bottom-0 left-0 z-10 p-3 sm:hidden">
      <Link href={"/dashboard"}>
        <Home size={28} className="text-green-700 hover:text-green-500 transition-colors duration-300" />
      </Link>
      <Link href={"/dashboard/favorites"}>
        <Heart size={28} className="text-green-700 hover:text-green-500 transition-colors duration-300" />
      </Link>
      <Link href={"/dashboard/chat"}>
        <Bot size={28} className="text-green-700 hover:text-green-500 transition-colors duration-300" />
      </Link>
    </div>
  );
};
