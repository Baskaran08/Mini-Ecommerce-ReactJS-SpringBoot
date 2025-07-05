import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenuAlt3, HiOutlineSearch } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import CartIcon from './CartIcon';
import ProfileInfo from './ProfileInfo';
import SearchBar from './SearchBar';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userData = JSON.parse(localStorage.getItem('user'));

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('Logged out successfully!');
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearchBar(false);
    }
  };

  return (
    <>
      <div className='sticky top-0 z-40'>
        <nav className='bg-gray-800 text-white flex items-center justify-between p-4 lg:px-8'>
          <h1 className='text-2xl font-bold hover:text-yellow-300 transition-all whitespace-nowrap'>
            <Link to='/home'>Shopfinity</Link>
          </h1>

          <div className='hidden lg:flex w-full  justify-center flex-1 px-6'>
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
            />
          </div>

          <div className='hidden lg:flex items-center gap-8'>
            <p className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-yellow-500 after:transition-all after:duration-300 hover:after:w-full"><Link to='/orders' >Orders</Link></p>
            
            <CartIcon />
            <ProfileInfo userData={userData} onLogout={onLogout} />
          </div>

          {/* Mobile icons */}
          <div className='flex lg:hidden gap-4 items-center'>
            <button onClick={() => setShowSearchBar(!showSearchBar)}>
              <HiOutlineSearch className='hover:text-yellow-400' size={24} />
            </button>
            <button onClick={() => setSidebarOpen(true)}>
              <HiMenuAlt3 className='hover:text-yellow-400' size={26} />
            </button>
          </div>
        </nav>

        {/* Slide-down SearchBar for mobile */}
        {showSearchBar && (
          <div className={`lg:hidden  bg-gray-900 flex items-center justify-center px-4 py-3 shadow-md`}>
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
              onCloseSearch={() => setShowSearchBar(false)}
            />
          </div>
        )}
      </div>

      {/* Sidebar for mobile */}
      {/* Sidebar Overlay */}
        {sidebarOpen && (
        <div
            className='fixed inset-0   bg-opacity-40 z-40 lg:hidden'
            onClick={() => setSidebarOpen(false)}
        ></div>
        )}

        {/* Sidebar Content */}
        <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-50 transform transition-transform  lg:-translate-x-full duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='flex flex-col h-full justify-between p-6 w-full'>
            <div>
            <h1 className='text-2xl font-semibold mb-6'>Shopfinity</h1>
            <div className='flex flex-col gap-6'>
                <Link to='/cart' onClick={() => setSidebarOpen(false)} className='hover:text-yellow-400'>Cart</Link>
                <Link to='/orders' onClick={() => setSidebarOpen(false)} className='hover:text-yellow-400'>Orders</Link>
            </div>
            </div>
            <div className='border-t border-t-gray-400 pt-4  w-full'>
            <ProfileInfo userData={userData} onLogout={onLogout} />
            </div>
        </div>
        </div>
    </>
  );
};

export default Navbar;
