"use client";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

import { useState } from "react";

const HoldingsGraph = ({ stocks, currentPrices }) => {

    const [viewType, setViewType] = useState("current");

    const colorPalette = [
        "#4a66ff",
        "#00caff",
        "#0098ff",
        "#ab23cf",
        "#77369d",
        "#654cda",
        "#04d3ff",
    ];

    const datasets = stocks.map((stock, index) => ({
        label: stock.name,
        data: [
            viewType === "investment"
                ? stock.amount
                : currentPrices.find(
                      (currentStock) => currentStock.symbol === stock.symbol
                  ).price * stock.quantity,
        ],
        backgroundColor: colorPalette[index % colorPalette.length],
        barPercentage: 0.95,
        categoryPercentage: 1.0,
    }));

    const data = {
        labels: [""],
        datasets: datasets,
    };

    const options = {
        indexAxis: "y",
        scales: {
            x: {
                stacked: true,
                display: false,
                grid: {
                    display: false,
                },
                min: 0,
                max: stocks.reduce(
                    (acc, stock) =>
                        acc +
                        (viewType === "investment"
                            ? stock.amount
                            : currentPrices.find(
                                  (currentStock) =>
                                      currentStock.symbol === stock.symbol
                              ).price * stock.quantity),
                    0
                ),
            },
            y: {
                stacked: true,
                display: false,
                grid: {
                    display: false,
                },
            },
        },
        responsive: true,
        aspectRatio: 20,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: (context) => {
                        const value = context.raw;
                        return `${
                            context.dataset.label
                        } (₹${value.toLocaleString()})`;
                    },
                },
            },
        },
    };

    if (stocks.length === 0) {
        return (
            <div className="w-full h-full flex justify-center items-center font-bold text-2xl p-5">
                No holdings
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            <Bar data={data} options={options} />
            <div className="flex flex-row justify-between items-center my-2">
                <span className="text-black text-2xl">
                    ₹
                    {stocks
                        .reduce(
                            (acc, stock) =>
                                acc +
                                (viewType === "investment"
                                    ? stock.amount
                                    : currentPrices.find(
                                          (currentStock) =>
                                              currentStock.symbol === stock.symbol
                                      ).price * stock.quantity
                                ),
                            0
                        )
                        .toLocaleString()}
                </span>
                <span className="text-secondary text-sm flex flex-row gap-2">
                    <input
                        type="radio"
                        name="view"
                        id="current"
                        className="bg-gray-100 rounded-md p-1"
                        checked={viewType === "current"}
                        onChange={() => setViewType("current")}
                    />
                    <label htmlFor="current" className="text-gray-500">
                        Current Value
                    </label>
                    <input
                        type="radio"
                        name="view"
                        id="investment"
                        className="bg-gray-100 rounded-md p-1"
                        checked={viewType === "investment"}
                        onChange={() => setViewType("investment")}
                    />
                    <label htmlFor="investment" className="text-gray-500">
                        Investment
                    </label>
                </span>
            </div>
        </div>
    );
};

export default HoldingsGraph;
