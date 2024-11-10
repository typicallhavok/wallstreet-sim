const mongoose = require("mongoose");
const argon2 = require("argon2");
const { User } = require("./models");

const uri = "mongodb://127.0.0.1:27017/stonks";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const insertUser = async (
    insertUser,
    insertPassword,
    mailid,
    gender,
) => {
    try {
        let user;
        user = new User({
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

module.exports = {
    insertUser,
    findUser,
};
