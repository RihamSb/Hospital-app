import { GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import BookAppointment from './BookAppointment'

function DoctorDetail({ doctor }) {
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (doctor && doctor.attributes) {
      // Simulate a delay for loading state
      setTimeout(() => {
        setDoctorData(doctor.attributes);
        setLoading(false); // Once data is available, set loading to false
      }, 1500); // 1.5 seconds delay for the skeleton effect
    }
  }, [doctor]);

  const socialMediaList = [
    { id: 1, icon: '/youtube.png', url: '' },
    { id: 2, icon: '/linkedin.png', url: '' },
    { id: 3, icon: '/twitter.png', url: '' },
    { id: 4, icon: '/facebook.png', url: '' },
  ];

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'>
        {/* Doctor Image */}
        <div>
          {loading ? (
            // Skeleton Effect for Image
            <div className='h-[280px] bg-slate-100 w-full rounded-lg animate-pulse'></div>
          ) : (
            <Image
              src={doctorData.image?.data?.attributes?.url || '/default-image.jpg'}
              alt="Doctor"
              width={200}
              height={200}
              className='rounded-lg w-full h-[480px] object-cover'
            />
          )}
        </div>

        {/* Doctor Info */}
        <div className='md:px-10 col-span-2 mt-5 flex flex-col gap-3 items-baseline'>
          {loading ? (
            // Skeleton Effect for Text (Map through to create multiple skeleton lines)
            [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className='h-[20px] bg-slate-100 w-full rounded-lg animate-pulse mb-2'
              ></div>
            ))
          ) : (
            <>
              <h2 className='font-bold text-2xl'>{doctorData.Name}</h2>
              <h2 className='flex gap-2 text-gray-500 text-md'>
                <GraduationCap />
                <span>{doctorData.Year_of_Experience} Years of Experience</span>
              </h2>
              <h2 className='text-md flex gap-2 text-gray-500'>
                <MapPin />
                <span>{doctorData.Address}</span>
              </h2>
              <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>
                {doctorData.category?.data?.attributes?.Name}
              </h2>
            </>
          )}

          {/* Social Media Links */}
          <div className='flex gap-3'>
            {socialMediaList.map((item, index) => (
              <Image
                src={item.icon}
                key={index}
                alt='social'
                width={30}
                height={30}
              />
            ))}
          </div>
          {!loading && <BookAppointment doctor={doctor} />}
        </div>
      </div>

      {/* About doctor */}
      <div className="p-3 border-1 rounded-lg mt-5">
        <h2 className="font-bold text-[20px]">About Me</h2>
        {loading ? (
          // Skeleton Effect for About Section
          <div className='h-[100px] bg-slate-100 w-full rounded-lg animate-pulse'></div>
        ) : (
          <p className="text-gray-500 tracking-wider mt-2">{doctorData.About}</p>
        )}
      </div>
    </>
  );
}

export default DoctorDetail;
