import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState,useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import ImageSlider from '../../Components/ImageSlider';
import Card from '../../Components/Card';
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { BsHeadset } from "react-icons/bs";
import { AiOutlineSafety } from "react-icons/ai";
import axiosInstance from "../../Utils/axiosInstance";


const Home = () => {

    // Custom arrow components for the slider
    // These will be used to navigate through the slides

    const NextArrow = ({ onClick }) => (
        <div
            className="absolute right-8 w-10 h-10 flex items-center justify-center  top-0 transform -translate-y-12 z-10  bg-black text-white rounded-full shadow-md cursor-pointer hover:bg-red-600 transition-colors duration-150"
            onClick={onClick}
        >
            <FaChevronRight/>
        </div>
    );

    const PrevArrow = ({ onClick }) => (
        <div
            className="absolute right-20 w-10 h-10 flex items-center justify-center  top-0 transform -translate-y-12 z-10  bg-black text-white rounded-full shadow-md cursor-pointer hover:bg-red-600 transition-colors duration-150"
            onClick={onClick}
        >
            <FaChevronLeft/>
        </div>
    );

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
            breakpoint: 1280,
            settings: { slidesToShow: 4, slidesToScroll: 1 },
            },
            {
            breakpoint: 1024,
            settings: { slidesToShow: 3, slidesToScroll: 1 },
            },
            {
            breakpoint: 768,
            settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
            breakpoint: 600,
            settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };


    const mensSliderRef = useRef();
    const womensSliderRef = useRef();
    const electronicsSliderRef = useRef();

    useEffect(() => {
        const handleResize = () => {
            mensSliderRef.current?.slickGoTo(0);
            womensSliderRef.current?.slickGoTo(0);
            electronicsSliderRef.current?.slickGoTo(0);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [isClient, setIsClient] = useState(false);
        useEffect(() => {
        setIsClient(true);
    }, []);

    //////////////////////////////////////////////////////////////////////////////

    
    const [mensProducts, setMensProducts] = useState([]);
    const [womensProducts, setWomensProducts] = useState([]);
    const [ElectronicsProducts, setElectonicsProducts] = useState([]);
    
    const navigate = useNavigate();


    const fetchMensProducts= async()=>{
        try{
            const response = await axiosInstance.get("/products/category/mens")
            if(response.data && response.data.data){
                setMensProducts(response.data.data)
                console.log(response.data.data)
            }
            }
        catch(error){
                console.log("An Unexpected error occured. please try again!")
        }
    }

    const fetchWomensProducts=async()=>{
         try{
            const response = await axiosInstance.get("/products/category/womens")
            if(response.data && response.data.data){
                setWomensProducts(response.data.data)
                console.log(response.data.data)  
            }
            }
        catch(error){
                console.log("An Unexpected error occured. please try again!")
        }       
    }
    const fetchElectronicsProducts=async()=>{
        try{
            const response = await axiosInstance.get("/products/category/electronics")
            if(response.data && response.data.data){
                setElectonicsProducts(response.data.data)
                console.log(response.data.data)  
            }
            }
        catch(error){
                console.log("An Unexpected error occured. please try again!")
        }
    }

    useEffect(()=>{
        fetchMensProducts();
        fetchWomensProducts();
        fetchElectronicsProducts();
    },[]);
 
    const navigateToCategory = (category) => {
        switch (category) {     
            case 'mens':
                navigate('/category/mens');
                return;
            case 'womens':
                navigate('/category/womens');
                return;
            case 'electronics':
                navigate('/category/electronics');
                return;
        }   
    }

 


    return (
        <div>
            <ImageSlider/>
            <div className='mx-auto px-8 sm:px-6 lg:px-8 xl:px-12 max-w-[1536px]  overflow-hidden'>
                {/* Men's Clothing Section */}
                <div className='mt-8 mb-24 w-full'>
                    <div className="flex items-center space-x-4">
                        <div className="bg-red-500 w-4 h-9 rounded"></div>
                        <p className="text-red-500 font-bold text-lg">Men's Clothing</p>
                    </div>
                    <div className='mt-12  w-full min-h-[200px]'>
                        {isClient && mensProducts.length > 0 && (
                            <Slider ref={mensSliderRef} {...settings}>
                                {mensProducts.map(product => (
                                <Card key={product.id} product={product} />
                                ))}
                            </Slider>
                        )}
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button onClick={()=>navigateToCategory("mens")} className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-150">View all Products</button>
                    </div>
                </div>

                {/* Women's Clothing Section */}
                <div className='mt-8 mb-24 '>
                    <div className="flex items-center space-x-4">
                        <div className="bg-red-500 w-4 h-9 rounded"></div>
                        <p className="text-red-500 font-bold text-lg">Women's Clothing</p>
                    </div>
                    <div className='mt-12 w-full min-h-[200px]'>
                        {isClient && womensProducts.length > 0 && (
                        <Slider ref={womensSliderRef} {...settings}>
                        {womensProducts.map((product) => (
                            <Card key={product.id} product={product} />
                        ))}
                        </Slider>
                        )}
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button onClick={()=>navigateToCategory("womens")} className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-150">View all Products</button>
                    </div>
                </div>


                {/* Electronics */}
                <div className='mt-8 mb-24'>
                    <div className="flex items-center space-x-4">
                        <div className="bg-red-500 w-4 h-9 rounded"></div>
                        <p className="text-red-500 font-bold text-lg">Electronics</p>
                    </div>
                    <div className='mt-12 w-full min-h-[200px]'>
                        {isClient && ElectronicsProducts.length > 0 && (
                        <Slider ref={electronicsSliderRef} {...settings}>
                        {ElectronicsProducts.map((product) => (
                            <Card key={product.id} product={product} />
                        ))}
                        </Slider>
                        )}
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button onClick={()=>navigateToCategory("electronics")} className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-150">View all Products</button>
                    </div>
                </div>

                {/* Support Section */}
                <div className="mt-12 my-20 flex flex-col  space-x-5 space-y-5 md:flex-row md:space-y-0 md:space-x-5 w-2/3 md:w-full mx-auto">
                    <div className=" group py-8 flex-1 text-center flex flex-col space-y-1 items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 rounded-xl p-5">
                        <div className="bg-gray-300 rounded-full p-2 mb-3">
                            <button className="bg-black w-12 h-12 flex items-center justify-center rounded-full">
                                <FaTruckFast className="text-white w-6 h-6" />
                            </button>
                        </div>
                        <h1 className="font-bold">FREE AND FAST DELIVERY</h1>
                        <p className="font-medium text-gray-500 group-hover:text-gray-300 transition-colors duration-300 text-sm">Free delivery for all orders over $140</p>
                    </div>
                    <div className="group py-8 flex-1 text-center flex flex-col space-y-1 items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 rounded-xl p-5">
                        <div className="bg-gray-300 rounded-full p-2 mb-3">
                            <button className="bg-black w-12 h-12 flex items-center justify-center rounded-full">
                                <BsHeadset className="text-white w-6 h-6" />
                            </button>
                        </div>
                        <h1 className="font-bold">24/7 CUSTOMER SERVICE</h1>
                        <p className="font-medium text-gray-500 group-hover:text-gray-300 transition-colors duration-300 text-sm">Friendly 24/7 customer support</p>
                    </div> 
                    <div className="group py-8 flex-1 text-center flex flex-col space-y-1 items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 rounded-xl p-5">
                        <div className="bg-gray-300 rounded-full p-2  mb-3">
                            <button className="bg-black w-12 h-12 flex items-center justify-center  rounded-full">
                                <AiOutlineSafety className="text-white w-6 h-6" />
                            </button>
                        </div>
                        <h1 className="font-bold">MONEY BACK GUARANTEE</h1>
                        <p className="font-medium text-gray-500 group-hover:text-gray-300 transition-colors duration-300 text-sm">We return money within 30 days</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
