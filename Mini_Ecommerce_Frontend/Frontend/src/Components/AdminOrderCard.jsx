import { RiDeleteBin6Line } from "react-icons/ri";

const AdminOrderCard = ({order,handleStatusChange,handleDelete,handleView}) => {
  return (
    <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50 transition-all">
		<td className="px-4 py-2">#{order.id}</td>
		<td className="px-4 py-2">
			{order.user.name} <br />
			<span className="text-xs text-gray-500">{order.user.email}</span>
		</td>
		<td className="px-4 py-2 whitespace-nowrap">{new Date(order.orderDate).toLocaleString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                            })}</td>
		<td className="px-4 py-2 whitespace-nowrap">₹ {Number(order.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
		<td className="px-4 py-2">{order.orderItems.length}</td>
		<td className="px-4 py-2">
			<select
				value={order.status}
				onChange={(e) => handleStatusChange(order.id, e.target.value)}
				className={`
					px-2 py-1 rounded text-xs font-medium
					border border-gray-300
					focus:outline-none 
					${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
					order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
					order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
					'bg-blue-100 text-blue-700'}
				`}
				>
				<option value="Pending">Pending</option>
				<option value="Shipped">Shipped</option>
				<option value="Delivered">Delivered</option>
				<option value="Cancelled">Cancelled</option>
			</select>
		</td>
		<td className="px-4 py-2 ">
			<div className='flex items-center gap-2'>
				<button className="text-blue-600 hover:underline cursor-pointer" onClick={()=>handleView(order)}>View</button>
				<button className="text-red-600 hover:underline cursor-pointer  text-xl" onClick={()=>handleDelete(order.id)}><RiDeleteBin6Line /></button>
			</div>
		</td>
			
			
	</tr>
  )
}

export default AdminOrderCard