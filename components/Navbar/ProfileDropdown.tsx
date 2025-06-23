import { LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const ProfileDropdown = ({
    isDropdownOpen,
    setIsDropdownOpen,
    navigate
}: {
    isDropdownOpen: boolean,
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: (path: string) => void
}) => {
    const { data: session } = useSession();

    return (
        <div
            className="relative flex justify-center"
            onClick={() => setIsDropdownOpen((prev: boolean) => !prev)}
        >
            <img
                className="rounded-full size-13 cursor-pointer"
                src={session ? session?.user?.image as string : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt="profile pic"
            />
            <div
                className={`absolute top-full pt-2 z-40 text-black transition-all transform origin-top ${isDropdownOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                <div className="bg-white p-2 flex flex-col gap-2 rounded-lg cursor-pointer shadow-lg border">
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
    )
}

export default ProfileDropdown