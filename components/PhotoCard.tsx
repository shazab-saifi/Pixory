import Image from 'next/image'
import Button from './Button'
import { Bookmark, Copy, X } from 'lucide-react'
import DownloadDropdown from './DownloadDropdown'
import Link from 'next/link'

const PhotoCard = ({
  photographerName,
  photographerURL,
  photoURL,
  onXClick,
}: {
  photographerName: string | undefined;
  photographerURL: string | undefined;
  photoURL: string | undefined;
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
        <DownloadDropdown />
        <Button
          variant='secondary'
          className='hover:bg-gray-100 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'
        >
          <Bookmark className='w-5 h-5' />
        </Button>
      </div>
      <div className='rounded-lg overflow-hidden'>
        <Image
          src={photoURL || ''}
          width={497.33}
          height={745.98}
          alt='photo'
        />
      </div>
      <div className='space-y-6 md:flex flex-col justify-between'>
        <div className='space-y-6'>
          <div className='w-full justify-between hidden md:flex'>
            <DownloadDropdown />
            <Button
              variant='secondary'
              className='hover:bg-gray-100 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'
            >
              <Bookmark className='w-6 h-6' />
            </Button>
          </div>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-base font-semibold'>Pohographer</h3>
              <Link
                href={photographerURL || ''}
                className='text-sm'
              >
                {photographerName}
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full max-w-xl mx-auto">
          <h3 className="text-base font-semibold mb-2">Link</h3>
          <div className="flex w-full rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] overflow-hidden bg-gray-50">
            <input
              type="text"
              readOnly
              value={photoURL}
              className="flex-grow px-4 py-2 text-sm sm:text-base bg-gray-50 outline-none border-none"
            />
            <Button
              variant="secondary"
              size="md"
              className="w-14 sm:w-16 shrink-0 rounded-none hover:bg-gray-100 transition-colors"
              aria-label="Copy link"
            >
              <Copy className="w-5 h-5 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard