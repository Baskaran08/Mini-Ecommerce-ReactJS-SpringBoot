import React from 'react'
import { Link } from 'react-router-dom'


const CartItemCard = ({item,kIndex,addQuantity,subtractQuantity,removeCartItem}) => {
  return (
   <div   className='flex flex-col md:flex-row items-center justify-between my-4 border-b pb-4 border-gray-300 p-4 gap-4 space-y-4 md:space-y-0'>
        <div className='flex-3 flex items-center gap-4'>
            <img src={item.product.img_url} alt={item.product.name} className='w-32 h-32 object-contain aspect-square' />
            <div>
                <Link to={`/product/${item.product.id}`} ><h2 className='text-xl font-semibold line-clamp-5 sm:line-clamp-none hover:text-red-500 transition-colors duration-150'>{item.product.name}</h2></Link>
                <p className='text-gray-500 text-sm'>Only {item.product.stock} left in stock - order soon</p>
                <p>
                    <span className='text-sm line-through font-normal text-gray-500'>
                        {`₹ ${Number(item.product.base_price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                    </span>
                    <span className='ml-2 font-semibold my-2 text-lg'>
                        {`₹ ${Number(item.product.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                    </span>
                    <span className='text-green-600 ml-2'>
                        {item.product.discount}% Off
                    </span>
                </p>
                <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
            </div>
        </div>
        <div className='flex-1 flex items-center justify-end gap-4'>
            <div className='flex items-center gap-2 border border-gray-300 rounded'>
                <button className='p-2 px-4  font-semibold cursor-pointer ' onClick={()=>subtractQuantity(kIndex)}>-</button>
                <input className='w-6 text-center outline-none font-semibold  text-gray-600'  type="text" name="" id="" value={item.quantity} />
                <button className='p-2 px-4  font-semibold cursor-pointer ' onClick={()=>addQuantity(kIndex)}>+</button>
            </div>
            <button className='text-red-500 px-4 py-2 rounded hover:underline underline-offset-4' onClick={()=>removeCartItem(item.id)}><Link>Remove</Link></button>
        </div>
    </div> 
  )
}

export default CartItemCard