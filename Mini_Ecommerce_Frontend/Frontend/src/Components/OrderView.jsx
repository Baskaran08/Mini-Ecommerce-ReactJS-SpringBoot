import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";

const OrderView = ({onClose,order}) => {

    if (!order)
         return null;

    return (
        <div >
            <div className=' p-6 '>
                <div className='flex items-center justify-between border-b pb-4 mb-4'>
                    <div>
                        <h2 className='text-xl font-semibold'>Order #{order.id}</h2>
                        <p className='text-gray-600'>Order Placed On: {new Date(order.orderDate).toLocaleString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                            })}
                        </p>
                    </div>
                    <button onClick={onClose} className='text-gray-600 hover:text-gray-800 transition-all duration-150'><IoMdClose className='text-3xl'/></button>
                </div>
                
                <div className='mt-4   p-4  '>
                    <div className='border border-gray-200   rounded mb-4 overflow-y-auto max-h-[300px]'>
                        {
                            order.orderItems.map((item, itemIndex) => {
                                return (
                                    <div key={itemIndex} className='flex flex-col sm:flex-row items-center justify-between border-b  rounded p-4  gap-6 sm:gap-10 border-gray-200'>
                                        <div className='flex flex-row items-center gap-8'>
                                            <img src={item.product.img_url} alt={item.product.name} className='w-24 h-24 object-contain aspect-square rounded' />
                                            <div>
                                                <Link to={`/product/${item.product.id}`}><h3 className='text-lg font-medium line-clamp-3 sm:line-clamp-none hover:text-red-500 transition-all duration-150'>{item.product.name}</h3></Link>
                                                <p className='text-gray-500'>Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className='text-lg font-semibold ml-12 whitespace-nowrap'>₹ {(item.price).toLocaleString('en-IN')}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='flex justify-start items-center w-full'>
                    <div className='flex flex-col gap-4 px-16 py-8 w-full sm:max-w-[500px]'>
                    <p className='flex items-center justify-between text-gray-500'>
                        <span>SubTotal</span>
                        <span>
                        ₹{Number(order.orderItems.reduce(
                            (acc, item) => acc + (item.product.base_price * item.quantity),
                            0
                        )).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                    </p>

                    <p className='flex items-center justify-between text-gray-500'>
                        <span>Discount</span>
                        <span>
                        ₹{Number(order.orderItems.reduce(
                            (acc, item) => acc + ((item.product.base_price - item.product.price) * item.quantity),
                            0
                        )).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                    </p>

                    <p className='flex items-center justify-between font-semibold border-t border-gray-300 pt-4'>
                        <span>Total Price</span>
                        <span>
                        ₹{Number(order.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                    </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OrderView