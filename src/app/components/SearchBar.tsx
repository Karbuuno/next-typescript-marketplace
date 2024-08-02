import Image from "next/image";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <form className='flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1'>
      <input
        type='text'
        name='name'
        placeholder='Search'
        className='flex-1 bg-transparent outline-none w-[500px]'
      />
      <div className='cursor-pointer'>
        <FaSearch width={16} height={16} />
      </div>
    </form>
  );
};

export default SearchBar;
