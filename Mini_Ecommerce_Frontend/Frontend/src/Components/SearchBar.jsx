import { FaSearch } from "react-icons/fa";
import {IoMdClose} from 'react-icons/io'

const SearchBar = ({onCloseSearch,value,onChange,onSearch}) => {
  return (
    <div className='font-medium flex items-center bg-white rounded overflow-hidden w-full lg:max-w-[500px]'>
        <input className='px-4 py-2 w-full text-black outline-none'
        type="text"
        placeholder='Search for products, brands and more...'
        value={value}
        onChange={onChange}
         
        />
        {value && (
          <div >
            <IoMdClose className="text-red-600 text-xl cursor-pointer" onClick={()=>onCloseSearch()} />
          </div>
        )}
        <div className="px-4">
            <FaSearch className="text-amber-500 text-lg cursor-pointer" onClick={()=>onSearch()} />
        </div>
    </div>
  )
}

export default SearchBar