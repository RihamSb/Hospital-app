import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import CancelAppointment from './CancelAppointment'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import DeleteAppointment from './DeleteAppointment'

function BookingList({ bookingList, expired, updateRecord }) {

  const onDeleteBooking = (item) => {
    GlobalApi.deleteBooking(item.id).then(resp => {
      console.log(resp);
      if (resp) {
        toast('Booking Delete Successfully!');
        updateRecord();
      }
    })
  }

  return (
    <div>
      {bookingList && bookingList.map((item, index) => {
        const doctor = item?.attributes?.doctor?.data?.attributes;
        const doctorImage = doctor?.image?.data?.attributes?.url || '/dr-placeholder.jpg'; // Absolute path to the public folder

        return (
          <div key={index} className='flex gap-4 items-center border p-5 m-3 rounded-lg'>
            <Image
              src={doctorImage}
              width={70}
              height={70}
              alt='dr'
              className='rounded-full h-[70px] w-[70px] object-cover'
            />
            <div className='flex flex-col gap-2 w-full'>
              <h2 className='font-bold text-[18px] flex justify-between items-center'>
                {doctor?.Name}
                {!expired && <CancelAppointment onContinueClick={() => onDeleteBooking(item)} />}
                {expired && <DeleteAppointment onContinueClick={() => onDeleteBooking(item)} />}
              </h2>
              <h2 className='flex gap-2 text-gray-500'>
                <MapPin className='text-primary h-5 w-5' /> {doctor?.Address}
              </h2>
              <h2 className='flex gap-2'>
                <Calendar className='text-primary h-5 w-5' />Appointment On: {moment(item.attributes?.Date).format('DD-MMM-YYYY')}
              </h2>
              <h2 className='flex gap-2'>
                <Clock className='text-primary h-5 w-5' /> At Time: {item.attributes?.Time}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default BookingList;
