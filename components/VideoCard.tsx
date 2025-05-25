'use client'

import { Bookmark, Download } from 'lucide-react'
import React, { useRef } from 'react'
import Button from './Button'
import Link from 'next/link'

const VideoCard = React.memo(({
    videoURL,
    width,
    height,
    pexelsVideoURL,
}: {
    videoURL: string,
    width: number,
    height: number,
    pexelsVideoURL: string
}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const handleMouseEnter = () => {
        videoRef.current?.play();
    }

    const handleMouseLeave = () => {
        if (videoRef.current === null) return;
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
    }

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative w-[${width}px] h-[${height}px] rounded-xl lg:rounded-2xl overflow-hidden group cursor-pointer`}
        >
            <video
            ref={videoRef}
                className="w-full h-full object-cover z-0"
                src={videoURL}
                width={width}
                height={height}
                muted
                preload='auto'
            />
            <div className="absolute hidden sm:block invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 inset-0 top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 via-transparent to-black/30"></div>
            <div className="absolute inset-0 p-2 md:p-4 flex flex-col justify-between z-10">
                <div className="flex justify-end">
                    <Bookmark className="w-4 h-4 md:w-6 md:h-6 bg-transparent text-white p-0 hover:bg-transparent shadow-none opacity-0 invisible transition-all duration-300 translate-x-full group-hover:opacity-100 group-hover:visible group-hover:translate-x-0" />
                </div>
                <div className="flex w-full justify-between items-center opacity-0 invisible transition-all duration-300 translate-y-full group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                    <Link
                        href={pexelsVideoURL}
                        className="text-white md:font-semibold text-[10px] sm:text-sm text-shadow"
                    >
                        Provided by pexels
                    </Link>
                    <Button
                        variant="secondary"
                        children="Download"
                        className="hidden md:block"
                    />
                    <Download
                        size={20}
                        className="md:hidden text-white"
                    />
                </div>
            </div>
        </div>
    )
})

export default VideoCard