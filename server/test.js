const { insertNiftyCache, insertCache } = require("./mongo");
const { getChartData } = require("./finance");
c

insertNiftyCache().then(result => {
    if(result) {
        yahooFinance.chart(symbol, { startDate, endDate }).then(result => insertCache("nifty-chart-data", JSON.stringify(result)));
    }
});