"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../Contexts/AuthContext.jsx";
import { useRouter } from "next/navigation";

const Register = () => {
    const auth = useAuth();
    const { register } = auth || {};
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!formData.gender) {
            setError("Please select a gender");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await auth.register(
                formData.username,
                formData.email,
                formData.gender,
                formData.password
            );
        } catch (err) {
            console.error("Register error:", err);
            setError(err.message || "Registration failed. Please try again.");
            setFormData((prev) => ({
                ...prev,
                password: "",
                confirmPassword: "",
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (
            formData.confirmPassword !== "" &&
            formData.password !== formData.confirmPassword
        ) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    }, [formData.confirmPassword]);

    return (
        <div className="container shadow-lg rounded-lg">
            <form onSubmit={handleSubmit} className="form">
                <div className="item">
                    <h1 className="text-2xl font-bold text-center">
                        Register
                    </h1>
                </div>
                <div className="item">
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
                            name="email"
                            id="email"
                            type="email"
                            className="input"
                            placeholder="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="email" className="float-label">
                            email
                        </label>
                    </div>
                </div>
                <div className="item">
                    <div className="floating-label">
                        <select
                            name="gender"
                            id="gender"
                            className="input"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <label htmlFor="gender" className="float-label">
                            gender
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
                <div className="item">
                    <div className="floating-label">
                        <input
                            name="confirmPassword"
                            type="password"
                            id="confirmPassword"
                            className="input"
                            placeholder="confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <label
                            htmlFor="confirmPassword"
                            className="float-label"
                        >
                            confirm password
                        </label>
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="submit-div">
                    <Link href="/login">Already a user? Login</Link>
                    <button
                        type="submit"
                        className="submit-button shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
