'use client'
import React,{useState,useEffect} from 'react'
import axios from 'axios'

function Search({setName,setData}) {
  const [search, setSearch] = useState('')

  const onSearch = async (e) => {
        const res = await axios.get(`http://localhost:9000/api/products/search?name=${search}`);
    console.log(res)
    if (res.status !== 200) {
      return;
    }
    const data = await res.data
    setData(data)
    
  }

  return (
    <div className='flex items-center justify-center mt-20 mb-4'>
        <input value={search} onChange={(e)=>{setSearch(e.target.value)}} className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none' placeholder='search'/>
        <button onClick={onSearch} className='bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
            Search
        </button>
    </div>
  )
}

export default Search