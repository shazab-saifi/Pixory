import React, { useRef, useState } from 'react'
import Button from './Button'
import { Check, Copy } from 'lucide-react'

const PhotoLinkCopy = ({ photoURL }: { photoURL: string }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const copyLink = () => {
        if (inputRef.current) {
            inputRef.current.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(inputRef.current.value);
            setIsCopied(true);
        } else {
            return;
        }
    }

    return (
        <div className="w-full max-w-xl mx-auto">
            <h3 className="text-base font-semibold mb-2">Link</h3>
            <div className="flex w-full rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] overflow-hidden bg-gray-50">
                <input
                    ref={inputRef}
                    type="text"
                    readOnly
                    value={photoURL}
                    className="flex-grow px-4 py-2 text-sm sm:text-base bg-gray-50 outline-none border-none"
                />
                <Button
                    variant="secondary"
                    size="md"
                    onClick={() => copyLink()}
                    className="w-14 sm:w-16 shrink-0 rounded-none hover:bg-gray-100 transition-colors"
                    aria-label="Copy link"
                >
                    {!isCopied ?
                        <Copy className="w-5 h-5" />
                        :
                        <Check className='text-green-600' />
                    }
                </Button>
            </div>
        </div>
    )
}

export default PhotoLinkCopy