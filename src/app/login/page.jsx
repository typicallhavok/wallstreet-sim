"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useRouter } from "next/navigation";

const Login = () => {
    const auth = useAuth();
    const { login, isLoggedIn } = auth || {};
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            const timer = setTimeout(() => {
                router.push("/dashboard");
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, router]);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await login(formData.username, formData.password);
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid username or password");
            setFormData((prev) => ({
                ...prev,
                password: "",
            }));
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (loading) {
        return <div className="loading"/>;
    }

    return (
        <div className="container shadow-lg rounded-lg">
            <form onSubmit={handleSubmit} className="form">
                <div className="item">
                    <h1 className="text-2xl font-bold text-center item">
                        Login
                    </h1>
                    <div className="floating-label">
                        <input
                            name="username"
                            id="username"
                            type="text"
                            className="input"
                            placeholder="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="username" className="float-label">
                            username
                        </label>
                    </div>
                </div>
                <div className="item">
                    <div className="floating-label">
                        <input
                            name="password"
                            type="password"
                            id="password"
                            className="input"
                            placeholder="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="password" className="float-label">
                            password
                        </label>
                    </div>
                </div>
                <div className="submit-div">
                    <Link href="/register">Not a user? Register</Link>
                    <button
                        type="submit"
                        className="submit-button shadow-md hover:shadow-lg transition-shadow duration-300 button"
                    >
                        Login
                    </button>
                </div>
            </form>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Login;
