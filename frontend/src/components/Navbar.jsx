import React from 'react'
import {Link} from 'react-router-dom'
import Dashboard from '../pages/Dashboard';

import { Home, BookOpen, Calendar, Users, ClipboardList } from 'lucide-react';

const Navbar = () => {
  return (

    <div className="bg-white shadow-md p-4">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo/Home Link */}
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-semibold">TimeTable</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link 
            to="/subjects" 
            className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
          >
            <BookOpen className="h-5 w-5" />
            <span>Subjects</span>
          </Link>
          
          <Link 
            to="/teachers/create" 
            className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
          >
            <Users className="h-5 w-5" />
            <span>Teachers</span>
          </Link>
          
          <Link 
            to="/schedule" 
            className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
          >
            <Calendar className="h-5 w-5" />
            <span>Schedule</span>
          </Link>
          
          <Link 
            to="/render-charts" 
            className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
          >
            <ClipboardList className="h-5 w-5" />
            <span>Charts</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar
