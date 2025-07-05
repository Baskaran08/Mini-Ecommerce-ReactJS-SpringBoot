import React from 'react'
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import axiosInstance from '../Utils/axiosInstance';
import { toast } from 'react-toastify';



const AddEditProducts = ({onClose,type,product,fetchProducts}) => {

    const [name,setName]=useState(product?.name || "");
    const [description,setDescription]=useState(product?.description || "");
    const [image,setImage]=useState(product?.img_url) || "";
    const [basePrice,setBasePrice]=useState(product?.base_price || 0);
    const [discount,setDiscount]=useState(product?.discount || 0);
    const [stock,setStock]=useState(product?.stock || 0);
    const [rating,setRating]=useState(product?.rating || 0);
    const [category,setCategory]=useState(product?.category || "");
    const [error,setError]=useState("")


    const addNewProduct=async()=>{

        try{

            const response=await axiosInstance.post("/products",{
                name,
                description,
                img_url:image,
                base_price:basePrice,
                discount,
                stock,
                rating,
                category
            })

            if(response.data && response.data.product){
                fetchProducts()
                onClose()
                toast.success("Product added successfully!")
            }
        }
        catch(error){
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)
            }
        }
    }

    //Edit note

    const EditProduct=async()=>{

        const productId=product.id;
        try{

            const response=await axiosInstance.put("/products/"+productId,{
                name,
                description,
                img_url:image,
                base_price:basePrice,
                discount,
                stock,
                rating,
                category
            })

            if(response.data && response.data.product){
                fetchProducts()
                onClose()
                toast.success("Product updated successfully!")
            }
        }
        catch(error){
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)
            }
        }
    }

    const handleAddEditNote=()=>{
        if(!name){
            setError("Please enter a name")
            return
        }
        if(!description){
            setError("Please enter a description")
            return
        }

        if(!image){
            setError("Please enter a image")
            return
        }
        if(!basePrice){
            setError("Please enter a base price")
            return
        }
        if(basePrice<0){
            setError("Base Price should br greater than 0")
            return
        }
        if(!discount){
            setError("Please enter a discount")
            return
        }
        if(discount<0 || discount>100){
            setError("Discount should be between 0 and 100")
            return
        }
        if(!stock){
            setError("Please enter a stock")
            return
        }
        if(stock<0){
            setError("Stock should be greater than 0 ")
            return
        }
        if(!rating){
            setError("Please enter a rating")
            return
        }
        if(rating<1 || rating>5){
            setError("Rating should be between 1 and 5")
            return
        }
        if(!category){
            setError("Please select a category")
            return
        }
        
        setError("")

        if(type=="edit"){
            EditProduct()
        }
        else{
            addNewProduct()
        }
    }

    return (
        <div>
            <div className=' p-8 relative  '>
                <h1 className='text-2xl font-semibold'>{type=="edit"?"Edit Product":"Add New Product"}</h1>
                <button className='absolute top-6 right-8 cursor pointer' onClick={onClose}><IoMdClose className='text-3xl'/></button>
                <div className='flex flex-col mt-6'>
                    <div className='w-full'>
                        <label className='text-gray-500 ' htmlFor="">Product Name</label>
                        <input type="text" name="" id=""  value={name} onChange={(e) => setName(e.target.value)} className='bg-gray-100 w-full p-2 outline-none border rounded border-gray-200 my-2' />
                    </div>
                    <div  className='w-full'>
                        <label className='text-gray-500 ' htmlFor="">Product Description</label>
                        <textarea name="" id="" cols="30" rows="5"  value={description} onChange={(e) => setDescription(e.target.value)} className='bg-gray-100 p-2 w-full outline-none border rounded border-gray-200 my-2'></textarea>
                    </div>
                    <div  className='w-full'>
                        <label className='text-gray-500 ' htmlFor="">Product Image </label>
                        <input type="text" name="" id=""  value={image} onChange={(e) => setImage(e.target.value)} className='bg-gray-100 p-2 outline-none border w-full rounded border-gray-200 my-2' />
                    </div>
                    <div className='w-full flex gap-4 items-center'>
                        <div  className='w-full'>
                            <label className='text-gray-500 ' htmlFor="">Base Price</label>
                            <input type="text" name="" id=""  value={basePrice} onChange={(e) => setBasePrice(Number(e.target.value))} className='bg-gray-100 w-full p-2 outline-none border rounded border-gray-200 my-2' />
                        </div>
                        <div  className='w-full'>
                            <label className='text-gray-500 ' htmlFor="">Discount</label>
                            <input type="text" name="" id=""  value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className='bg-gray-100 w-full p-2 outline-none border rounded border-gray-200 my-2' />                       
                        </div>
                    </div>
                    <div className='w-full flex gap-4 items-center'>
                        <div  className='w-full'>
                            <label className='text-gray-500 ' htmlFor="">Stock</label>
                            <input type="text" name="" id=""  value={stock} onChange={(e) => setStock(Number(e.target.value))}  className='bg-gray-100 w-full p-2 outline-none border rounded border-gray-200 my-2'/>
                        </div>
                        <div  className='w-full'>
                            <label className='text-gray-500 ' htmlFor="ratings">Ratings</label>
                            <input type="text" name="ratings" id="ratings"  value={rating} onChange={(e) => setRating(Number(e.target.value))}  className='bg-gray-100 w-full p-2 outline-none border rounded border-gray-200 my-2' />
                        </div>
                    </div>
                    <div className='flex flex-col my-2'>
                        <label className='text-gray-500 mb-2' htmlFor="">Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className='bg-gray-100 outline-none border border-gray-200 rounded p-1 text-gray-700 focus:outline-none  focus:ring-1 focus:ring-gray-400' name="Category" id="Category">
                            <option value="" disabled>Select a category</option>
                            <option className='text-gray-500' value="mens">Mens</option>
                            <option className='text-gray-500' value="womens">Womens</option>
                            <option className='text-gray-500' value="electronics">Electronics</option>
                        </select>
                    </div>
                    
                </div>
                {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}
                <div className='my-4'>
                    <button className='bg-green-600 text-white px-4 py-2 rounded w-full sm:max-w-[400px]' onClick={handleAddEditNote}>{type==='add' ? 'Add Product' : 'Update'}</button>
                </div>
            </div>
        </div>
    )
}

export default AddEditProducts