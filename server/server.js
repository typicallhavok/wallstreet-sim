require("dotenv").config();

const express = require("express");
const next = require("next");
const path = require("path");
const {
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
} = require("./mongo");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { search, getQuote, getChartData, getPrice } = require("./finance");

const dev = process.env.NODE_ENV !== "production";
const app = next({
    dev,
    dir: "./src",
});
const handle = app.getRequestHandler();

insertNiftyCache().then((result) => {
    if (!result) {
        getChartData("^NSEI", "2018-01-01").then((result) =>
            insertCache("nifty-chart-data", JSON.stringify(result))
        ).catch((err) => {
            console.error("Error inserting nifty chart data:", err);
        });
    }
});

app.prepare()
    .then(() => {
        const secretKey = process.env.SECRET_KEY;
        const server = express();
        server.use(express.json());
        server.use(cookieParser());

        server.use(
            "/_next",
            express.static(path.join(__dirname, "../src/.next"))
        );

        server.use((req, res, next) => {
            const publicPaths = [
                "/",
                "/api/login",
                "/api/register",
                "/api/verify",
                "/login",
                "/register",
                "/_next",
                "/favicon.ico",
            ];

            const isPublicPath = publicPaths.some(
                (path) =>
                    req.path === path ||
                    req.path.startsWith("/_next/") ||
                    req.path.startsWith("/static/") ||
                    req.path.startsWith("/register") ||
                    req.path.startsWith("/login")
            );

            if (isPublicPath) {
                return next();
            }

            const token = req.cookies?.token;

            if (!token) {
                if (req.path.startsWith("/api/")) {
                    return res
                        .status(401)
                        .json({ message: "Authentication required" });
                }
                return res.redirect("/login");
            }

            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    if (req.path.startsWith("/api/")) {
                        return res
                            .status(401)
                            .json({ message: "Invalid token" });
                    }
                    return res.redirect("/login");
                }
                req.user = decoded;
                next();
            });
        });

        server.get("/_next/*", (req, res) => {
            return handle(req, res);
        });

        server.post("/api/register", async (req, res) => {
            const { name, username, password, email, gender } = req.body;
            const existingUser = await findUser(username);
            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: "Username already exists" });
            }
            const user = await insertUser(
                name,
                username,
                password,
                email,
                gender
            );
            if (user) {
                res.status(200).json({
                    message: "User registered successfully",
                    user: user,
                });
            } else {
                res.status(400).json({ message: "User registration failed" });
            }
        });

        server.post("/api/login", async (req, res) => {
            const { username, password } = req.body;
            const user = await findUser(username);
            if (user && (await argon2.verify(user.password, password))) {
                const token = jwt.sign({ username: user.username }, secretKey, {
                    expiresIn: "1h",
                });
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 3600000,
                });
                res.status(200).json({ message: "Login successful", user });
            } else {
                res.status(401).json({
                    message: "Invalid username or password",
                });
            }
        });

        server.post("/api/verify", (req, res) => {
            const token = req.cookies?.token;

            if (!token) {
                return res.status(200).json({
                    authenticated: false,
                    user: null,
                });
            }

            jwt.verify(token, secretKey, async (err, decoded) => {
                if (err) {
                    return res.status(200).json({
                        authenticated: false,
                        user: null,
                    });
                }
                user = await findUser(decoded.username);
                res.status(200).json({
                    authenticated: true,
                    user: user,
                });
            });
        });

        server.get("/api/logout", (req, res) => {
            res.clearCookie("token");
            res.status(200).json({ message: "Logout successful" });
        });

        server.get("/api/search", async (req, res) => {
            const { q } = req.query;
            const result = await search(q);
            if (result) res.status(200).json(result);
            else res.status(400).json({ message: "Failed to search" });
        });

        server.get("/api/getNiftyChartData", async (req, res) => {
            const result = await findCache("nifty-chart-data");
            res.status(200).json(result.value);
        });

        server.get("/api/getChart/:symbol", async (req, res) => {
            const { symbol } = req.params;
            const result = await getChartData(symbol, "2018-01-01");
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message:
                        "No data found for this symbol. It may be delisted or invalid.",
                });
            }
        });

        server.get("/api/pin", async (req, res) => {
            const { symbol } = req.query;
            const result = await pinStock(symbol, req.user.username);
            if (result) res.status(200).json(result);
            else res.status(400).json({ message: "Failed to pin stock" });
        });

        server.get("/api/unpin", async (req, res) => {
            const { symbol } = req.query;
            const result = await unpinStock(symbol, req.user.username);
            if (result) res.status(200).json(result);
            else res.status(400).json({ message: "Failed to unpin stock" });
        });

        server.post("/api/buy/:symbol", async (req, res) => {
            const { symbol } = req.params;
            const { quantity, date } = req.body;
            if(quantity<1) return res.status(400).json({ message: "Invalid quantity" });
            const username = req.user.username;
            const stockQuote = await getQuote(symbol);
            let price = stockQuote.regularMarketPrice;
            if (date) {
                if (date <= new Date().toISOString().split("T")[0]) {
                    price = await getPrice(symbol, date);
                } else {
                    return res.status(400).json({ message: "Invalid date" });
                }
            }
            if (!stockQuote) {
                return res.status(400).json({ message: "Failed to get quote" });
            }
            const result = await buyStock(
                symbol,
                quantity,
                username,
                date,
                price,
                stockQuote.shortName
            );
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(400).json({ message: "Failed to buy stock" });
            }
        });

        server.get("/api/getQuote/:symbol", async (req, res) => {
            const { symbol } = req.params;
            const result = await getQuote(symbol);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message:
                        "No data found for this symbol. It may be delisted or invalid.",
                });
            }
        });

        server.post("/api/sell/:symbol", async (req, res) => {
            const { symbol } = req.params;
            const { quantity } = req.body;
            if(quantity<1) return res.status(400).json({ message: "Invalid quantity" });
            const username = req.user.username;
            const stockQuote = await getQuote(symbol);
            const result = await sellStock(
                symbol,
                quantity,
                username,
                stockQuote.regularMarketPrice,
                stockQuote.shortName
            );
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(400).json({ message: "Failed to sell stock" });
            }
        });

        server.get("/api/getPrice/:symbol", async (req, res) => {
            const { symbol } = req.params;
            const { date } = req.query;
            const result = await getPrice(symbol, date);

            if (result !== null) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message:
                        "No price data found for this symbol. It may be delisted or invalid.",
                });
            }
        });

        server.get("/api/users/addFunds", async (req, res) => {
            const { amount } = req.query;
            const result = await addFunds(Number(amount), req.user.username);
            res.status(200).json(result);
        });

        server.all("*", (req, res) => {
            return handle(req, res);
        });

        const port = process.env.PORT || 3000;
        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error starting server:", err);
        process.exit(1);
    });
