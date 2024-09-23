import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function DoctorSuggestionList({doctor}) {
    
    const [doctorList, setDoctorList] = useState([]);

    useEffect(()=>{
        getDoctorList()
    },[])
    const getDoctorList=()=>{
        GlobalApi.getDoctorList().then(
            resp=>{
                console.log(resp.data.data)
                setDoctorList(resp.data.data)
            }
        )
    }

  return (
    <div className='p-1 border-[1px] mt-5 md:ml-5 rounded-md w-full object-contain'>
        <h2 className="mb-3 font-bold text-center">Suggestions</h2>
        <hr />
        {doctorList.map((doctor, index)=>(
            <Link className='w-full overflow-hidden object-contain'  key={index} href={'/details/'+doctor.id} >
            <div  className="mb-4 p-3 shadow-sm w-full 
            cursor-pointer hover:bg-slate-100 rounded-lg flex items-center gap-3">
                <Image 
                src={doctor?.attributes?.image?.data?.attributes?.url}
                alt='dr'
                width={70}
                height={70}
                className='w-[70px] h-[70px] rounded-full object-cover'
                />
                <div className="mt-3 sm:px-2 md:px-0 flex-col flex gap-1">

                        <h2 className=" text-sm font-bold">
                        {doctor.attributes.Name}
                        </h2>

                        <h2 className='text-primary text-sm' >
                            {doctor.attributes?.Year_of_Experience}
                        </h2> 
                        
                        <h2 className=' font-semibold text-[10px] w-[100px] bg-blue-100 
                        p-1 rounded-full px-2 text-primary text-center' >
                        {doctor.attributes.category.data.attributes.Name}
                        </h2>
                </div>
            </div>         
            </Link>
        ))}

    </div>
  )
}

export default DoctorSuggestionList