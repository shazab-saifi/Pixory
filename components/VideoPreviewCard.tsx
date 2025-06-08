'use client'

import { Bookmark, Download } from 'lucide-react'
import React, { useRef, useState, useEffect } from 'react'
import Button from './Button'
import Link from 'next/link'
import Image from 'next/image'
import { handleDownload } from '@/lib/utils'

const VideoPreviewCard = React.memo(({
    videoURL,
    width,
    height,
    originalVideoURL,
    pexelsVideoURL,
    onClick,
    videoPreviewURL
}: {
    videoURL: string,
    width: number,
    height: number,
    originalVideoURL: string;
    pexelsVideoURL: string,
    onClick: () => void;
    videoPreviewURL?: string
}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }

    useEffect(() => {
        if (isHovered && videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    }, [isHovered]);

    const fixedHeight = height > width;

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`relative rounded-xl ${fixedHeight ? 'h-[250px] sm:h-[400px] md:h-[500px] xl:h-[800px]' : 'h-[100px] md:h-[200px] xl:h-[279.73px]'} lg:rounded-2xl overflow-hidden group`}
        >
            <Image
                src={videoPreviewURL as string}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                width={width}
                height={height}
                alt="video preview"
                loading="lazy"
                decoding="async"
            />
            <video
                ref={videoRef}
                src={videoURL}
                muted
                playsInline
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Overlay */}
            <div className="absolute hidden sm:block invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 inset-0 top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 via-transparent to-black/30" />
            <div className="absolute inset-0 p-2 md:p-4 flex flex-col justify-between z-10">
                <div className="flex justify-end">
                    <Bookmark className="w-4 h-4 md:w-6 md:h-6 text-white opacity-0 invisible transition-all duration-300 translate-x-full group-hover:opacity-100 group-hover:visible group-hover:translate-x-0" />
                </div>
                <div className="flex w-full justify-between items-center opacity-0 invisible transition-all duration-300 translate-y-full group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                    <Link
                        href={pexelsVideoURL}
                        className="text-white/70 md:font-semibold text-[10px] sm:text-sm md:text-base text-shadow"
                    >
                        Provided by
                        <span className='font-bold text-white italic'> pexels</span>
                    </Link>
                    <Button
                        variant="secondary"
                        size='lg'
                        className="hidden md:block"
                        onClick={e => {
                            e.stopPropagation();
                            handleDownload({url: originalVideoURL})
                        }}
                    >
                        Download
                    </Button>
                    <Download size={20} className="md:hidden text-white" />
                </div>
            </div>
        </div>
    )
});

VideoPreviewCard.displayName = 'VideoPreviewCard';

export default VideoPreviewCard;
