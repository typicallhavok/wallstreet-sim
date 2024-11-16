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
import { subMonths } from "date-fns";
import { useState, useEffect } from "react";

ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const StockChart = ({setError}) => {
    const [quotes, setQuotes] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/getNiftyChartData");
                const data = await res.json();
                const parsedData = JSON.parse(data).quotes;
                setQuotes(parsedData);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    if (!quotes) return null;

    const fiveMonthsAgo = subMonths(new Date(), 5);
    const recentQuotes = quotes.filter(
        (quote) => new Date(quote.date) >= fiveMonthsAgo
    );

    const chartData = {
        labels: recentQuotes.map((quote) => new Date(quote.date)),
        datasets: [
            {
                label: "NIFTY 50",
                data: recentQuotes.map((quote) => quote.close),
                borderColor: "rgb(66, 133, 244)",
                backgroundColor: "rgb(66, 133, 244)",
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "month",
                    displayFormats: {
                        month: "MMM yy",
                    },
                },
                grid: {
                    display: false,
                },
                ticks: {
                    maxTicksLimit: 5,
                    color: "rgba(0, 0, 0, 0.5)",
                },
            },
            y: {
                grid: {
                    display: true,
                    drawBorder: false,
                    color: "rgba(0, 0, 0, 0.1)",
                },
                ticks: {
                    maxTicksLimit: 4,
                    color: "rgba(0, 0, 0, 0.5)",
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'chartArea',
                align: 'start',
                labels: {
                    boxWidth: 12,
                    color: 'rgb(102, 102, 102)',
                    padding: 20,
                    font: {
                        size: 12
                    }
                },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: (tooltipItems) => {
                        const date = new Date(tooltipItems[0].parsed.x);
                        return date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        });
                    },
                    label: (context) => {
                        return `₹${context.parsed.y.toLocaleString()}`;
                    }
                },
                padding: 5,
                displayColors: false,
            }
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
        <div className="h-[15rem] w-[80%] mx-auto">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default StockChart;
