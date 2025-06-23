'use client'

import clsx from 'clsx';
import { ChevronDown, LogOut, User } from 'lucide-react';
import React, { useState } from 'react'

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div
          className="relative"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Dropdown Trigger */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-700 font-medium">Account</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          <div className={`absolute right-0 top-full w-48 pt-2 transition-all duration-200 transform origin-top-right ${isOpen
              ? 'opacity-100 scale-100 visible'
              : 'opacity-0 scale-95 invisible'
            }`}>
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="py-1">
                {/* Profile Option */}
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  <User className="w-4 h-4 mr-3 text-gray-500" />
                  Profile
                </a>

                {/* Logout Option */}
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  <LogOut className="w-4 h-4 mr-3 text-gray-500" />
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page