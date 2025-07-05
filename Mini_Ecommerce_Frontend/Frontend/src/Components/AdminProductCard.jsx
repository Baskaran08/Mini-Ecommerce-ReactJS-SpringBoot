import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

const AdminProductCard = ({product,handleEdit,deleteProduct}) => {
  return (
    <tr  className="hover:bg-gray-50 transition-all">
        <td className="px-6 py-4 border-t   border-gray-200">{product.id}</td>
        <td className="px-6 py-4 border-t  border-gray-200">
        <img src={product.img_url} alt={product.name} className="w-24 h-24 object-contain  rounded" />
        </td>
        <td className="px-6 py-4 border-t border-gray-200 font-medium"><p className='line-clamp-3'>{product.name}</p></td>
        <td className="px-6 py-4 border-t border-gray-200 text-gray-600"><p className='line-clamp-3'>{product.description}</p></td>
        <td className="px-6 py-4 border-t border-gray-200 text-center"><p className='flex items-center'><FaStar className='text-amber-400 mr-2 text-lg'/>{product.rating}</p></td>
        <td className="px-6 py-4 border-t border-gray-200 font-semibold text-green-700 whitespace-nowrap">₹ {(product.price).toLocaleString('en-IN')}</td>
        <td className="px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col items-start">
            <span className="line-through text-gray-400 text-sm">₹ {(product.base_price).toLocaleString('en-IN')}</span>
            <span className="text-green-500 text-sm">{product.discount}% OFF</span>
        </div>
        </td>
        <td className="px-6 py-4 border-t border-gray-200">{product.stock}</td>
        <td className="px-6 py-4  border-t border-gray-200 capitalize">{product.category}</td>
        <td className="px-6 py-4 border-t border-gray-200 text-center">
        <button className="text-xl cursor-pointer text-green-600 hover:text-green-800 mr-2" onClick={() => handleEdit(product)}>
            <FaRegEdit />
        </button>
        <button className="text-xl cursor-pointer text-red-600 hover:text-red-800" onClick={() => deleteProduct(product)}>
            <RiDeleteBin6Line />
        </button>
        </td>
    </tr>
  )
}

export default AdminProductCard