"use client";
import Watchlist from "../Components/Watchlist";
import { useAuth } from "../Contexts/AuthContext";
import SuitcaseIcon from "../Components/SuitcaseIcon.jsx";
import { useEffect, useState } from "react";

const Holdings = () => {
    const { user } = useAuth();
    const [currentPrices, setCurrentPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchCurrentPrices = async () => {
                const promises = user.holdings.map(async (holding) => {
                    try {
                        const currentPrice = await fetch(
                            `/api/getPrice/${holding.symbol}`
                        );
                        const data = await currentPrice.json();
                        return { symbol: holding.symbol, price: data };
                    } catch (error) {
                        setError(error);
                        return null;
                    }
                });
                const priceResults = await Promise.all(promises);
                console.log(user.holdings.length, priceResults.length);
                if (priceResults.length === user.holdings.length) {
                    const pricesObject = priceResults.reduce((acc, result) => {
                        if (result) {
                            acc[result.symbol] = result.price;
                        }
                        return acc;
                    }, {});
                    console.log("setting prices", pricesObject);
                    setCurrentPrices(pricesObject);
                    setLoading(false);
                } else if (priceResults.length < user.holdings.length) {
                    setLoading(false);
                    setError("Failed to fetch all prices");
                }
            };
            fetchCurrentPrices();
        }
    }, [user]);

    if (loading) return <div className="loading" />;

    return (
        <>
            <div className="page-container">
                <div className="w-3/5 p-10 shadow-md">
                    <div className="text-4xl font-bold border-b-2 border-primary p-5 text-black flex flex-row">
                        <span className="w-8 h-8 mr-1 mt-1">
                            <SuitcaseIcon />
                        </span>
                        <p>Holdings</p>
                    </div>

                    <div className="mt-6 font2 font-100 text-sm">
                        <div className="max-h-[600px] overflow-y-auto relative">
                            <table className="w-full">
                                <thead className="sticky top-0 bg-white">
                                    <tr className="text-center border-b-2 border-black text-[1.1rem]">
                                        <th className="py-3 px-4 w-[200px]">
                                            Name
                                        </th>
                                        <th className="py-3 px-4 text-center">
                                            Quantity
                                        </th>
                                        <th className="py-3 px-4 text-center">
                                            Investment
                                        </th>
                                        <th className="py-3 px-4 text-center">
                                            Current Price
                                        </th>
                                        <th className="py-3 px-4 text-center">
                                            Profit/Loss
                                        </th>
                                        <th className="py-3 px-4 text-center">
                                            Current Value
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user?.holdings?.map((holding, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                className="border-b hover:bg-gray-50 shadow-md"
                                            >
                                                <td className="py-4 px-4 w-[200px] relative group">
                                                    <div className="truncate">
                                                        {holding.name}
                                                        <span className="hidden group-hover:block absolute bg-gray-800 text-white p-2 rounded -mt-1 ml-2 text-sm z-10 whitespace-normal">
                                                            {holding.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    {holding.quantity}
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    {holding.amount.toFixed(2)}
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    {currentPrices[
                                                        holding.symbol
                                                    ]?.toFixed(2)}
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    {currentPrices[
                                                        holding.symbol
                                                    ] &&
                                                        (((currentPrices[
                                                            holding.symbol
                                                        ] * holding.quantity -
                                                            holding.amount) /
                                                            holding.amount) *
                                                            100).toFixed(2)}
                                                    %
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    {currentPrices[
                                                        holding.symbol
                                                    ] &&
                                                        (
                                                            currentPrices[
                                                                holding.symbol
                                                            ] * holding.quantity
                                                        ).toFixed(2)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Watchlist />
            </div>
        </>
    );
};

export default Holdings;
