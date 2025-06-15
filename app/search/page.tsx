'use client'

import Navbar2 from '@/components/Navbar2';
import { useSearchParams } from 'next/navigation'

const page = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    return (
        <div>
            <Navbar2 />
            {query}
        </div>
    )
}

export default page