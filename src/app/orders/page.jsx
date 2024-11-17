"use client";
import Watchlist from "../Components/Watchlist";
import { useAuth } from "../Contexts/AuthContext";
import ordersImg from "../assets/img/ordersIMG.png";
import Image from "next/image";
const Orders = () => {
    const { user } = useAuth();

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
        };
    };

    return (
        <>
            <div className="page-container">
                <div className="w-3/5 p-10 shadow-md">
                    <div className="text-4xl font-bold border-b-2 border-primary p-5 text-black flex flex-row">
                        <Image
                            src={ordersImg}
                            alt="Funds"
                            className="w-8 h-8 mr-3"
                        />
                        <p>Orders</p>
                    </div>

                    <div className="mt-6 font2 font-100 text-sm">
                        <div className="max-h-[600px] overflow-y-auto relative">
                            <table className="w-full">
                                <thead className="sticky top-0 bg-white">
                                    <tr className="text-center border-b-2 border-black text-[1.1rem]">
                                        <th className="py-3 px-4 w-[200px]">Name</th>
                                        <th className="py-3 px-4 text-center">Quantity</th>
                                        <th className="py-3 px-4 text-center">Total</th>
                                        <th className="py-3 px-4 text-center">Date</th>
                                        <th className="py-3 px-4 text-center">Type</th>
                                        <th className="py-3 px-4 text-center">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user?.orders?.map((order, index) => {
                                        const { date, time } = formatDateTime(order.date);
                                        return (
                                            <tr key={index} className="border-b hover:bg-gray-50 shadow-md">
                                                <td className="py-4 px-4 w-[200px] relative group">
                                                    <div className="truncate">
                                                        {order.name}
                                                        <span className="hidden group-hover:block absolute bg-gray-800 text-white p-2 rounded -mt-1 ml-2 text-sm z-10 whitespace-normal">
                                                            {order.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-center">{order.quantity}</td>
                                                <td className="py-4 px-4 text-center">{order.amount.toFixed(2)}</td>
                                                <td className="py-4 px-4 text-center relative group">
                                                    <span>{date}</span>
                                                    <span className="hidden group-hover:block absolute bg-gray-800 text-white p-2 rounded -mt-1 ml-2 text-sm z-10">
                                                        {time}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-center">{order.type}</td>
                                                <td className="py-4 px-4 text-center">{order.price.toFixed(2)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Watchlist />
            </div>
        </>
    );
};

export default Orders;
