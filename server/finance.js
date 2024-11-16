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
    const result = await yahooFinance.quote(symbol);
    return result;
};

const getChartData = async (symbol, startDate, endDate = new Date()) => {
    const result = await yahooFinance.chart(symbol, {
        period1: startDate,
        period2: endDate,
    });
    return result;
};

const getPrice = async (symbol, date) => {
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
        return result.quotes[0].close;
    }
};

module.exports = { search, getQuote, getChartData, getPrice };
