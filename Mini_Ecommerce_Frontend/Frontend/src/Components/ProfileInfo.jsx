import { HiOutlineLogout } from "react-icons/hi";
import {generateInitials} from "../Utils/Helper";
import { IoPersonSharp } from "react-icons/io5";

const ProfileInfo = ({userData,onLogout}) => {
    return (
        <div className='flex flex-col lg:flex-row relative group  gap-2 w-full'>
            <div className="flex items-center gap-4 cursor-pointer ml-4">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-red-500">
                    <span>{generateInitials(userData.name)}</span>
                </div>
                <div className="flex flex-col lg:hidden items-start gap-1">
                    <p className='font-semibold text-lg hover:text-yellow-400'>{userData.name}</p>
                    <p className='text-gray-300 text-sm'>User</p>
                </div>
            </div>
            <button
                onClick={onLogout}
                className='w-full py-2 mt-2 rounded cursor-pointer 
                            bg-black text-white  lg:hidden
                            hover:bg-gray-100 hover:text-gray-800 
                            font-semibold transition-all duration-300 
                            px-4 flex justify-center items-center gap-2 btnHover  whitespace-nowrap'
                >
                Sign Out
                <HiOutlineLogout className='text-xl icon  transition-all duration-300' />
            </button>
            <div className="absolute right-0 top-10 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-xl hidden lg:group-hover:block z-50 overflow-hidden">
                <div className="px-2 py-3 flex items-center gap-2 bg-gray-50 text-sm text-gray-700 font-medium border-b border-gray-200">
                    <IoPersonSharp/> {userData.name}
                </div>
                <button
                    onClick={onLogout}
                    className="w-full text-left flex items-center gap-2 cursor-pointer px-2 py-3 text-sm text-red-500 hover:bg-red-50 transition duration-200"
                >
                    <HiOutlineLogout className="text-xl"/> Logout
                </button>
            </div>
        </div>
    )
}

export default ProfileInfo