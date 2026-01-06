"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  return (
    <nav className="bg-white shadow-lg  flex items-center justify-between">
      {/* Logo */}
      <img src="images/logo.png" alt="DoFlow Logo" className="w-16 h-16"/>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 mx-1 text-black font-bold text-sm">
        <li className="hover:text-blue-500 cursor-pointer" onClick={()=> router.push("/dashboard")}>Dashboard</li>
        <li className="hover:text-blue-500 cursor-pointer"  onClick={()=> router.push("/projects")}>Projects</li>
         <li className="hover:text-blue-500 cursor-pointer">Create Task</li>
        <li className="hover:text-blue-500 cursor-pointer">Teams</li>
        <li className="hover:text-blue-500 cursor-pointer">Settings</li>
      </ul>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white flex flex-col gap-4 p-4 md:hidden shadow-lg">
          <li className="hover:text-blue-500 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-500 cursor-pointer">Projects</li>
          <li className="hover:text-blue-500 cursor-pointer">Teams</li>
          <li className="hover:text-blue-500 cursor-pointer">Settings</li>
        </ul>
      )}
    </nav>
  );
}
