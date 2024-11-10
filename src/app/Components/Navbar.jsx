"use client";
import Link from "next/link";
import { useAuth } from "../Contexts/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
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
                                        className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/orders"
                                        className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600"
                                    >
                                        Orders
                                    </Link>
                                    <Link
                                        href="/holdings"
                                        className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600"
                                    >
                                        Holdings
                                    </Link>
                                    <Link
                                        href="/funds"
                                        className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600"
                                    >
                                        Funds
                                    </Link>
                                </div>
                            )}

                            {!user ? (
                                <>
                                    <Link href="/register">
                                        <button>Register</button>
                                    </Link>
                                    <Link href="/login">
                                        <button>Login</button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <button onClick={logout}>Logout</button>
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
