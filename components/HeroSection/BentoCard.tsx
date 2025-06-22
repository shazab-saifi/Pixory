'use client'

import { useRouter } from "next/navigation";

const BentoCard = ({
    image,
    label,
    spanCols = false
}: {
    image: string;
    label: string;
    spanCols?: boolean
}) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`search?query=${label.toLowerCase()}`)}
            className={`group relative rounded-xl overflow-hidden cursor-pointer ${spanCols ? 'col-span-2' : ''}`}
        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300"
                style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 h-full p-2 flex items-end text-white">
                <span className="opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {label}
                </span>
            </div>
        </div>
    )
}

export default BentoCard