import Link from "next/link";
import Button from "../Button";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { LogOut, User } from "lucide-react";
import { useOutside } from "@/hooks/useOutside";

const Navigation = ({
    isDropdownOpen,
    setIsDropdownOpen,
    navigate
}: {
    isDropdownOpen: boolean,
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: (path: string) => void
}) => {
    const { data: session, status } = useSession();
    const ref = useOutside(() => setIsDropdownOpen(false), isDropdownOpen);
    const hoverEffect = "p-4 rounded-full transition-colors hover:bg-black/30";

    return (
        <div className="hidden md:flex items-center space-x-8">
            <div className="space-x-8 font-medium text-shadow-md">
                <Link className={hoverEffect} href="/">Home</Link>
                <Link className={hoverEffect} href="/getpixory+">Get Pixory+</Link>
                <Link className={hoverEffect} href="/advertise">Advertise</Link>
            </div>
            {status === 'authenticated' ?
                <div
                    className="relative flex justify-center"
                    onClick={() => setIsDropdownOpen((prev: boolean) => !prev)}
                >
                    <Image
                        className="rounded-full size-13 cursor-pointer"
                        src={session ? session?.user?.image as string : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                        width={50}
                        height={50}
                        alt="profile pic"
                    />
                    <div
                        className={`absolute top-full pt-2 z-40 text-black transition-all transform origin-top ${isDropdownOpen
                            ? "opacity-100 scale-100 pointer-events-auto"
                            : "opacity-0 scale-95 pointer-events-none"
                            }`}
                    >
                        <div ref={ref} className="bg-white p-2 flex flex-col gap-2 rounded-lg cursor-pointer shadow-lg border">
                            <div
                                onClick={() => navigate('/profile')}
                                className="hover:opacity-70 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all flex gap-2 items-center"
                            >
                                <User className="size-5" />
                                <p>Profile</p>
                            </div>
                            <div
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="hover:opacity-70 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all flex gap-2 items-center">
                                <LogOut className="size-5" />
                                <p>Logout</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="space-x-4">
                    <Button variant="secondary" onClick={() => navigate("/signup")}>Sign Up</Button>
                    <Button variant="primary" onClick={() => navigate("signin")}>Sign In</Button>
                </div>
            }
        </div>
    )
}

export default Navigation