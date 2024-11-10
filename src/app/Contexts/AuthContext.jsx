"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

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
    register: async (username, email, gender, password) => {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, gender, password }),
        });
        if (!response.ok) throw new Error("Register failed");
        return response.json();
    },
};

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.username);
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const login = async (username, password) => {
        try {
            const result = await AuthService.login(username, password);
            setUser(username);
            router.push("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const register = async (username, email, gender, password) => {
        try {
            const result = await AuthService.register(username, email, gender, password);
            if (result.error) {
                throw new Error(result.error);
            }
            setUser(username);
            router.push("/dashboard");
            return result;
        } catch (error) {
            console.error("Register error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            const success = await AuthService.logout();
            if (success) {
                setUser(null);
                router.push("/login");
            }
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    };

    const value = {
        user,
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