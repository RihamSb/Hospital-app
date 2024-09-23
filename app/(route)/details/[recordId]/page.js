"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import DoctorDetail from '../_components/DoctorDetail';
import DoctorSuggestionList from '../_components/DoctorSuggestionList';

function Details({params}) {

  const [doctor, setDoctor] = useState([]);

  useEffect(()=>{
    getDoctorById()
  }, [])

  const getDoctorById =()=>{
    GlobalApi.getDoctorById(params.recordId).then(resp=>{
      // console.log(resp.data.data)
      // console.log(doctor.attributes)
      setDoctor(resp.data.data)
    })
  } 

  return (
    <div className='p-5 md:px-5 md:pl-1'>
      <h2 className='font-bold text-[22px] '>Details</h2>
      <div className='grid sm:grid-cols-1 lg:grid-cols-4'>
        {/* doctor details */}
        <div className='col-span-3 '>
         {doctor&&<DoctorDetail doctor={doctor} />}
        </div>
        {/* doctor suggestion */}
        <div>
          <DoctorSuggestionList doctor={doctor} />
        </div>
      </div>
    </div>
  )
}

export default Details