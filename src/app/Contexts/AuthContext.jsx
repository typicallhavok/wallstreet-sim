"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

const AuthService = {
    login: async (username, password) => {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) throw new Error("Login failed");
        return response.json();
    },
    logout: async () => {
        const response = await fetch("/api/logout");
        return response.ok;
    },
    register: async (name, username, email, gender, password) => {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, username, email, gender, password }),
        });
        if (!response.ok) throw new Error("Register failed");
        return response.json();
    },
};

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const checkAuth = async () => {
            if (pathname === '/login' || pathname === '/register') {
                setLoading(false);
                setUser(null);
                setIsLoggedIn(false);
                return;
            }

            try {
                const response = await fetch('/api/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({})
                });
                
                if (!mounted) return;

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    setIsLoggedIn(true);
                } else {
                    setUser(null);
                    setIsLoggedIn(false);
                    if (!pathname.includes('/login')) {
                        router.push('/login');
                    }
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                if (mounted) {
                    setUser(null);
                    setIsLoggedIn(false);
                    if (!pathname.includes('/login')) {
                        router.push('/login');
                    }
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        checkAuth();

        return () => {
            mounted = false;
        };
    }, [router, pathname]);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const result = await AuthService.login(username, password);
            console.log(result);
            if (result.user) {
                setUser(result.user);
                setIsLoggedIn(true);
            } else {
                throw new Error("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, username, email, gender, password) => {
        try {
            const result = await AuthService.register(
                name,
                username,
                email,
                gender,
                password
            );
            if (result.error) {
                throw new Error(result.error);
            }
            return result;
        } catch (error) {
            console.error("Register error:", error);
            throw error;
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            const success = await AuthService.logout();
            if (success) {
                setUser(null);
                setIsLoggedIn(false);
                
                await fetch('/api/logout', {
                    method: 'POST',
                    credentials: 'include'
                });
                
                await router.push("/login");
                
                window.location.reload();
            }
        } catch (error) {
            console.error("Logout error:", error);
            setUser(null);
            setIsLoggedIn(false);
            await router.push("/login");
            window.location.reload();
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        isLoggedIn,
        loading,
        login,
        logout,
        register,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};