"use client";
import dynamic from "next/dynamic";
import StockData from "../../components/StockData";
import { useEffect, useState } from "react";

const StockChart = dynamic(() => import("../../components/StockChart"), {
    ssr: false,
});

const StockPage = ({ params }) => {
    const [meta, setMeta] = useState(null);
    const [quotes, setQuotes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quotes1, setQuotes1] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/getQuote/${params.id}`);
                const data = await res.json();
                
                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch quote data');
                }
                
                setMeta(data);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        const fetchMeta = async () => {
            try {
                const res = await fetch(`/api/getChart/${params.id}`);
                const data = await res.json();
                
                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch chart data');
                }
                
                setQuotes(data.quotes);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
        fetchMeta();
    }, [params.id]);

    useEffect(() => {
        if (meta && quotes) {
            setQuotes1({ meta, quotes });
            setLoading(false);
        }
    }, [meta, quotes]);

    if (loading) return <div className="loading" />;
    if (error) return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-red-500 text-xl font-medium p-4 bg-red-50 rounded-lg">
                {error}
            </div>
        </div>
    );
    
    return (
        <>
            <div className="page-container">
                <div className="w-3/5 p-10 shadow-md">
                    <StockChart quotes={quotes} />
                </div>
                <StockData quotes={quotes1} />
            </div>
        </>
    );
};

export default StockPage;
