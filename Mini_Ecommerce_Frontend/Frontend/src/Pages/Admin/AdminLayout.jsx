import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineLogout, HiMenuAlt3 } from "react-icons/hi";
import { generateInitials } from '../../Utils/Helper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser || localUser.role !== "ROLE_ADMIN") {
      navigate("/login");
    } else {
      setUser(localUser);
    }
  }, [navigate]);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  if (!user) return null;
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* Mobile Top Bar */}
      <div className="lg:-translate-y-full translate-y-0 transition-all duration-300  bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 w-full z-40">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <HiMenuAlt3 size={26} />
        </button>
      </div>

      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          bg-gray-800 text-white flex flex-col justify-between p-6
          fixed  z-40
          w-64 h-full lg:h-screen lg:sticky lg:top-0
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className='flex flex-col space-y-6 mt-12 lg:mt-0'>
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <nav className="flex flex-col space-y-3">
            <Link to="/admin/dashboard" onClick={() => setSidebarOpen(false)} className="hover:text-blue-400">Dashboard</Link>
            <Link to="/admin/products" onClick={() => setSidebarOpen(false)} className="hover:text-blue-400">Products</Link>
            <Link to="/admin/orders" onClick={() => setSidebarOpen(false)} className="hover:text-blue-400">Orders</Link>
            <Link to="/admin/users" onClick={() => setSidebarOpen(false)} className="hover:text-blue-400">Users</Link>
            <Link to="/home" onClick={() => setSidebarOpen(false)} className="hover:text-blue-400">Go to Home</Link>
          </nav>
        </div>

        <div className='flex flex-col gap-2'>
          <div className="flex items-center gap-4 cursor-pointer">
            <div className="rounded-full w-12 h-12 flex items-center justify-center bg-red-500">
              <span>{generateInitials(user.name)}</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <p className='font-semibold text-lg hover:text-blue-400'>{user.name}</p>
              <p className='text-gray-300 text-sm'>Admin</p>
            </div>
          </div>
          <button onClick={onLogout} className='py-2 mt-4 rounded cursor-pointer bg-black hover:text-gray-600 hover:bg-gray-100 font-semibold transition-all duration-150 px-4 flex justify-center items-center'>
            SignOut <HiOutlineLogout className='inline ml-2' />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1  p-6 overflow-y-auto mt-16 lg:mt-0">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
