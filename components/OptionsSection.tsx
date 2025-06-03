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
                variant={currentOption === 'photos' ? 'primary' : 'secondary'}
                className='rounded-2xl'
            >
                Photos
            </Button>
            <Button
                onClick={setToVideos}
                variant={currentOption === 'videos' ? 'primary' : 'secondary'}
                className='rounded-2xl'
            >
                Videos
            </Button>
        </div>
    )
}

export default OptionsSection