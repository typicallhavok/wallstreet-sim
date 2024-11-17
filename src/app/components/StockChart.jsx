"use client";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useState } from "react";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
import GraphIcon from "./GraphIcon";

ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);

const StockChart = ({ quotes }) => {
    if (!quotes || quotes.length === 0) return null;
    const [timePeriod, setTimePeriod] = useState("1w");

    let datasets = [];
    if (timePeriod !== "5y" && timePeriod !== "1y" && timePeriod !== "6m") {
        datasets = [
            {
                label: "Close Price",
                data: quotes.map((quote) => ({
                    x: new Date(quote.date),
                    y: quote.close,
                })),
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                fill: false,
                tension: 0.4,
                borderWidth: 2,
            },
            {
                label: "High Price",
                data: quotes.map((quote) => ({
                    x: new Date(quote.date),
                    y: quote.high,
                })),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                fill: false,
                showLine: false,
                pointRadius: 3,
                pointHoverRadius: 5,
            },
            {
                label: "Low Price",
                data: quotes.map((quote) => ({
                    x: new Date(quote.date),
                    y: quote.low,
                })),
                borderColor: "rgb(153, 102, 255)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                fill: false,
                showLine: false,
                pointRadius: 3,
                pointHoverRadius: 5,
            },
        ];
    } else {
        datasets = [
            {
                label: "Close Price",
                data: quotes.map((quote) => ({
                    x: new Date(quote.date),
                    y: quote.close,
                })),
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                fill: false,
                tension: 0.4,
                borderWidth: 2,
            },
        ];
    }

    const chartData = {
        datasets: datasets,
    };

    const getTimeConfig = (period) => {
        switch (period) {
            case "1w":
                return { unit: "day", format: "dd MMM" };
            case "1m":
                return { unit: "day", format: "dd MMM" };
            case "3m":
                return { unit: "month", format: "MMM yy" };
            case "6m":
                return { unit: "month", format: "MMM yy" };
            case "1y":
                return { unit: "month", format: "MMM yy" };
            case "5y":
                return { unit: "year", format: "yyyy" };
            default:
                return { unit: "month", format: "MMM yy" };
        }
    };

    const getDateRange = (period) => {
        const now = new Date();
        switch (period) {
            case "1w":
                return new Date(now.setDate(now.getDate() - 7));
            case "1m":
                return new Date(now.setMonth(now.getMonth() - 1));
            case "3m":
                return new Date(now.setMonth(now.getMonth() - 3));
            case "6m":
                return new Date(now.setMonth(now.getMonth() - 6));
            case "1y":
                return new Date(now.setFullYear(now.getFullYear() - 1));
            case "5y":
                return new Date(now.setFullYear(now.getFullYear() - 5));
            default:
                return new Date(now.setDate(now.getDate() - 7));
        }
    };

    const getVisibleDataMax = () => {
        const visibleQuotes = quotes.filter(
            (quote) => new Date(quote.date) >= getDateRange(timePeriod)
        );
        const maxClose = Math.max(...visibleQuotes.map((q) => q.close));
        const maxHigh = Math.max(
            ...visibleQuotes.map((q) => q.high || q.close)
        );
        const absoluteMax = Math.max(maxClose, maxHigh);
        return absoluteMax * 1.02;
    };

    const timeConfig = getTimeConfig(timePeriod);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: "time",
                time: {
                    unit: timeConfig.unit,
                    displayFormats: {
                        month: timeConfig.format,
                    },
                },
                grid: {
                    display: false,
                },
                ticks: {
                    maxTicksLimit: 7,
                    color: "rgba(0, 0, 0, 0.5)",
                },
                min: getDateRange(timePeriod),
            },
            y: {
                grid: {
                    display: true,
                    drawBorder: false,
                    color: "rgba(0, 0, 0, 0.1)",
                },
                ticks: {
                    maxTicksLimit: 10,
                    color: "rgba(0, 0, 0, 0.5)",
                },
                max: getVisibleDataMax(),
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "chartArea",
                align: "start",
                labels: {
                    boxWidth: 12,
                    color: "rgb(102, 102, 102)",
                    padding: 20,
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                    title: (tooltipItems) => {
                        const date = new Date(tooltipItems[0].parsed.x);
                        return date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        });
                    },
                    label: (context) => {
                        return `₹${context.parsed.y.toLocaleString()}`;
                    },
                },
                padding: 5,
                displayColors: false,
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: "xy",
                },
                pan: {
                    enabled: true,
                    mode: "xy",
                },
            },
        },

        elements: {
            line: {
                tension: 0.4,
                borderWidth: 2,
            },
            point: {
                radius: 0,
                hitRadius: 10,
            },
        },
    };

    return (
        <div className="w-full h-full flex flex-col items-start justify-center pt-5">
            <div className="text-2xl font-bold border-b-2 border-primary text-black flex flex-row ml-10 mb-3 px-5">
                <span className="w-8 h-8 mr-1 mt-1">
                    <GraphIcon />
                </span>
                <p>Chart</p>
            </div>
            <Line data={chartData} options={options} />
            <div className="w-full flex items-center justify-end gap-2 pt-2">
                {["5y", "1y", "6m", "3m", "1m", "1w"].map((period) => (
                    <button
                        key={period}
                        onClick={() => setTimePeriod(period)}
                        className={`text-sm ${
                            timePeriod === period
                                ? "text-blue-600 font-bold"
                                : "text-gray-500"
                        }`}
                    >
                        {period}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StockChart;
