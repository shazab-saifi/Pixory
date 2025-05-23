'use client'

import React, { useState } from 'react'
import Button from './Button'

const OptionsSection = () => {
    const [currentOption, setCurrentOptions] = useState('photos');

    return (
        <div className='w-full px-20 md:py-8 py-6 space-x-4 flex justify-center'>
            <Button
                onClick={() => setCurrentOptions('photos')}
                variant={currentOption === 'photos' ? 'primary' : 'secondary'}
                className='rounded-2xl'
                children="Photos"
            />
            <Button
                onClick={() => setCurrentOptions('videos')}
                variant={currentOption === 'videos' ? 'primary' : 'secondary'}
                className='rounded-2xl'
                children="Videos"
            />
        </div>
    )
}

export default OptionsSection