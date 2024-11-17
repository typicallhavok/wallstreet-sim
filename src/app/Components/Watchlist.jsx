"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import SmallGraphImage from "../assets/img/graphIMG.png";
import pinImage from "../assets/img/pinIMG.png";
import unpinImage from "../assets/img/unpinIMG.png";
import BuyMenu from "./BuyMenu";
import SellMenu from "./SellMenu";
// import watchlistImg from "../assets/img/watchlistIMG.png";
import Image from "next/image";

const Watchlist = ({ setError }) => {
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState([]);
    const [displayWatchlist, setDisplayWatchlist] = useState([]);
    const [search, setSearch] = useState("");
    const [stocksFound, setStocksFound] = useState([]);
    const [buyMenuDisplay, setBuyMenuDisplay] = useState(false);
    const [buyStockSymbol, setBuyStockSymbol] = useState("");
    const [sellMenuDisplay, setSellMenuDisplay] = useState(false);
    const [sellStockSymbol, setSellStockSymbol] = useState("");

    useEffect(() => {
        if (user?.watchlist) {
            setWatchlist(user.watchlist);
            setDisplayWatchlist([]);
        }
    }, [user?.watchlist]);

    useEffect(() => {
        const fetchQuotes = async () => {
            const stocksToFetch = watchlist.filter(
                (stockSymbol) =>
                    !displayWatchlist.some(
                        (item) => item.symbol === stockSymbol
                    )
            );

            if (stocksToFetch.length === 0) return;

            const promises = stocksToFetch.map(async (stockSymbol) => {
                try {
                    const result = await fetch(`/api/getQuote/${stockSymbol}`);

                    if (!result.ok) {
                        setError(result.status);
                        return null;
                    }

                    const data = await result.json();
                    return data;
                } catch (error) {
                    setError(error);
                    return null;
                }
            });

            try {
                const results = await Promise.all(promises);
                const newQuotes = results.filter(Boolean);

                if (newQuotes.length > 0) {
                    setDisplayWatchlist([...displayWatchlist, ...newQuotes]);
                }
            } catch (error) {
                setError(error);
            }
        };

        if (watchlist.length > 0) {
            fetchQuotes();
        }
    }, [watchlist]);

    const searchStocks = async (search) => {
        try {
            const result = await fetch(`/api/search?q=${search}`);
            if (!result.ok) {
                throw new Error(`HTTP error! status: ${result.status}`);
            }
            return result.json();
        } catch (error) {
            setError(error.message || 'Failed to search stocks');
            return [];
        }
    };

    const handleSearch = async (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);

        if (searchValue.length > 2) {
            try {
                const result = await searchStocks(searchValue);
                setStocksFound(result);
            } catch (error) {
                setError(error);
            }
        } else {
            setStocksFound([]);
        }
    };

    const clearSearch = () => {
        setSearch("");
        setStocksFound([]);
    };

    const handleBuyMenu = (stockSymbol) => {
        setBuyStockSymbol(stockSymbol);
        setBuyMenuDisplay(true);
    };

    const handleSellMenu = (stockSymbol) => {
        setSellStockSymbol(stockSymbol);
        setSellMenuDisplay(true);
    };

    const handlePin = async (stock) => {
        try {
            if (watchlist.includes(stock.symbol)) {
                const result = await fetch(`/api/unpin?symbol=${stock.symbol}`, {
                    credentials: "include",
                });
                if (!result.ok) {
                    throw new Error(`HTTP error! status: ${result.status}`);
                }
                if (result.status === 200) {
                    setWatchlist(watchlist.filter((item) => item !== stock.symbol));
                    setDisplayWatchlist((prev) =>
                        prev.filter((item) => item.symbol !== stock.symbol)
                    );
                }
            } else {
                const result = await fetch(`/api/pin?symbol=${stock.symbol}`, {
                    credentials: "include",
                });
                if (!result.ok) {
                    throw new Error(`HTTP error! status: ${result.status}`);
                }
                if (result.status === 200) {
                    setWatchlist([...watchlist, stock.symbol]);
                }
            }
        } catch (error) {
            setError(error.message || 'Failed to update watchlist');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".search-container")) {
                setStocksFound([]);
                setSearch("");
            }
        };

        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-2/5 p-10 shadow-md">
            {/* <div className="text-4xl font-bold border-b-2 border-primary p-5 text-black flex flex-row mb-8">
                <Image
                    src={watchlistImg}
                    alt="Watchlist"
                    className="w-8 h-8 mr-3"
                />
                <p>Watchlist</p>
            </div> */}
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
                                    <span className="text-primary stock-longname">
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
                                        <button
                                            className="bg-blue-500 text-white px-3 py-[.08rem] rounded text-sm hover:bg-blue-600"
                                            onClick={() =>
                                                handleBuyMenu(stock.symbol)
                                            }
                                        >
                                            B
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-[.08rem] rounded text-sm hover:bg-red-600"
                                            onClick={() =>
                                                handleSellMenu(stock.symbol)
                                            }
                                        >
                                            S
                                        </button>
                                        <button
                                            className="border border-black px-1 py-[.08rem] rounded hover:bg-gray-300"
                                            onClick={() =>
                                                (window.location.href = `/stocks/${stock.symbol}`)
                                            }
                                        >
                                            <Image
                                                src={SmallGraphImage}
                                                alt="graph"
                                                width={15}
                                                height={15}
                                            />
                                        </button>
                                        <button
                                            className="border border-black px-1 py-[.08rem] rounded hover:bg-gray-300"
                                            onClick={() => handlePin(stock)}
                                        >
                                            {!watchlist.some(
                                                (item) => item === stock.symbol
                                            ) ? (
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
                <div
                    className={`flex flex-col my-5 w-full ${
                        displayWatchlist?.length > 0 && "shadow-lg"
                    } font2 text-[.85rem]`}
                >
                    {displayWatchlist?.length > 0 ? (
                        displayWatchlist.map((stock) => (
                            <span
                                key={`watchlist-${stock.symbol}`}
                                className="p-3 w-full border-y-2 border-gray-300 flex flex-row justify-between items-center group relative"
                            >
                                <span className="stock-name">
                                    {stock.shortName}
                                </span>
                                <div className="flex flex-row gap-2 items-center">
                                    <span className="text-gray-300">
                                        {stock.regularMarketChange.toFixed(2)}
                                    </span>
                                    <span className="text-black">
                                        {stock.regularMarketChangePercent.toFixed(
                                            2
                                        )}
                                        %
                                    </span>
                                    <span
                                        className={`${
                                            stock.regularMarketChange > 0
                                                ? "text-green-500"
                                                : "text-red-500"
                                        } flex items-center gap-1`}
                                    >
                                        <svg
                                            className={`w-4 h-4 ${
                                                stock.regularMarketChange > 0
                                                    ? ""
                                                    : "rotate-180"
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 5l7 7H5z" />
                                        </svg>
                                        {stock.regularMarketPrice.toFixed(2)}
                                    </span>
                                </div>

                                <div className="hidden group-hover:flex absolute inset-0 backdrop-blur items-center justify-end gap-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-[.08rem] rounded text-sm hover:bg-blue-600"
                                        onClick={() =>
                                            handleBuyMenu(stock.symbol)
                                        }
                                    >
                                        B
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-[.08rem] rounded text-sm hover:bg-red-600"
                                        onClick={() =>
                                            handleSellMenu(stock.symbol)
                                        }
                                    >
                                        S
                                    </button>
                                    <button
                                        className="border border-black px-1 py-[.08rem] rounded hover:bg-gray-300"
                                        onClick={() =>
                                            (window.location.href = `/stocks/${stock.symbol}`)
                                        }
                                    >
                                        <Image
                                            src={SmallGraphImage}
                                            alt="graph"
                                            width={15}
                                            height={15}
                                        />
                                    </button>
                                    <button
                                        className="border border-black px-1 py-[.08rem] rounded hover:bg-gray-300"
                                        onClick={() => handlePin(stock)}
                                    >
                                        <Image
                                            src={unpinImage}
                                            alt="unpin"
                                            width={15}
                                            height={15}
                                        />
                                    </button>
                                </div>
                            </span>
                        ))
                    ) : (
                        <span className="m-auto">No stocks in watchlist</span>
                    )}
                </div>
            </div>
            {buyMenuDisplay && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="relative">
                        <BuyMenu
                            stockSymbol={buyStockSymbol}
                            user={user}
                            setBuyMenuDisplay={setBuyMenuDisplay}
                        />
                    </div>
                </div>
            )}
            {sellMenuDisplay && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="relative">
                        <SellMenu
                            stockSymbol={sellStockSymbol}
                            user={user}
                            setSellMenuDisplay={setSellMenuDisplay}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Watchlist;
