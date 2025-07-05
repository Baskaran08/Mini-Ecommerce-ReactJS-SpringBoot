import { useState,useEffect } from 'react';	
import AdminLayout from './AdminLayout'
import AdminOrderCard from '../../Components/AdminOrderCard';
import axiosInstance from '../../Utils/axiosInstance';
import Modal from 'react-modal';
import OrderView from '../../Components/OrderView';
import { toast } from 'react-toastify';



const AllOrders = () => {

	const [orders, setOrders] = useState([]);

	const [showViewModal, setShowViewModal] = useState({
		isShown: false,
		data: null
	});

	const fetchOrders = async () => {
		try{
        const response = await axiosInstance.get("/orders/all")
        if(response.data && response.data.orders){
            setOrders(response.data.orders)
            console.log(response.data.orders)
        }
        }
        catch(error){
            console.log("An Unexpected error occured. please try again!")
        }
	}

	useEffect(()=>{
		fetchOrders()
	},[])

	const handleStatusChange =async (orderId, newStatus) => {
	// Optionally update in UI
	    setOrders(prev =>
            prev.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
		    )
        )

		try{
			const response=await axiosInstance.put("/orders/"+orderId+"/status",
            {
                status:newStatus
            })
			if(response.data && response.data.order){
				console.log("order status updated successfully")
			}
			toast.success("Order status updated successfully!");
		}
		catch(error){
			console.log("An Unexpected error occured. please try again!")
		}
        

	
	};

    const handleDelete=async(orderId)=>{
		try{
			const response=await axiosInstance.delete("/orders/"+orderId)
			if(response.data && response.data.message){
				console.log("order status updated successfully")
			}

			const updatedOrders = orders.filter(order => order.id !== orderId);
			setOrders(updatedOrders);
			toast.success("Order deleted successfully!");
		}
		catch(error){
			console.log("An Unexpected error occured. please try again!")
		}
        

    }

	const handleView = (order) => {
		setShowViewModal({
			isShown: true,
			data: order
		});
	};
	

	return (
		<div>
		<AdminLayout>
			<div className='mx-auto  lg:px-8'>
				<h1 className='text-3xl font-semibold'>All Orders</h1>
				<div className='mt-12'>
					<div className='overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100'>
						<table className="min-w-full text-left   bg-white border border-gray-200 rounded-lg shadow-sm">
						<thead>
							<tr className=" bg-gray-200 text-gray-600">
							<th className="px-4 py-2">Order ID</th>
							<th className="px-4 py-2">Customer</th>
							<th className="px-4 py-2">Date</th>
							<th className="px-4 py-2">Total</th>
							<th className="px-4 py-2">Items</th>
							<th className="px-4 py-2">Status</th>
							<th className="px-4 py-2">Actions</th>
							</tr>
						</thead>
						<tbody>
							{orders.map(order => (
								<AdminOrderCard order={order} handleStatusChange={handleStatusChange} handleDelete={handleDelete} handleView={handleView} />
							))}
						</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* modal view*/}

			<Modal 
                isOpen={showViewModal.isShown}
                style={{
                    overlay:{
                        backgroundColor:'rgba(0,0,0,0.2)'
                    }
                }}
                className="w-[80%] lg:w-[50%]     bg-white rounded-md  mx-auto mt-28 lg:mt-14  "
                >
                    <OrderView
                     onClose={()=>setShowViewModal({isShown:false,data:null})}
                     order={showViewModal.data}
                     />
                </Modal>
		</AdminLayout>
		</div>
	)
}

export default AllOrders