
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function DoctorList({doctorList, heading}) {
  return (
    <div className="mb-10 px-8" id='explore'>
        <h2 className="font-bold text-xl">{heading}</h2>
        <div className='
        grid grid-cols-1 gap-7
        sm:grid-cols-1 md:grid-cols-2 
        lg:grid-cols-3 mt-4' >
            {doctorList.length>0?doctorList.map((doctor, index)=>(
                <div className='border-[1px] rounded-lg p-3 
                cursor-pointer hover:shadow-blue-400 hover:shadow-lg transition-all ease-in-out' key={index}>
                    <Image
                    src={doctor.attributes?.image?.data?.attributes?.url}
                    alt='dr'
                    width={500}
                    height={200}
                    className='h-[500px]  w-full object-cover rounded-lg'
                    />
                    <div className='mt-3 items-baseline flex flex-col gap-1'>
                        <h2 className='text-[10px] bg-blue-100 
                        p-1 rounded-full px-2 text-primary' >
                        {doctor.attributes.category.data.attributes.Name}
                        </h2>

                        <h2 className="font-bold">
                        {doctor.attributes.Name}
                        </h2>

                        <h2 className='text-primary text-sm' >
                            {doctor.attributes?.Year_of_Experience} Of Experience
                        </h2>
                        
                        <h2 className='text-gray-500 text-sm' >
                            {doctor.attributes?.Address}
                        </h2>
                        <Link href={'/details/'+doctor?.id} className='w-full'>
                            <h2 className="p-2 px-3 border-[1px]
                            border-primary text-primary rounded-full 
                            w-full text-center text-[11px] mt-2 cursor-pointer
                            font-bold hover:bg-primary hover:text-white">
                                Book Now
                            </h2>
                        </Link>

                    </div>
                </div>
            )): 
            // Skelton Effect
            [1,2,3,4].map((item, index)=>(
                <div key={index} className='h-[500px] bg-slate-100 w-full
                rounded-lg animate-pulse'></div>
            ))
            
            }
        </div>
    </div>
  )
}

export default DoctorList

