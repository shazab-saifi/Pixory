"use client"

import { Images, CirclePlay, ChevronDown } from "lucide-react";
import { useState } from "react";

const Dropdown = () => {
    const [dropdownItem, setDropdownItem] = useState('photo');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            // onClick={() => setIsOpen(prev => !prev)}
            className="flex flex-col relative"
        >
            <button className="inline-flex rounded-l-xl items-center p-4 bg-white hover:bg-gray-50 hover:opacity-70 gap-2">
                {dropdownItem === 'photo' ?
                    <div className='flex items-center gap-2'>
                        <Images
                            size={18}
                            className="opacity-80"
                        />
                        <span className="hidden md:block">Photos</span>
                    </div>
                    :
                    <div className='flex items-center gap-2'>
                        <CirclePlay
                            size={18}
                            className="opacity-80"
                        />
                        <span className="hidden md:block">Videos</span>
                    </div>
                }
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <div className="w-[120px] md:w-full pt-2 absolute top-full">
                <div className={`transition-all duration-300 bg-white shadow-md rounded-lg ${isOpen ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-90"}`}>
                    <div
                        className='w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 rounded-lg'
                        onClick={() => setDropdownItem('photo')}
                    >
                        <Images
                            size={18}
                            className="opacity-80"
                        />
                        <span>Photos</span>
                    </div>
                    <div
                        className='w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 hover:text-green-500 rounded-lg'
                        onClick={() => setDropdownItem('Play')}
                    >
                        <CirclePlay
                            size={18}
                            className="opacity-80"
                        />
                        <span>Videos</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown