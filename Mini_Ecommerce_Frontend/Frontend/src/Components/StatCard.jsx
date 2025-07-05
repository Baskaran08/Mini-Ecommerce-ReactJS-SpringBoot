import React from 'react';
import { useNavigate } from 'react-router-dom';
const StatCard = ({ title, value,icon,link }) => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(link);
  };

  return (
    <div onClick={handleClick} className="bg-blue-400 cursor-pointer shadow group p-8 w-56 h-56 flex flex-col justify-center items-center rounded-lg border border-gray-200 text-center hover:bg-red-400 transition-all duration-300">
      <div className='text-3xl text-gray-600 group-hover:scale-125 transition-all duration-300 ase-in-out group-hover:text-white'>{icon}</div>
      <p className="font-semibold text-2xl pt-4 text-white">{title}</p>
      <h2 className="text-xl pt-2 font-bold">{value}</h2>
    </div>
  );
};

export default StatCard;