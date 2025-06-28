import { useEffect, useRef } from "react"

export const useOutside = (callback: () => void, isOpen: boolean) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        }

        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [callback, isOpen]);

    return ref;
}