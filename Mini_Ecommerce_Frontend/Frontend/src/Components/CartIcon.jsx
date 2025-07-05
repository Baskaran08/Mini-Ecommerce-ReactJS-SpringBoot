import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from '../context/CartContext'
const CartIcon = () => {

    const { AllCartItems } = useContext(CartContext);
    
    const navigate=useNavigate();
    const navigateToCart=()=>{
        navigate("/cart")
    }
    return (
        <div className="flex items-center gap-1 cursor-pointer  group" onClick={navigateToCart}>
        <div className="relative">
            <PiShoppingCartSimpleLight className="text-3xl text-white cursor-pointer " />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1">
            {AllCartItems.length}
            </span>
        </div>
        <p className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-yellow-500 after:transition-all after:duration-300 group-hover:after:w-full">Cart</p>
        </div>

    )
}

export default CartIcon