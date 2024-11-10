const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    funds: { type: Number, default: 500000 },
    holdings: { type: Array, default: [] },
    orders: { type: Array, default: [] },
    watchlist: { type: Array, default: [] },
    investments: { type: Array, default: [] },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
