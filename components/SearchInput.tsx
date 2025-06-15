'use client'

import Dropdown from './Dropdown'
import Button from './Button'
import { Search } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const SearchInput = ({
    className,
    inputClassName
}: {
    className?: string;
    inputClassName?: string
}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const router = useRouter();

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    } 

    const handleOnClick = () => {
        router.push(`/search?query=${inputValue}`);
    }

    return (
        <div className={cn("w-full inline-flex items-center rounded-xl justify-between bg-white shadow-md", className)}>
            <Dropdown />
            <input
                value={inputValue}
                onChange={handleInput}
                type="text"
                placeholder="Search for free photos"
                className={cn("py-2 outline-none sm:flex-1 w-[180px]", inputClassName)}
            />
            <Button
                variant="secondary"
                onClick={handleOnClick}
                className="shadow-none flex items-center m-1 ml-2"
            >
                <Search size={18} className="opacity-80" />
            </Button>
        </div>
    )
}

export default SearchInput