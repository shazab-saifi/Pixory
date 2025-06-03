import React from 'react'
import Image from 'next/image'
import Button from './Button'
import { Bookmark, X } from 'lucide-react'
import DownloadDropdown from './DownloadDropdown'
import PhotoLinkCopy from './PhotoLinkCopy'
import { PhotoURLsTypes } from '@/lib/types'

const PhotoCard = React.memo(({
  photographerName,
  photographerURL,
  src,
  photoURL,
  onXClick,
}: {
  photographerName: string;
  photographerURL: string;
  src: PhotoURLsTypes;
  photoURL: string;
  onXClick: () => void;
}) => {
  return (
    <div className='relative p-4 md:p-6 max-h-[610px] xl:max-h-none lg:p-8 bg-white rounded-2xl flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8'>
      <div className='absolute bottom-full lg:bottom-0 right-0 lg:right-0 lg:left-full lg:top-0 cursor-pointer text-white pb-1 md:pl-4'>
        <X
          onClick={onXClick}
          className='md:w-11 md:h-11 w-8 h-8'
        />
      </div>
      <div className='w-full flex justify-between md:hidden'>
        <DownloadDropdown src={src} />
        <Button
          variant='secondary'
          className='hover:bg-gray-100 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'
        >
          <Bookmark className='w-5 h-5' />
        </Button>
      </div>
      <div className='rounded-lg overflow-hidden'>
        <Image
          src={photoURL}
          width={400}
          height={400}
          alt='photo'
        />
      </div>
      <div className='space-y-6 md:flex flex-col justify-between'>
        <div className='space-y-6'>
          <div className='w-full justify-between hidden md:flex'>
            <div>
              <h3 className='text-base font-semibold'>Photographer</h3>
              <a
                href={photographerURL}
                className='text-sm cursor-pointer'
                target='_blank'
              >
                {photographerName}
              </a>
            </div>
            <Button
              variant='secondary'
              className='hover:bg-gray-100 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'
            >
              <Bookmark className='w-6 h-6' />
            </Button>
          </div>
          <div className='hidden md:block'>
            <DownloadDropdown src={src} />
          </div>
          <div className='md:hidden'>
            <h3 className='text-base font-semibold'>Photographer</h3>
            <a
              href={photographerURL}
              className='text-sm cursor-pointer'
              target='_blank'
            >
              {photographerName}
            </a>
          </div>
        </div>
        <PhotoLinkCopy photoURL={photoURL} />
      </div>
    </div>
  );
});

PhotoCard.displayName = 'PhotoCard'

export default PhotoCard