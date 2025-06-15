'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    
    return (
        <div>
            {query}
        </div>
    )
}

export default page