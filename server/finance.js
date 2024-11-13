const yahooFinance = require('yahoo-finance2').default;
const fs = require("fs");

const search = async (query) => {
    const result = await yahooFinance.search(query);
    const searchData = [];
    result.quotes.forEach(quote => {
        const { exchDisp, shortname, isYahooFinance, longname } = quote;
        if(isYahooFinance)
            searchData.push({exchDisp, shortname, longname});
    });
    return searchData;
}

const getQuote = async (symbol) => {
    const result = await yahooFinance.quote(symbol);
    return result;
}

const getChartData = async (symbol, startDate, endDate = new Date()) => {
    const result = await yahooFinance.chart(symbol, { period1: startDate, period2: endDate });
    return result;
}

module.exports = { search, getQuote, getChartData };