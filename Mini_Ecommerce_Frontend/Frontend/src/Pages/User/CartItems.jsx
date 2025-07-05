import React, { use } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../Utils/axiosInstance'
import { CartContext } from '../../context/CartContext'
import { useContext } from "react";
import CartItemCard from '../../Components/CartItemCard'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'


const CartItems = () => {

    const [cartItems, setCartItems] = useState([])
    const { AllCartItems, setAllCartItems } = useContext(CartContext);

    const fetchCartItems =  async() => {
        try{
            const response = await axiosInstance.get("/cart")
            if(response.data && response.data.cartItems){
                setCartItems(response.data.cartItems)
                console.log(response.data.cartItems)
            }
        }
        catch(error){
                console.log("An Unexpected error occured. please try again!")
        }
    }

    useEffect(() => {   
        fetchCartItems()
    }, [])

    const addQuantity = async (index) => {
        const updatedCart = cartItems.map((item, idx) => {
            if (idx === index) {
                // Check if stock allows increment
                if (item.quantity < item.product.stock) {
                    return { ...item, quantity: item.quantity + 1 };
                }
            }
            return item;
        });

        // Get the updated item to update on backend
        const newItem = updatedCart[index];

        try {
            const response = await axiosInstance.put(`/cart/${newItem.id}`, {
                quantity: newItem.quantity,
            });
            if (response.data && response.data.message) {
                console.log("Cart updated successfully");
                setCartItems(updatedCart);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again!");
        }
    };

    const subtractQuantity = async (index) => {
        const updatedCart = cartItems.map((item, idx) => {
            if (idx === index) {
            // Don't go below quantity 1
            if (item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            }
            return item;
        });

        const newItem = updatedCart[index];

            try {
                const response = await axiosInstance.put(`/cart/${newItem.id}`, {
                    quantity: newItem.quantity,
                });
                if (response.data && response.data.message) {
                    console.log("Cart updated successfully");
                    setCartItems(updatedCart);
                }
            } catch (error) {
                console.log("An unexpected error occurred. Please try again!");
        }
    };

    const removeCartItem = async (cartId) => {
        try {
            const response = await axiosInstance.delete(`/cart/${cartId}`);
            if (response.data?.message) {
            console.log("Cart item removed");
            const updatedCart = cartItems.filter((item) => item.id !== cartId);
            setCartItems(updatedCart);
            toast.success("Product removed from cart successfully!");
        }
        } catch (error) {
            console.log("Error removing item:", error);
        }
    };

    const placeOrder=async()=>{
        try{
            const response=await axiosInstance.post("/orders")
            if(response.data && response.data.message){
                console.log("order placed successfully")
                fetchCartItems()
                toast.success("Order placed successfully!");
            }
        }
        catch(error){
            console.log("An Unexpected error occured. please try again!")
        }
    }

    useEffect(()=>{
        setAllCartItems(cartItems)
    },[cartItems])

    return (

        <div>
            {cartItems.length==0?
                <div className="flex flex-col items-center justify-center text-center mx-auto px-6 sm:px-8 lg:px-12 max-w-[1536px] py-16">
                    <img
                        src="/assets/emptyCart.png"
                        alt="Empty Cart"
                        className="w-72 sm:w-96 md:w-[450px] max-w-full h-auto object-contain mb-8"
                    />
                    <h1 className="text-3xl sm:text-4xl font-bold text-red-500 mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">
                        Looks like you haven't added anything yet. Start shopping now!
                    </p>
                    <Link
                        to="/home"
                        className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-md transition-all duration-300"
                    >
                        Continue Shopping
                    </Link>
                </div>

            :
                <div className='mx-auto px-8 sm:px-6 lg:px-8 xl:px-12 max-w-[1536px]'>
                    <div className='bg-white flex  flex-col lg:flex-row mt-12 mb-8 gap-4'>
                        <div className='flex-2  shadow border border-gray-200 p-8 w-full'>
                            <h1 className='text-3xl font-semibold mb-12 border-b pb-4 border-gray-400'>Your Cart</h1>
                            <div>
                                {
                                    cartItems.map((item,index)=>{
                                        return (
                                            <CartItemCard key={index} kIndex={index} item={item} addQuantity={addQuantity} subtractQuantity={subtractQuantity} removeCartItem={removeCartItem} /> 
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='flex-1 bg-white shadow border border-gray-200 w-full lg:max-h-[520px] xl:max-h-[500px]'>
                            <div className='px-24 py-4 border-b border-gray-300 flex items-center justify-center'>
                                <h1 className='text-2xl text-center font-semibold    '>Order Summary</h1 >
                            </div>
                            <div className='p-8 '>
                                <p className='text-lg  mb-4 flex justify-between'><span>Total Items</span><span>{cartItems.length}</span>  </p>
                                <p className='text-lg mb-4 flex justify-between'>
                                    <span>Price</span>
                                    <span>
                                        {`₹ ${Number(cartItems.reduce((acc, item) => acc + (item.product.base_price * item.quantity), 0))
                                        .toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                                    </span>
                                </p>

                                <p className='text-lg mb-4 flex justify-between'>
                                    <span>Discount</span>
                                    <span className='text-red-500'>
                                        - {`₹ ${Number(cartItems.reduce((acc, item) => acc + ((item.product.base_price - item.product.price) * item.quantity), 0))
                                        .toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                                    </span>
                                </p>
                                            
                                <p className='text-lg font-semibold mb-2 flex justify-between border-y mt-12 border-gray-200 py-4'>
                                    <span>Total Price</span>
                                    <span>
                                        {` ₹ ${Number(cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0))
                                        .toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                                    </span>
                                </p>

                                <p className='font-semibold text-green-600'>
                                    You will save
                                        <span className='ml-1'>
                                            {` ₹ ${Number(cartItems.reduce((acc, item) => acc + ((item.product.base_price - item.product.price) * item.quantity), 0))
                                            .toLocaleString('en-IN', { minimumFractionDigits: 2 })} `}
                                        </span>
                                     on this order
                                </p>

                                <button className='bg-red-500 mt-8 text-white px-6 py-2 rounded hover:bg-red-600 w-full' onClick={placeOrder}>Place Order</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            }           
        </div>
    )
}

export default CartItems