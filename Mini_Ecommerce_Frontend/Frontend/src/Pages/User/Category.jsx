import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import { useParams } from 'react-router-dom'
import Card from '../../Components/Card';
import axiosInstance from '../../Utils/axiosInstance';

const Category = () => {

    const [category, setCategory] = useState([])
    const {productCategory}=useParams();

    const fetchCategory=async()=>{
        try{
            const response = await axiosInstance.get("/products/category/"+productCategory)
            if(response.data && response.data.data){
                setCategory(response.data.data)
                console.log(response.data.data)
            }
            }
        catch(error){
                console.log("An Unexpected error occured. please try again!")
        }
    }

    useEffect(()=>{
        fetchCategory()
    },[])

    return (
        <div>
            <div className='mx-auto px-8 sm:px-6 lg:px-8 xl:px-12 max-w-[1536px] my-8'>
                <div className='text-center mx-auto border-b-2 border-gray-200 pb-4'>
                    <h1 className='text-2xl text-red-500 font-semibold mt-12 '>{productCategory=="mens"?"Men's Clothing":productCategory=="womens"?"Women's Clothing":"Electronics"}</h1>
                    <p className='text-gray-500 mt-4 my-8 text-lg'>
                        {
                            productCategory === 'mens' ? "Explore the latest in men's fashion with our curated collection of stylish and comfortable apparel. From casual T-shirts to formal shirts, versatile joggers to traditional wear, find outfits that fit every mood, season, and occasion. Upgrade your wardrobe with trend-setting designs and timeless classics made for modern men."
                            :productCategory === 'womens' ? "Discover your perfect look with our wide range of women's fashion. Whether you're dressing up for a wedding, lounging in comfort, or heading to work, we've got you covered with elegant kurtis, trendy western wear, traditional sarees, and cozy nightwear. Style meets comfort in every piece, crafted to make you feel confident and beautiful.":
                            "Find the best deals on the latest electronics and smart gadgets. From powerful laptops and headphones to health trackers and gaming consoles, our electronics section brings you top-tier brands and cutting-edge technology. Whether you’re working, gaming, or staying fit, power up your life with innovative and reliable tech."
                        }
                    </p>
                </div>
                {/* Category Data */}

                <div className='mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
                        {category.map(product => (
                            <Card key={product.id} product={product} />
                        ))}
                </div>
            </div>
            
        </div>
    )
}

export default Category