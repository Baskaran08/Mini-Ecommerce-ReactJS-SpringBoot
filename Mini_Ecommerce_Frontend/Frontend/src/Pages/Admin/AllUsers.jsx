import React, { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import AdminUserCard from '../../Components/AdminUserCard';
import axiosInstance from '../../Utils/axiosInstance';
import { toast } from 'react-toastify';

const AllUsers = () => {

    const [users, setUsers] = useState([]);
    const fetchUsers=async()=>{
        try{
        const response = await axiosInstance.get("/admin/users")
        if(response.data ){
            setUsers(response.data)
            console.log(response.data)
        }
        }
        catch(error){
            console.log("An Unexpected error occured. please try again!")
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleDelete=async(userId)=>{
		try{
			const response=await axiosInstance.delete("/admin/users/"+userId)
			if(response.data && response.data.message){
				console.log("order status updated successfully")
			}

			const updatedUsers = users.filter(user => user.id !== userId);
			setUsers(updatedUsers);
			toast.success("User deleted successfully!");
		}
		catch(error){
			console.log("An Unexpected error occured. please try again!")
		}
        

    }


    return (
        <AdminLayout>
                <div className='mx-auto  lg:px-8'>
                    <h1 className='text-3xl font-semibold'>All Users</h1>
                    <div className='mt-12'>
                        <div className='overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100'>
                            <table className="min-w-full text-left   bg-white border border-gray-200 rounded-lg shadow-sm">
                            <thead>
                                <tr className=" bg-gray-200 text-gray-600">
                                <th className="px-4 py-2">User ID</th>
                                <th className="px-4 py-2">User Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <AdminUserCard user={user}  handleDelete={handleDelete} />
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </AdminLayout>
    )
}

export default AllUsers