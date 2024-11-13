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
    const existingCache = await findCache(key);
    if (existingCache) {
        existingCache.value = value;
        const result = await existingCache.save();
        return result;
    }
    const cache = new Cache({ key, value });
    const result = await cache.save();
    return result;
};

const findCache = async (key) => {
    const res = await Cache.findOne({ key });
    return res || false;
};

const insertNiftyCache = async () => {
    const existingCache = await findCache("nifty-chart-data");
    if (existingCache) {
        const currDate = new Date().setHours(0, 0, 0, 0);
        const cacheDate = new Date(JSON.parse(existingCache.value).meta.regularMarketTime).setHours(0, 0, 0, 0);
        if (
            currDate > cacheDate
        ) {
            return true;
        }
    }
    return false;
};

const pinStock = async (symbol, username) => {
    const user = await findUser(username);
    if(user) {
        user.watchlist.push(symbol);
        const result = await user.save();
        return result;
    }
    return false;
}

const unpinStock = async (symbol, username) => {
    const user = await findUser(username);
    if(user) {
        user.watchlist = user.watchlist.filter(item => item !== symbol);
        const result = await user.save();
        return result;
    }
    return false;
}

module.exports = {
    insertUser,
    findUser,
    insertCache,
    findCache,
    insertNiftyCache,
    pinStock,
    unpinStock,
};
