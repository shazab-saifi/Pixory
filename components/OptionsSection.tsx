'use client'

import React from 'react'
import Button from './Button'
import { useOptionsToggle } from '@/lib/store'

const OptionsSection = () => {
    const {currentOption, setToPhotos, setToVideos} = useOptionsToggle();

    return (
        <div className='w-full px-20 md:py-8 py-6 space-x-4 flex justify-center'>
            <Button
                onClick={setToPhotos}
                size='lg'
                variant={currentOption === 'photos' ? 'primary' : 'secondary'}
                className='rounded-full px-5 py-2'
            >
                Photos
            </Button>
            <Button
                onClick={setToVideos}
                size='lg'
                variant={currentOption === 'videos' ? 'primary' : 'secondary'}
                className='rounded-full px-5 py-2'
            >
                Videos
            </Button>
        </div>
    )
}

export default OptionsSection