import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({product}) => {
  return (
    <div key={product.id} className='group bg-white relative p-4 rounded-lg shadow  hover:shadow-lg transition-shadow duration-300 ms-4 mb-2'>
        <Link to={`/product/${product.id}`}><img src={product.img_url} alt={product.name} className='w-full aspect-square object-contain  mb-4 rounded' /></Link>
        <h3 className='text-lg font-semibold line-clamp-3 sm:line-clamp-2 group-hover:text-red-600 transition-colors duration-300'><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <div className='flex items-center space-x-1 my-2'>
            {
                [...Array(5)].map((_,i)=>{
                    return (
                        <FaStar key={i} className={`text-sm ${i<product.rating?"text-amber-400":"text-gray-300"}`}/>
                    )
                })
            }
        </div>
        <p className='text-gray-800 font-bold'>₹{(product.price).toLocaleString('en-IN')} <span className='line-through text-red-500'>₹{(product.base_price).toLocaleString('en-IN')}</span></p>
        <p className='absolute text-sm top-6 flex bg-red-500 justify-center items-center rounded px-2 py-1 text-white group-hover:bg-red-600 transition-all duration-300 group-hover:scale-115'>-{product.discount}%</p>
    </div>
  )
}

export default Card