import React from 'react'
import AdminLayout from './AdminLayout'
import StatCard from './../../Components/StatCard'
import { BsGraphUpArrow } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { TfiPackage } from "react-icons/tfi";
import { useEffect, useState } from 'react';
import axiosInstance from '../../Utils/axiosInstance';

const AdminDashBoard = () => {

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const fetchOrders = async () => {
		try{
        const response = await axiosInstance.get("/orders/all")
        if(response.data && response.data.orders){
            setOrders(response.data.orders)
            console.log(response.data.orders)
        }
        }
        catch(error){
            console.log("An Unexpected error occured. please try again!")
        }
	}
    const fetchProducts=async()=>{
        try{
        const response = await axiosInstance.get("/products")
        if(response.data && response.data.products){
            setProducts(response.data.products)
            console.log(response.data.products)
        }
        }
        catch(error){
            console.log("An Unexpected error occured. please try again!")
        }
    }

    const fetchUsers=async()=>{
        try{
        const response = await axiosInstance.get("/admin/users")
        if(response.data ){
            setUsers(response.data)
            console.log(response.data)
        }
        }
        catch(error){
            console.log("An Unexpected error occured. please try again!")
        }
    }

	useEffect(()=>{
		fetchOrders()
        fetchProducts()
        fetchUsers()
	},[])


    return (
      <AdminLayout>
          <div className=' flex justify-center items-center'>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-4">
                  <StatCard title="Total Products" value={products.length} icon={<BsGraphUpArrow/>} link={"/admin/products"} />
                  <StatCard title="Total Orders" value={orders.length} icon={<TfiPackage/>} link={"/admin/orders"} />
                  <StatCard title="Revenue" value={`₹ ${orders.reduce((acc, order) => acc + order.totalAmount, 0).toLocaleString('en-IN')}`} icon={<RiMoneyRupeeCircleLine/>}  />
                  <StatCard title="Users" value={users.length} icon={<LuUsers/>} link={"/admin/users"} />
              </div>
          </div>
          
      </AdminLayout>
    )
}

export default AdminDashBoard