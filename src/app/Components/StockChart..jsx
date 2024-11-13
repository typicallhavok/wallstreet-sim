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
import "chartjs-adapter-date-fns";
import { useState, useEffect } from "react";

// Register Chart.js components
ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart = ({ quotes }) => {
    // Exit if data is not yet loaded
    if (!quotes) return null;

    // Format the data for Chart.js
    const chartData = {
        labels: quotes.map((quote) => new Date(quote.date)),
        datasets: [
            {
                label: "Open Price",
                data: quotes.map((quote) => quote.open),
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: false,
            },
            {
                label: "Close Price",
                data: quotes.map((quote) => quote.close),
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                fill: false,
            },
            {
                label: "High Price",
                data: quotes.map((quote) => quote.high),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                fill: false,
            },
            {
                label: "Low Price",
                data: quotes.map((quote) => quote.low),
                borderColor: "rgb(153, 102, 255)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                fill: false,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "month",
                },
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Price (USD)",
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default StockChart;
