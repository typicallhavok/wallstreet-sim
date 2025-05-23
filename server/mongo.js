const mongoose = require("mongoose");
const argon2 = require("argon2");
const { User, Cache } = require("./models");

const uri = "mongodb://127.0.0.1:27017/stonks";

mongoose.connect(uri);

const insertUser = async (name, insertUser, insertPassword, mailid, gender) => {
    try {
        let user;
        user = new User({
            name: name,
            username: insertUser,
            password: await argon2.hash(insertPassword),
            email: mailid,
            gender: gender,
        });

        const result = await user.save();
        return result;
    } catch (error) {
        console.error("Error inserting user:", error);
    }
};

const findUser = async (username) => {
    try {
        const res = await User.findOne({ username: username });
        return res || false;
    } catch (error) {
        console.error("Error reading from database:", error);
    }
};

const insertCache = async (key, value) => {
    try {
        const existingCache = await findCache(key);
        if (existingCache) {
            existingCache.value = value;
            const result = await existingCache.save();
            return result;
        }
        const cache = new Cache({ key, value });
        const result = await cache.save();
        return result;
    } catch (error) {
        console.error("Error buying stock:", error);
        throw error;
    }
};

const findCache = async (key) => {
    const res = await Cache.findOne({ key });
    return res || false;
};

const insertNiftyCache = async () => {
    try {
        const existingCache = await findCache("nifty-chart-data");
        if (existingCache && existingCache.value) {
            try {
                const parsedValue = JSON.parse(existingCache.value);
                if (parsedValue && parsedValue.meta && parsedValue.meta.regularMarketTime) {
                    const currDate = new Date().setHours(0, 0, 0, 0);
                    const cacheDate = new Date(parsedValue.meta.regularMarketTime).setHours(0, 0, 0, 0);
                    if (currDate > cacheDate) {
                        return true;
                    }
                } else {
                    // Missing expected structure in cache
                    return true;
                }
            } catch (parseError) {
                console.error("Error parsing cache value:", parseError);
                return true; // Return true to indicate cache needs refresh
            }
        } else {
            // No existing cache or empty value
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error checking nifty cache:", error);
        throw error;
    }
};

const pinStock = async (symbol, username) => {
    try {
        const user = await findUser(username);
        if (user) {
            if (user.watchlist.includes(symbol)) {
                return false;
            }
            user.watchlist.push(symbol);
            const result = await user.save();
            return result;
        }
        return false;
    } catch (error) {
        console.error("Error buying stock:", error);
        throw error;
    }
};

const unpinStock = async (symbol, username) => {
    try {
        const user = await findUser(username);
        if (user) {
            user.watchlist = user.watchlist.filter((item) => item !== symbol);
            const result = await user.save();
            return result;
        }
        return false;
    } catch (error) {
        console.error("Error buying stock:", error);
        throw error;
    }
};

const buyStock = async (symbol, quantity, username, date = new Date(), price, name) => {
    date = new Date(date);
    quantity = parseInt(quantity);
    try {
        if (!symbol || !quantity || !username || !price || !name) {
            throw new Error("Missing required parameters");
        }

        if (quantity <= 0 || price <= 0) {
            throw new Error("Quantity and price must be positive");
        }

        const user = await findUser(username);
        const amount = price * quantity;

        if (!user) {
            return false;
        }

        if (user.funds < amount) {
            throw new Error("Insufficient funds");
        }

        const existingHolding = user.holdings.find(
            (item) => item.symbol === symbol
        );
        if (existingHolding) {
            existingHolding.quantity += quantity;
            existingHolding.amount += amount;
            existingHolding.dates.push({ quantity, date });
            user.markModified("holdings");
        } else {
            user.holdings.push({
                symbol,
                quantity,
                name,
                dates: [{ quantity, date }],
                amount,
            });
        }

        user.orders.push({
            symbol,
            quantity,
            price,
            name,
            date,
            type: "buy",
            amount,
        });
        user.funds -= amount;

        user.markModified("holdings");
        user.markModified("orders");
        user.markModified("funds");

        const result = await user.save();
        return result;
    } catch (error) {
        console.error("Error buying stock:", error);
        throw error;
    }
};

const sellStock = async (symbol, quantity, username, price, name) => {
    quantity = parseInt(quantity);
    try {
        if (!symbol || !quantity || !username || !price || !name) {
            throw new Error("Missing required parameters");
        }

        if (quantity <= 0 || price <= 0) {
            throw new Error("Quantity and price must be positive");
        }

        const user = await findUser(username);
        const amount = price * quantity;

        if (!user) {
            return false;
        }

        const existingHolding = user.holdings.find(
            (item) => item.symbol === symbol
        );
        if (existingHolding) {
            if (quantity > existingHolding.quantity) {
                throw new Error("Insufficient quantity");
            }
            existingHolding.quantity -= quantity;
            if (existingHolding.quantity === 0) {
                user.holdings = user.holdings.filter(
                    (item) => item.symbol !== symbol
                );
            }
            existingHolding.amount -= amount;

            user.markModified("holdings");
        } else {
            return false;
        }

        user.orders.push({
            symbol,
            quantity,
            price,
            name,
            date: new Date(),
            type: "sell",
            amount,
        });
        user.funds += amount;

        user.markModified("holdings");
        user.markModified("orders");
        user.markModified("funds");

        const result = await user.save();
        return result;
    } catch (error) {
        console.error("Error buying stock:", error);
        throw error;
    }
};

const addFunds = async (amount, username) => {
    try {
        const user = await findUser(username);
        user.funds += amount;
        user.orders.push({
            symbol: "FUNDS",
            quantity: amount,
            price: 0,
            name: "Funds",
            date: new Date(),
            type: "addFunds",
            amount,
        });
        const result = await user.save();
        return result;
    } catch (error) {
        console.error("Error buying stock:", error);
        throw error;
    }
};

module.exports = {
    insertUser,
    findUser,
    insertCache,
    findCache,
    insertNiftyCache,
    pinStock,
    unpinStock,
    buyStock,
    sellStock,
    addFunds,
};
