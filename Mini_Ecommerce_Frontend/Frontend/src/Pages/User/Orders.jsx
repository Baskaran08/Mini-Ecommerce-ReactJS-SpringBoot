import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../Components/Navbar'
import axiosInstance from '../../Utils/axiosInstance'
import OrderCard from '../../Components/OrderCard'

const Orders = () => {

    const [orders, setOrders] = useState([])

    const fetchOrders = async() => {
        try{
            const response = await axiosInstance.get("/orders")
            if(response.data && response.data.orders){
                setOrders(response.data.orders)
                console.log(response.data.orders)
            }
            }
        catch(error){
                console.log("An Unexpected error occured. please try again!")
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])


    return (
  <div>
    {orders.length > 0 ? (
      <div className="mx-auto px-6 sm:px-8 lg:px-12 max-w-[1536px] my-12">
        <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {orders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center py-16 text-center px-6">
            <img
            src="/assets/EmptyOrder.jpg"
            alt="No Orders"
            className="w-72 sm:w-96 max-w-full h-auto object-contain mb-6"
            />
            <h2 className="text-2xl sm:text-3xl font-semibold text-red-500 mb-2">
            No Orders Found
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
            You haven’t placed any orders yet.
            </p>
            <Link
            to="/home"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition-all duration-300"
            >
            Start Shopping
            </Link>
      </div>
        )}
  </div>
);

}

export default Orders