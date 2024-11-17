"use client";
import { useAuth } from "../contexts/AuthContext";
import Watchlist from "../components/Watchlist.jsx";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import fundsImg from "../assets/img/fundsIMG.png";
import ordersImg from "../assets/img/ordersIMG.png";

const Funds = () => {
    const { user } = useAuth();
    const [addFunds, setAddFunds] = useState("");
    const [error, setError] = useState(null);

    const handleAddFunds = async () => {
        if (addFunds === "") {setError("Amount cannot be empty"); return;}
        const result = await fetch(`/api/users/addFunds?amount=${addFunds}`, {
            method: "GET",
            headers: {
                credentials: "include",
                "Content-Type": "application/json",
            },
        });
        if (result.ok) {
            window.location.reload();
        }
    };

    let invested = 0;
    user?.holdings.forEach((holding) => {
        invested += holding.amount;
    });

    return (
        <>
            <div className="page-container">
                <div className="w-3/5 p-10 shadow-md">
                    <div className="text-4xl font-bold border-b-2 border-primary p-5 text-black flex flex-row">
                        <Image
                            src={fundsImg}
                            alt="Funds"
                            className="w-8 h-8 mr-3"
                        />
                        <p>Funds</p>
                    </div>
                    <div className="flex flex-col justify-center items-center border-b-2 border-primary">
                        <span className="font2 text-8xl font-[300] mt-10">
                            {user?.funds.toFixed(2) > 1000
                                ? (user?.funds.toFixed(2) / 1000).toFixed(2) +
                                  "k"
                                : user?.funds.toFixed(2)}
                        </span>
                        <span className="font2 text-4xl font-[100] py-4">
                            Invested:{" "}
                            {invested.toFixed(2) > 1000
                                ? (invested.toFixed(2) / 1000).toFixed(2) + "k"
                                : invested.toFixed(2)}
                        </span>
                        <div className="flex flex-row m-5">
                            <input
                                type="number"
                                placeholder="Amount"
                                value={addFunds ? addFunds : ""}
                                onChange={(e) => setAddFunds(e.target.value)}
                                className="px-5 mx-5 bg-gray-200 rounded-md"
                                required
                            />
                            <button
                                className="button"
                                onClick={() => handleAddFunds()}
                            >
                                Add Funds
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-4xl font-bold border-b-2 border-primary p-5 text-black flex flex-row justify-between items-center">
                            <span className="flex flex-row">
                                <Image
                                    src={ordersImg}
                                    alt="Funds"
                                    className="w-8 h-8 mr-3"
                                />
                                <p>Recent Orders</p>
                            </span>
                            <Link href="/orders" className="text-2xl font-bold hover:cursor-pointer hover:underline">
                                View All
                            </Link>
                        </div>
                        <div className="flex flex-col my-2 p-4">
                            {user?.orders.slice(-4).map((order) => (
                                <div className="flex flex-row justify-between items-center border-1 border-gray-200 p-3 shadow-md rounded-md text-[1.2rem]">
                                    <p>{order.name}</p>
                                    <p>{order.amount.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Watchlist />
                <span className="z-20 alert-danger absolute left-50">{error}</span>
            </div>
        </>
    );
};

export default Funds;
