"use client";
import Link from "next/link";

export default function LandingPage() {
    return (
        <>
            <div className="landing-container flex justify-center items-center px-20">
                <div className="w-1/2 px-24 mr-16">
                    <div className="heading">
                        <div>
                            <p className="slide-up main-title">TRADE WITHOUT</p>
                        </div>
                        <div>
                            <p className="slide-up risk-text">RISK</p>
                        </div>
                        <p className="subtitle opacity-0 fade-in">
                            Master the stock market with our intuitive stock
                            simulator. Trade real-time stocks with virtual money
                            and sharpen your investing skills risk-free!
                        </p>
                    </div>
                    <div className="button-group flex">
                        <Link href="/register">
                            <button className="btn-primary">Get Started</button>
                        </Link>
                        <Link href="/login">
                            <button className="btn-secondary">Login</button>
                        </Link>
                    </div>
                </div>
                <div className="w-1/2 flex justify-center items-left pr-44">
                    <div className="grid grid-cols-2 gap-10">
                        <div className="feature-card feature-card-animation">
                            <h3>Risk Free Trading</h3>
                            <p>Practice trading with virtual money in a real market environment</p>
                        </div>
                        <div className="feature-card feature-card-animation">
                            <h3>Charts & Graphs</h3>
                            <p>Advanced technical analysis tools to make informed decisions</p>
                        </div>
                        <div className="feature-card feature-card-animation">
                            <h3>Watchlist</h3>
                            <p>Track your favorite stocks and never miss an opportunity</p>
                        </div>
                        <div className="feature-card feature-card-animation">
                            <h3>Portfolio</h3>
                            <p>Monitor your investments and track performance</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
