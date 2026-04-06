import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth();

    return (
        <nav className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl">
            DevJima
            </Link>

            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <>
                    <Link href="/posts/new" className="text-sm text-gray-600 hover:text-black">
                    Write
                    </Link>
                    <button onClick={logout} className="text-sm text-gray-600 hover:text-black">
                        Logout
                    </button>
                    </>
                ) : (
                    <>
                    <Link href="/login" className="text-sm text-gray-600 hover:text-black">
                    Login
                    </Link>
                    <Link href="/register"
                    className="text-sm bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800">
                        Sign up
                    </Link>
                    </>
                )}
            </div>
        </nav>
    )
}