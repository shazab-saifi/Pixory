'use client'

import Navbar2 from '@/components/Navbar2';
import OptionsSection from '@/components/OptionsSection';
import PhotosSection from '@/components/PhotosSection';
import { useOptionsToggle } from '@/lib/store';
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';

const page = () => {
    const searchParams = useSearchParams();
    const { currentOption } = useOptionsToggle();
    const query = searchParams.get('query') || undefined;

    // useEffect(() => {
    //     window.location.reload();

    //     return () => {
    //         window.location.reload();
    //     }
    // }, [query]);

    return (
        <div>
            <Navbar2 />
            <OptionsSection />
            {currentOption === 'photos' && <PhotosSection query={query} /> }
        </div>
    )
}

export default page