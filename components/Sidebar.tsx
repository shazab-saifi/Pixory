import Image from 'next/image';
import React, { useEffect } from 'react'
import pixory from "@/public/pixory.svg";
import { Home, Megaphone, Plus, X } from 'lucide-react';
import Link from 'next/link';
import Button from './Button';

const Sidebar = ({
    isOpen,
    setIsOpen,
    navigate
}: {
    isOpen: boolean,
    setIsOpen: (arg: boolean) => void,
    navigate: (path: string) => void
}) => {

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        }
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            )}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-64 bg-white transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center px-6 py-6">
                    <Image className="aspect-auto w-[100px]" src={pixory} alt="Logo" />
                    <button onClick={() => setIsOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex flex-col p-6 gap-90 text-base font-medium">
                    <div className="flex flex-col space-y-6">
                        <div className="inline-flex items-center gap-3">
                            <Home />
                            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
                        </div>
                        <div className="inline-flex items-center gap-3">
                            <Plus />
                            <Link href="/getpixory+" onClick={() => setIsOpen(false)}>Get Pixory+</Link>
                        </div>
                        <div className="inline-flex items-center gap-3">
                            <Megaphone />
                            <Link href="/advertise" onClick={() => setIsOpen(false)}>Advertise</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button variant="secondary" onClick={() => { setIsOpen(false); navigate('signup') }}>Sign Up</Button>
                        <Button variant="primary" onClick={() => { setIsOpen(false); navigate('signin') }}>Sign In</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar