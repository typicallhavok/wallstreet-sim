"use client";
import { useState,useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import SmallGraphImage from "../assets/img/graphIMG.png";
import pinImage from "../assets/img/pinIMG.png";
import unpinImage from "../assets/img/unpinIMG.png";
import Image from "next/image";

const Watchlist = () => {
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState([]);
    console.log(watchlist);
    const [search, setSearch] = useState("");
    const [stocksFound, setStocksFound] = useState([]);

    useEffect(() => {
        if (user) {
            setWatchlist(user.watchlist);
        }
    }, [user]);

    const searchStocks = async (search) => {
        const result = await fetch(`/api/search?q=${search}`);
        return result.json();
    };

    const handleSearch = async (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);

        if (searchValue.length > 2) {
            const result = await searchStocks(searchValue);
            setStocksFound(result);
        } else {
            setStocksFound([]);
        }
    };

    const clearSearch = () => {
        setSearch("");
        setStocksFound([]);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-container')) {
                setStocksFound([]);
                setSearch("");
            }
        };

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handlePin = async (stock) => {
        if(watchlist.includes(stock)) {
            const result = await fetch(`/api/unpin?symbol=${stock.symbol}&username=${user.username}`,{credentials: "include"});
            if(result.status === 200) 
                setWatchlist(watchlist.filter(item => item.symbol !== stock.symbol));
        } else {
            const result = await fetch(`/api/pin?symbol=${stock.symbol}&username=${user.username}`,{credentials: "include"});
            if(result.status === 200)
                setWatchlist([...watchlist, stock]);
        }
    };

    return (
        <div className="w-2/5 p-10 shadow-md">
            <div className="search-container">
                <div className="search relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full p-2 bg-gray-100 rounded-md"
                        onChange={handleSearch}
                        value={search}
                    />
                    {search && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    )}
                </div>
                <div
                    className={`w-[33.45rem] absolute z-40 stocks-found border-2 h-max-content border-gray-100 rounded-lg shadow-lg bg-white ${
                        search.length < 3 || stocksFound.length === 0
                            ? "hidden"
                            : ""
                    }`}
                >
                    <div className="flex flex-col my-5">
                        {stocksFound.map((stock) => (
                            <span
                                key={stock.symbol}
                                className="p-2 border-b-2 border-gray-300 shadow-sm hover:bg-gray-100 hover:cursor-pointer flex flex-row justify-between items-center group relative"
                            >
                                <span className="stock-name">
                                    {stock.shortname}
                                </span>
                                <div className="flex flex-row gap-2 items-center">
                                    <span className="text-secondary stock-longname">
                                        {stock.longname}
                                    </span>
                                    <span
                                        className={`text-[.6rem] justify-center items-center ${
                                            stock.exchDisp === "NSE"
                                                ? "bg-red-200 text-red-600"
                                                : "bg-blue-200 text-blue-500"
                                        } p-1`}
                                    >
                                        {stock.exchDisp}
                                    </span>
                                    <div className="hidden group-hover:flex gap-2 absolute right-2 bg-white shadow-lg p-1 rounded z-30 h-max">
                                        <button className="bg-blue-500 text-white px-3 py-[.08rem] rounded text-sm hover:bg-blue-600">
                                            B
                                        </button>
                                        <button className="bg-red-500 text-white px-3 py-[.08rem] rounded text-sm hover:bg-red-600">
                                            S
                                        </button>
                                        <button className="border border-black px-1 py-[.08rem] rounded hover:bg-gray-300">
                                            <Image src={SmallGraphImage} alt="graph" width={15} height={15} />
                                        </button>
                                        <button className="border border-black px-1 py-[.08rem] rounded hover:bg-gray-300" onClick={() => handlePin(stock)}>
                                            {!watchlist.includes(stock) ? (
                                                <Image
                                                    src={pinImage}
                                                    alt="pin"
                                                    width={15}
                                                    height={15}
                                                />
                                            ) : (
                                                <Image
                                                    src={unpinImage}
                                                    alt="unpin"
                                                    width={15}
                                                    height={15}
                                                />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex flex-row gap-2 p-5">
                    {watchlist.length > 0 ? (
                        watchlist.map((stock) => (
                            <span key={stock.symbol}>{stock.symbol}</span>
                        ))
                    ) : (
                        <span className="m-auto">
                            No stocks in watchlist
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Watchlist;
