import { useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import { Outlet,Navigate } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import Footer from "../../Components/Footer";


const UserLayout = () => {
    const { AllCartItems, setAllCartItems } = useContext(CartContext);

    useEffect(()=>{

        const fetchCartItems=async()=>{
            try{
                const response=await axiosInstance.get("/cart")
                if(response.data && response.data.cartItems){
                    setAllCartItems(response.data.cartItems)
                }
                }catch(error){
                    console.log("An Unexpected error occured. please try again!")
            }
        }
        fetchCartItems()
    },[])

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user ) {
        return <Navigate to="/login" />;
    }
    return (
        <>
        <Navbar />
        <Outlet />
        <Footer />

        </>
    );
};

export default UserLayout;