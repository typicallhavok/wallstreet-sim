"use client";
import Link from "next/link";
import { useAuth } from "../Contexts/AuthContext";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-12">
                <div className="flex justify-between h-16">
                    <div className="flex items-center font-bold text-2xl">
                        <Link href="/">StolkWong</Link>
                    </div>

                    <div className="flex items-center">
                        <div className="flex space-x-3">
                            {user && (
                                <div className="flex">
                                    <Link
                                        href="/dashboard"
                                        className={`flex items-center px-5 py-2 text-gray-700 hover:text-primary ${pathname === "/dashboard" ? "text-primary" : ""}`}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/orders"
                                        className={`flex items-center px-5 py-2 text-gray-700 hover:text-primary ${pathname === "/orders" ? "text-primary" : ""}`}
                                    >
                                        Orders
                                    </Link>
                                    <Link
                                        href="/holdings"
                                        className={`flex items-center px-5 py-2 text-gray-700 hover:text-primary ${pathname === "/holdings" ? "text-primary" : ""}`}
                                    >
                                        Holdings
                                    </Link>
                                    <Link
                                        href="/funds"
                                        className={`flex items-center px-5 py-2 text-gray-700 hover:text-primary ${pathname === "/funds" ? "text-primary" : ""}`}
                                    >
                                        Funds
                                    </Link>
                                </div>
                            )}

                            {!user ? (
                                <>
                                    {pathname !== "/register" && (
                                        <Link href="/register">
                                            <button className="button">Register</button>
                                        </Link>
                                    )}
                                    {pathname !== "/login" && (
                                        <Link href="/login">
                                            <button className="button">Login</button>
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <>
                                    <button className="button" onClick={logout}>Logout</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
