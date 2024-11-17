import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import BuyMenu from "./BuyMenu";
import SellMenu from "./SellMenu";

const StockData = ({ quotes }) => {
    const { user } = useAuth();
    const [buyMenuDisplay, setBuyMenuDisplay] = useState(false);
    const [sellMenuDisplay, setSellMenuDisplay] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) setLoading(false);
    }, [user]);

    const meta = quotes.meta;
    const currentDay = quotes.quotes[quotes.quotes.length - 1];

    if (loading) return <div className="loading" />;

    return (
        <div className="w-2/5 p-10 shadow-md">
            <div className="text-2xl font-bold border-b-2 border-primary p-5 text-black flex flex-row mb-8">
                <p>{meta.longName}</p>
            </div>
            <div className="flex flex-col gap-4 px-28 text-xl">
                <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-600 font-medium">Current Price</p>
                    <p className="font-semibold text-2xl">
                        ₹{meta.regularMarketPrice.toFixed(2)}
                    </p>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-600 font-medium">Day Low</p>
                    <p className="font-semibold text-red-600">
                        ₹{meta.regularMarketDayLow.toFixed(2)}
                    </p>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-600 font-medium">Day High</p>
                    <p className="font-semibold text-green-600">
                        ₹{meta.regularMarketDayHigh.toFixed(2)}
                    </p>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-600 font-medium">Day Open</p>
                    <p className="font-semibold">
                        ₹{currentDay.open.toFixed(2)}
                    </p>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-600 font-medium">Day Close</p>
                    <p className="font-semibold">
                        ₹{currentDay.close.toFixed(2)}
                    </p>
                </div>

                <div className="flex flex-row justify-between items-center border-t pt-4 border-gray-200">
                    <p className="text-gray-600 font-medium">Volume</p>
                    <p className="font-semibold">
                        {new Intl.NumberFormat("en-US", {
                            notation: "compact",
                            maximumFractionDigits: 1,
                        }).format(currentDay.volume)}
                    </p>
                </div>
            </div>
            <div className="flex flex-row justify-center gap-4 items-center p-8">
                <button
                    className="button w-full mx-4"
                    onClick={() => setBuyMenuDisplay(true)}
                >
                    Buy
                </button>
                <button
                    className="button w-full mx-4"
                    onClick={() => setSellMenuDisplay(true)}
                >
                    Sell
                </button>
            </div>
            <div className="flex flex-row justify-center items-center mt-6">
                {user &&
                user.holdings.some(
                    (holding) => holding.symbol === meta.symbol
                ) ? (
                    <div className="flex flex-col justify-center items-center bg-secondary p-6 rounded-lg shadow-sm w-full mx-8">
                        <p className="text-secondaryForeground font-medium mb-4 border-b-2 border-primary pb-2">
                            Your Portfolio
                        </p>
                        <div className="flex flex-col w-full space-y-3">
                            <div className="flex flex-row justify-between items-center">
                                <p className="font-medium">Invested:</p>
                                <p className="font-medium">
                                    ₹
                                    {user.holdings
                                        .find(
                                            (holding) =>
                                                holding.symbol === meta.symbol
                                        )
                                        .amount.toFixed(2)}
                                </p>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <p className="font-medium">Quantity:</p>
                                <p className="font-medium">
                                    {
                                        user.holdings.find(
                                            (holding) =>
                                                holding.symbol === meta.symbol
                                        ).quantity
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-secondary py-4 px-8 rounded-lg shadow-sm">
                        <p className="text-secondaryForeground font-medium">
                            Funds: ₹{user.funds.toFixed(2)}
                        </p>
                    </div>
                )}
            </div>
            {buyMenuDisplay && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="relative">
                        <BuyMenu
                            stockSymbol={meta.symbol}
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
                            stockSymbol={meta.symbol}
                            user={user}
                            setSellMenuDisplay={setSellMenuDisplay}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockData;
