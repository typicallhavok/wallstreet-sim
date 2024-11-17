"use client";

import { useEffect, useState } from "react";

const SellMenu = ({ stockSymbol, user, setSellMenuDisplay }) => {
    if (!user) {
        setSellMenuDisplay(false);
        return;
    }

    const [stockData, setStockData] = useState(null);
    const [quantity, setQuantity] = useState(0);
    

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/getQuote/${stockSymbol}`);
            const data = await res.json();
            setStockData(data);
        };
        fetchData();
    }, []);

    const handleSell = async () => {
        console.log("quantity", JSON.stringify({ quantity }));
        const res = await fetch(`/api/sell/${stockSymbol}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity }),
            credentials: "include",
        });
        if(res.status === 200) {
            setSellMenuDisplay(false);
            window.location.reload();
        }
    };

    if (!stockData) return <div className="loading" />;

    return (
        <div className="w-[300px] h-[320px] bg-white rounded-lg shadow-md">
            <div className="flex flex-col h-[75px] bg-primary rounded-t-lg p-5 justify-center">
                <p className="text-1xl font-bold text-white">
                    {stockData.shortName}
                </p>
            </div>
            <div className="flex flex-col p-5 gap-4">
                <input
                    type="number"
                    placeholder="Quantity"
                    className="w-full p-2 rounded-md border border-gray-300"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <span className="text-sm text-black">
                    Price:{" "}
                    <span className="font-bold">
                        {(stockData.regularMarketPrice * quantity).toFixed(2)}
                    </span>
                </span>
                <button className="button" onClick={handleSell}>Sell</button>
                <button className="button" onClick={() => setSellMenuDisplay(false)}>Cancel</button>
            </div>
        </div>
    );
};

export default SellMenu;
