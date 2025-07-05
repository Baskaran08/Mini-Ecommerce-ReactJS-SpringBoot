import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";

const AdminUserCard = ({user,handleDelete}) => {
  return (
    <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50 transition-all">
            <td className="px-4 py-4">{user.id}</td>
            <td className="px-4 py-4">
                {user.name}
            </td>
            <td className="px-4 py-4 text-blue-500">{user.email}</td>
            <td className="px-4 py-4 whitespace-nowrap">{user.role==="ROLE_ADMIN"?"Admin":"User"}</td>
            <td className="px-4 py-4 ">
                <div className='flex items-center gap-2'>
                    <button className="text-red-600 hover:underline cursor-pointer  text-xl" onClick={()=>handleDelete(user.id)}><RiDeleteBin6Line /></button>
                </div>
            </td>
                
                
        </tr>
  )
}

export default AdminUserCard