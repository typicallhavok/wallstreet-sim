require("dotenv").config();

const express = require("express");
const next = require("next");
const path = require("path");
const { insertUser, findUser, insertCache, findCache, insertNiftyCache, pinStock, unpinStock, buyStock, sellStock } = require("./mongo");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { search, getQuote, getChartData } = require("./finance");

const dev = process.env.NODE_ENV !== "production";
const app = next({
    dev,
    dir: "./src",
});
const handle = app.getRequestHandler();

insertNiftyCache().then(result => {
    if(result) {
        getChartData("^NSEI", "2018-01-01").then(result => insertCache("nifty-chart-data", JSON.stringify(result)));
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
            res.status(200).json(result);
        });

        server.get("/api/getNiftyChartData", async (req, res) => {
            const result = await findCache("nifty-chart-data");
            res.status(200).json(result.value);
        });

        server.get("/api/pin", async (req, res) => {
            const token = req.cookies?.token;
            if(!token) {
                return res.status(401).json({ message: "Authentication required" });
            }
            const { symbol, username } = req.query;
            const result = await pinStock(symbol, username);
            if(result)
                res.status(200).json(result);
            else
                res.status(400).json({ message: "Failed to pin stock" });
        });

        server.get("/api/unpin", async (req, res) => {
            const token = req.cookies?.token;
            if(!token) {
                return res.status(401).json({ message: "Authentication required" });
            }
            const { symbol, username } = req.query;
            const result = await unpinStock(symbol, username);
            if(result)
                res.status(200).json(result);
            else
                res.status(400).json({ message: "Failed to unpin stock" });
        });

        server.get("/api/stock/:symbol", async (req, res) => {
            const { symbol } = req.params;
            const result = await getQuote(symbol);
            res.status(200).json(result);
        });

        server.post("/api/buy/:symbol", async (req, res) => {
            const { symbol } = req.params;
            const { quantity } = req.body;
            const username = req.user.username;
            const stockQuote = await getQuote(symbol);
            const result = await buyStock(symbol, quantity, username, stockQuote.regularMarketPrice, stockQuote.shortName);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(400).json({ message: "Failed to buy stock" });
            }
        });

        server.get("/api/getQuote/:symbol", async (req, res) => {
            const { symbol } = req.params;
            const result = await getQuote(symbol);
            res.status(200).json(result);
        });

        server.post("/api/sell/:symbol", async (req, res) => {
            const { symbol } = req.params;
            const { quantity } = req.body;
            const username = req.user.username;
            const stockQuote = await getQuote(symbol);
            const result = await sellStock(symbol, quantity, username, stockQuote.regularMarketPrice, stockQuote.shortName);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(400).json({ message: "Failed to sell stock" });
            }
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
