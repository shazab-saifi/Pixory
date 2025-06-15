'use client'

import Dropdown from './Dropdown'
import Button from './Button'
import { Search } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

const SearchInput = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const router = useRouter();

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    } 

    const handleOnClick = () => {
        router.push(`/search?query=${inputValue}`);
    }

    return (
        <div className="w-full inline-flex items-center rounded-xl justify-between bg-white shadow-md">
            <Dropdown />
            <input
                value={inputValue}
                onChange={handleInput}
                type="text"
                placeholder="Search for free photos"
                className="py-2 outline-none sm:flex-1 w-[180px]"
            />
            <Button
                variant="secondary"
                onClick={handleOnClick}
                className="shadow-none flex items-center px-4"
            >
                <Search size={18} className="opacity-80 hover:opacity-50" />
            </Button>
        </div>
    )
}

export default SearchInput