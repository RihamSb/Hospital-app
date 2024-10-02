"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image'
import Link from 'next/link'

function CategorySearch() {
  const [categoryList, setCategoryList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, categoryList]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.data.data);
      setFilteredCategories(resp.data.data); // Set initially to show all categories
      setLoading(false); // Disable loading after fetching data
    });
  };

  const handleSearch = () => {
    if (searchQuery === '') {
      setFilteredCategories(categoryList); // If search query is empty, show all categories
    } else {
      const queryWords = searchQuery.toLowerCase().split(' ').filter(Boolean); // Split the query into individual words

      const filtered = categoryList.filter(item => {
        const name = item.attributes?.Name?.toLowerCase() || '';
        const specialization = item.attributes?.Specialization?.toLowerCase() || '';
        
        // Check if any word in the query matches either the name or specialization
        return queryWords.some(word =>
          name.includes(word) || specialization.includes(word)
        );
      });

      setFilteredCategories(filtered);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='mb-10 px-5 items-center flex flex-col gap-2'>
      <h2 className="font-bold text-4xl tracking-wide">Search by
        <span className="text-primary"> Department or Name</span>
      </h2>
      <h2 className='text-gray-500 text-xl'>Find the right surgeon or department and book an appointment easily</h2>
  
      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input 
          type="text" 
          placeholder="Search by Name or Department..." 
          value={searchQuery}
          onChange={handleInputChange} 
        />
        <Button type="button" onClick={handleSearch}>
          <Search className='h-4 w-4 mr-2' />
          Search
        </Button>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-6 md:grid-cols-3 ">
        {loading ? (
          // Show loading skeletons
          [1, 2, 3, 4].map((item, index) => (
            <div key={index} className='m-2 h-[120px] w-[160px] bg-slate-100 animate-pulse rounded-lg'></div>
          ))
        ) : filteredCategories.length > 0 ? (
          // Show filtered categories
          filteredCategories.map((item, index) => (
            <Link key={index} href={'/search/' + item.attributes.Name} className='flex flex-col cursor-pointer text-center items-center p-5 bg-blue-50 m-2 rounded-lg gap-2 hover:scale-110 transition-all ease-in-out'>
              <Image 
                src={item.attributes?.Icon?.data.attributes?.url} 
                alt='icon'
                width={40}
                height={40}
              />
              <label className='text-blue-600 text-l'>{item.attributes?.Name}</label>
              <p className="text-gray-500">{item.attributes?.Specialization}</p> {/* Display specialization if available */}
            </Link>
          ))
          
        ) : (
          // Show no results message
          <div className="col-span-3 md:col-span-3 lg:col-span-6 text-center mt-10">
            <p className="text-gray-500 text-lg">No results found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategorySearch;
