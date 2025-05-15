"use client";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import SuitcaseIcon from "../components/SuitcaseIcon";
import HoldingsGraph from "../components/HoldingsGraph";
import Watchlist from "../components/Watchlist";
import StockChart from "../components/TopChart";
import GraphIcon from "../components/GraphIcon";
import { useEffect } from "react";

const Dashboard = () => {
    const { user } = useAuth();
    const [pl, setPl] = useState(0);
    const [currentPrices, setCurrentPrices] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function calculatePL() {
            if (user !== null) {
                const promises = user.holdings.map(async (holding) => {
                    try {
                        const currentPrice = await fetch(`/api/getPrice/${holding.symbol}`);
                        const data = await currentPrice.json();
                        return { symbol: holding.symbol, price: data };
                    } catch (error) {
                        setError(error);
                    }
                });
                
                const priceResults = await Promise.all(promises);
                setCurrentPrices(priceResults);
                
                const plResults = priceResults.map((result, index) => {
                    const holding = user.holdings[index];
                    const currentValue = result.price * holding.quantity;
                    const initialInvestment = holding.amount;
                    return currentValue - initialInvestment;
                });
                
                const totalPl = plResults.reduce((sum, value) => sum + value, 0);
                setPl(totalPl);
                setLoading(false);
            }
        }
        
        calculatePL();
    }, [user]);

    if (loading) {
        return <div className="loading" />;
    }

    return (
        <>
            <div className="page-container flex flex-col md:flex-row">
                <div className="w-full md:w-3/5 p-4 md:p-10 shadow-md">
                    <div className="text-2xl md:text-4xl font-bold border-b-2 border-primary py-3 md:p-5 text-black">
                        <p>Hi, {user?.name}</p>
                    </div>
                    <div className="flex flex-col gap-3 md:gap-5">
                        <div className="flex flex-col gap-2 p-1 px-3 md:px-5">
                            <p className="flex flex-row gap-2 md:gap-3 text-xl md:text-2xl font-bold pt-2 mt-2">
                                <SuitcaseIcon setError={setError}/>
                                Holdings
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
                                <div className="flex flex-col gap-1 md:gap-2 sm:border-r-2 border-primary justify-center pb-3 sm:pb-0">
                                    <p
                                        className={`nFont text-4xl md:text-7xl ${
                                            pl > 0
                                                ? "text-green-500"
                                                : pl == 0
                                                ? "text-black"
                                                : "text-red-500"
                                        } pb-1 md:pb-2 sm:pr-8 md:pr-96`}
                                    >
                                        {(pl / 1000 != 0 &&
                                            (pl / 1000).toFixed(2)) ||
                                            0}
                                        k
                                    </p>
                                    <p className="text-md text-secondary px-2">
                                        P&L
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1 md:gap-2 justify-center sm:pl-4 md:pl-8">
                                    <p className="text-sm md:text-md text-secondary px-2 md:px-5 nFont">
                                        Current Value:{" "}
                                        <span className="text-black">
                                            {(user?.funds / 1000).toFixed(2)}k
                                        </span>
                                    </p>
                                    <p className="text-sm md:text-md text-secondary px-2 md:px-5 nFont">
                                        Investment:{" "}
                                        <span className="text-black">
                                            {(user.holdings.reduce((sum, holding) => sum + holding.amount, 0) / 1000).toFixed(2)}k
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <span className="border-b-2 border-primary px-2 md:px-4 pb-2">
                            <HoldingsGraph stocks={user.holdings} currentPrices={currentPrices} setError={setError}/>
                        </span>
                        <div className="flex flex-col gap-2 px-3 md:px-5">
                            <p className="flex flex-row gap-2 md:gap-3 text-xl md:text-2xl font-bold mb-2 md:mb-3 py-1">
                                <GraphIcon setError={setError}/>
                                Market Overview
                            </p>

                            <StockChart setError={setError}/>
                        </div>
                    </div>
                </div>
                <Watchlist setError={setError}/>
                {error && <span className="z-20 alert-danger absolute left-50">{error.message}</span>}
            </div>
        </>
    );
};

export default Dashboard;
