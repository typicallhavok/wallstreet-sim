import fs from "fs";

import { NseIndia } from  "stock-nse-india";
const  nse = new  NseIndia()
// To get all symbols from NSE


nse.getAllStockSymbols().then(symbols => {
    fs.writeFileSync("symbols.json", JSON.stringify(symbols, null, 2));
})