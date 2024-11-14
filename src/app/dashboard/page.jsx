"use client";
import { useAuth } from "../Contexts/AuthContext";
import { useState } from "react";
import SuitcaseIcon from "../Components/SuitcaseIcon";
import HoldingsGraph from "../Components/HoldingsGraph";
import Watchlist from "../Components/Watchlist";
import StockChart from "../Components/TopChart";
import GraphIcon from "../Components/GraphIcon";
const Dashboard = () => {
    const { user, loading } = useAuth();
    const [pl, setPl] = useState(0);

    if (loading) {
        return <div className="loading" />;
    }

    return (
        <>
            <div className="page-container">
                <div className="w-3/5 p-10 shadow-md">
                    <div className="text-4xl font-bold border-b-2 border-primary p-5 text-black">
                        <p>Hi, {user?.name}</p>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2 p-1 px-5">
                            <p className="flex flex-row gap-3 text-2xl font-bold pt-2 mt-2">
                                <SuitcaseIcon />
                                Holdings
                            </p>
                            <div className="flex flex-row gap-2">
                                <div className="flex flex-col gap-2 border-r-2 border-primary justify-center">
                                    <p
                                        className={`nFont text-7xl ${
                                            pl > 0
                                                ? "text-green-500"
                                                : pl == 0
                                                ? "text-black"
                                                : "text-red-500"
                                        } pb-2 pr-96`}
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
                                <div className="flex flex-col gap-2 justify-center pl-16">
                                    <p className="text-md text-secondary px-5 nFont">
                                        Current Value:{" "}
                                        <span className="text-black">
                                            {(user?.funds / 1000).toFixed(2)}k
                                        </span>
                                    </p>
                                    <p className="text-md text-secondary px-5 nFont">
                                        Investment:{" "}
                                        <span className="text-black">
                                            {(user?.funds / 1000).toFixed(2)}k
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <span className="border-b-2 border-primary px-4 pb-2">
                            <HoldingsGraph stocks={user.holdings} />
                        </span>
                        <div className="flex flex-col gap-2 px-5">
                            <p className="flex flex-row gap-3 text-2xl font-bold mb-3 py-1">
                                <GraphIcon />
                                Market Overview
                            </p>

                            <StockChart />
                        </div>
                    </div>
                </div>
                <Watchlist />
            </div>
        </>
    );
};

export default Dashboard;
