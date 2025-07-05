import  { useState,useEffect } from 'react'
import AdminLayout from './AdminLayout'
import Modal from 'react-modal';
import AddEditProducts from '../../Components/AddEditProducts';
import AdminProductCard from '../../Components/AdminProductCard';
import axiosInstance from '../../Utils/axiosInstance';
import { toast } from 'react-toastify';


Modal.setAppElement('#root');
const ProductManagement = () => {

    const [products, setProducts] = useState([]);
    const [AddEditProduct, setAddEditProduct] = useState({
        isShown:false,
        type:"add",
        product:null
    });

    const fetchProducts=async()=>{
        try{
        const response = await axiosInstance.get("/products")
        if(response.data && response.data.products){
            setProducts(response.data.products)
            console.log(response.data.products)
        }
        }
        catch(error){
            console.log("An Unexpected error occured. please try again!")
        }
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    const handleEdit=(product)=>{
        setAddEditProduct({
            isShown:true, data:product,type:"edit"
	    })
    }

    const deleteProduct=async(data)=>{
        const productId=data.id
        try{
            const response=await axiosInstance.delete("/products/"+productId)
            if(response.data && !response.data.error){
                fetchProducts()
                toast.success("Product deleted successfully!")
            }
        }
        catch(error){
            if(error.response && error.response.data && error.response.data.message){
                console.log("An unexpected error occurred. Please try again")
            }
        }
    }


    return (
        <AdminLayout>
            <div className='mx-auto  lg:px-8 '>
                <div className='flex justify-between items-center '>
                    <h1 className='text-3xl font-semibold'>Products</h1>
                    <button onClick={()=>{setAddEditProduct({isShown:true,type:"add",data:null}) }} className='bg-red-500 text-white p-3 rounded hover:bg-red-600 transition-all duration-300 font-semibold'>+ Add Product</button>
                </div>
                <div className='mt-12'>
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                            <thead className="bg-gray-200  text-left text-gray-600 text-sm uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4 ">ID</th>
                                <th className="px-6 py-4 ">Image</th>
                                <th className="px-6 py-4 ">Name</th>
                                <th className="px-6 py-4 ">Description</th>
                                <th className="px-6 py-4 ">Rating</th>
                                <th className="px-6 py-4  ">Price</th>
                                <th className="px-6 py-4 ">Discount</th>
                                <th className="px-6 py-4 ">Stock</th>
                                <th className="px-6 py-4 ">Category</th>
                                <th className="px-6 py-4  text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-700 text-sm">
                            {
                                products.map((product) => (
                                    <AdminProductCard 
                                        key={product.id}
                                        product={product}
                                        handleEdit={handleEdit}
                                        deleteProduct={deleteProduct}
                                      />
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                
                {/* Modal */}
                <Modal 
                isOpen={AddEditProduct.isShown}
                style={{
                    overlay:{
                        backgroundColor:'rgba(0,0,0,0.2)'
                    }
                }}
                className="w-[80%] lg:w-[50%]     bg-white rounded-md  mx-auto mt-28 lg:mt-14 lg:p-5 "
                >
                    <AddEditProducts
                     onClose={()=>setAddEditProduct({isShown:false,type:"add",data:null})}
                     type={AddEditProduct.type}
                     product={AddEditProduct.data}
                     fetchProducts={fetchProducts}
                     />
                </Modal>
                
            </div>
        </AdminLayout>
    )
}

export default ProductManagement