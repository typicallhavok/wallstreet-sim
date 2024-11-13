const { insertNiftyCache, insertCache } = require("./mongo");
const yahooFinance = require("yahoo-finance2").default;
const fs = require("fs");

yahooFinance.quote("RELIANCE.NS").then((result) => {
    fs.writeFileSync("quotes.json", JSON.stringify(result));
    console.log("done");
});
