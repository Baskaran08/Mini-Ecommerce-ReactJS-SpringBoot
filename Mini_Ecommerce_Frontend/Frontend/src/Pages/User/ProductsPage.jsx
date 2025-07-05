import { Link,useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import Navbar from "../../Components/Navbar"
import Card from "../../Components/Card"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa"
import { CiDeliveryTruck } from "react-icons/ci";
import { LuPackageOpen } from "react-icons/lu";
import { MdOutlinePayment } from "react-icons/md";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import axiosInstance from "../../Utils/axiosInstance";
import { CartContext } from '../../context/CartContext'
import { useContext } from "react";
import { toast } from 'react-toastify';




const ProductsPage = () => {

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

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: false,
                dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1
                }
            }
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };
    //////////////////////////////////////////////////////////////////////////////
    
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { id } = useParams()
    const navigate = useNavigate();
    const [product, setProduct] = useState({})
    const [similarProducts, setSimilarProducts] = useState([]);
    const [quantity,setQuantity]=useState(1)

    const { AllCartItems, setAllCartItems } = useContext(CartContext);

    const fetchProduct=async()=>{
        try{
            const response = await axiosInstance.get("/products/"+id)
            if(response.data && response.data.product){
                setProduct(response.data.product)
                console.log(response.data.product)
            }
            }
        catch(error){
                console.log("An Unexpected error occured. please try again!")
        }

        
    }

    const fetchSimilarProducts=async()=>{
        try{
            const response = await axiosInstance.get("/products/category/"+product.category)
            if(response.data && response.data.data){
                setSimilarProducts(response.data.data)
                console.log(response.data.data)
            }
            }
        catch(error){
                console.log("An Unexpected error occured. please try again!")
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [id])

    useEffect(() => {
        if (product.category) {
            fetchSimilarProducts();
        }
    }, [product.category]);

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

    const addQuantity=()=>{
        if(quantity>=product.stock){
            return
        }
        setQuantity(quantity+1)
    }

    const subtractQuantity=()=>{
        if(quantity>1){
            setQuantity(quantity-1)
        }
    }

    const addToCart=async()=>{
        try{
            const response = await axiosInstance.post("/cart",{
                productId:product.id,
                quantity:quantity
            })
            if(response.data && response.data.message){
                console.log("cart updated successfully")
            }
            
            const cartResponse = await axiosInstance.get("/cart");
            setAllCartItems(cartResponse.data.cartItems || []);
            toast.success("Product added to cart successfully!");
        }
        catch(error){
                console.log("An Unexpected error occured. please try again!")
        }
    }




    return (
        <div>
            <div className="mx-auto px-8 sm:px-6 lg:px-8 xl:px-12 max-w-[1536px] my-12 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                    <div className="min-h-[300px] sm:min-h-[400px] md:min-h-[500px] max-h-[70vh] md:max-h-[100vh] lg:max-h-[89vh] bg-white shadow rounded flex items-center justify-center ">
                        <img className="h-full  object-contain" src={product.img_url} alt="product" />
                    </div>
                    <div className="px-8 pb-4">
                        <h1 className="text-3xl">{product.name}</h1>
                        <div className='flex items-center space-x-1 mb-2 border-b-2 border-gray-300 py-4'>
                            {
                                [...Array(5)].map((_,i)=>{
                                    return (
                                        <FaStar key={i} className={`text-sm ${i<product.rating?"text-amber-400":"text-gray-300"}`}/>
                                    )
                                })
                            }
                        </div>
                        <div className="flex items-center space-x-8 mt-10 mb-2">
                            <p className='text-gray-800 font-bold text-2xl'>₹{product.price} </p>
                            <span className=" text-sm bg-red-500 px-3 py-1 rounded text-white ">-{product.discount}%</span>
                        </div>
                        <p className="line-through text-gray-500 font-semibold">₹{product.base_price}</p>

                        <p className="font-semibold mt-4 mb-4">Qty:</p>
                        <div className="my-2 flex items-center space-x-2 mb-4">
                            <button className="bg-red-600 text-white py-2 cursor-pointer px-4 rounded font-bold" onClick={subtractQuantity}>-</button>
                            <input className="outline-none w-10 bg-gray-300 py-2 px-2 text-center" readOnly type="text" name="" id="" value={quantity} />
                            <button className="bg-green-700 text-white py-2 cursor-pointer px-4 rounded font-bold" onClick={addQuantity}>+</button>
                        </div>
                        <div className="flex items-center space-x-2 mb-10">
                            <div className="bg-gray-400 w-4 h-4 rounded-full"></div>
                            <p className={`${product.stock>0?"text-green-600":"text-red-700"} font-semibold text-sm`}>{product.stock>0?`Only ${product.stock} left`:"Out of Stock"}</p>
                        </div>
                        <button className="bg-red-500 w-full py-3 mb-8 text-white rounded font-semibold hover:bg-red-600 transition-colors duration-300 cursor-pointer" disable={product.stock<=0} onClick={addToCart}>Add to Cart</button>
                        <div className="flex flex-col space-y-4 mb-8">
                            <div className="flex items-center space-x-2 mb-4">
                                <CiDeliveryTruck className="text-2xl"/>
                                <p className="text-sm">Free Delivery on Orders over ₹499</p>
                            </div>
                            <div className="flex items-center space-x-2 mb-4">
                                <LuPackageOpen className="text-2xl"/>
                                <p className="text-sm">Free Returns</p>
                            </div>
                            <div className="flex items-center space-x-2 mb-4">
                                <MdOutlinePayment className="text-2xl"/>
                                <p className="text-sm">Secure Payment</p>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <h1 className="font-semibold text-lg border-b-2 border-gray-300">Product Description</h1>
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>

                {/* Similar items */}
                <div className="mt-20">
                    <h1 className="font-semibold text-2xl ">Similar Products</h1>
                    <div className='mt-12'>
                        <Slider {...settings}>
                        {similarProducts.map((product) => (
                            <Card key={product.id} product={product} />
                        ))}
                        </Slider>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button onClick={()=>navigateToCategory(product.category)} className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-150">View all Products</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPage