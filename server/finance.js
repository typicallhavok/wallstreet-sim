const yahooFinance = require("yahoo-finance2").default;
const fs = require("fs");

const search = async (query) => {
    const result = await yahooFinance.search(query);
    const searchData = [];
    result.quotes.forEach((quote) => {
        const { exchDisp, shortname, isYahooFinance, longname, symbol } = quote;
        if (isYahooFinance)
            searchData.push({ exchDisp, shortname, longname, symbol });
    });
    return searchData;
};

const getQuote = async (symbol) => {
    try {
        const result = await yahooFinance.quote(symbol);
        return result;
    } catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error.message);
        return null;
    }
};

const getChartData = async (symbol, startDate, endDate = new Date()) => {
    try {
        const result = await yahooFinance.chart(symbol, {
            period1: startDate,
            period2: endDate,
        });
        return result;
    } catch (error) {
        console.error(`Error fetching chart data for ${symbol}:`, error.message);
        return null;
    }
};

const getPrice = async (symbol, date) => {
    try {
        if (!date) {
            const result = await yahooFinance.quote(symbol, {
                fields: ["regularMarketPrice"],
            });
            return result.regularMarketPrice;
        } else {
            const startDate = new Date(date);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 1);
            const result = await yahooFinance.chart(symbol, {
                period1: startDate,
                period2: endDate,
            });
            return result.quotes[0]?.close || null;
        }
    } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error.message);
        return null;
    }
};

module.exports = { search, getQuote, getChartData, getPrice };
