"use client";

import { useEffect, useState } from "react";

const BuyMenu = ({ stockSymbol, user, setBuyMenuDisplay }) => {
    if (!user) {
        setBuyMenuDisplay(false);
        return;
    }

    const [stockData, setStockData] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [date, setDate] = useState(null);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/getQuote/${stockSymbol}`);
            const data = await res.json();
            setStockData(data);
        };
        fetchData();
    }, []);

    const handleBuy = async () => {
        try {
            const requestBody = {
                quantity,
                ...(date && { 
                    date: new Date(date + 'T00:00:00Z').toISOString() 
                })
            };

            const res = await fetch(`/api/buy/${stockSymbol}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                credentials: "include",
            });
            
            const data = await res.json();
            
            if(res.status === 200) {
                setBuyMenuDisplay(false);
                window.location.reload();
            } else {
                setError(data.message || 'An error occurred while processing your request');
            }
        } catch (err) {
            setError('An error occurred while processing your request');
        }
    };

    const changeDate = async (date) => {
        const res = await fetch(`/api/getPrice/${stockSymbol}?date=${date}`);
        const data = await res.json();
        setStockData({...stockData, regularMarketPrice: Number(data)});
        setDate(date);
    };

    if (!stockData) return <div className="loading" />;

    const price = Number(stockData.regularMarketPrice) || 0;
    const total = price * Number(quantity) || 0;

    return (
        <div className="w-[300px] h-[440px] bg-white rounded-lg shadow-md">
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
                <div>
                    <label htmlFor="date" className="text-[.7rem] text-gray-500">Optional</label>
                    <div className="flex gap-2">
                        <input 
                            type="date" 
                            id="date" 
                            className="w-full p-2 rounded-md border border-gray-300" 
                            value={date || ''} 
                            onChange={(e) => changeDate(e.target.value)} 
                        />
                        <button 
                            onClick={() => setDate(null)} 
                            className="text-sm text-gray-500"
                        >
                            Clear
                        </button>
                    </div>
                </div>
                <span className="text-sm text-black">
                    Price:{" "}
                    <span className="font-bold">
                        ₹{price.toFixed(2)}
                    </span>
                </span>
                <span className="text-sm text-black">
                    Total Price:{" "}
                    <span className="font-bold">
                        ₹{total.toFixed(2)}
                    </span>
                </span>
                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}
                <button className="button" onClick={handleBuy}>Buy</button>
                <button className="button" onClick={() => setBuyMenuDisplay(false)}>Cancel</button>
            </div>
        </div>
    );
};

export default BuyMenu;
