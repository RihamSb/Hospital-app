"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingList from './_components/BookingList'
import Skeleton from './_components/Skeleton' // Import your skeleton loader component
import GlobalApi from '@/app/_utils/GlobalApi'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

function MyBooking() {
    const { user } = useKindeBrowserClient();
    const [bookingList, setBookingList] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        if (user) {
            getUserBookingList();
        }
    }, [user]);

    const getUserBookingList = () => {
        setLoading(true); // Start loading
        GlobalApi.getUserBookingList(user?.email).then(resp => {
            setBookingList(resp.data.data);
            setLoading(false); // Data fetched, stop loading
        });
    }

    const filterUserBooking = (type) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return bookingList.filter(item =>
            type === 'upcoming'
                ? new Date(item.attributes.Date) >= today
                : new Date(item.attributes.Date) < today
        );
    }

    return (
        <div className='px-4 sm:px-10 mt-10 min-h-screen flex flex-col'>
            <h2 className="font-bold text-2xl">My Booking</h2>
            <Tabs defaultValue="upcoming" className="w-full mt-5 flex-grow">
                <TabsList className='text-black w-full justify-start'>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="expired">Expired</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                    {loading ? (
                        <>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </>
                    ) : filterUserBooking('upcoming').length > 0 ? (
                        <BookingList 
                            bookingList={filterUserBooking('upcoming')}
                            expired={false}
                            updateRecord={() => getUserBookingList()}
                        />
                    ) : (
                        <div className="text-center text-gray-500 py-10">
                            No upcoming appointments
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="expired">
                    {loading ? (
                        <>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </>
                    ) : filterUserBooking('expired').length > 0 ? (
                        <BookingList 
                            bookingList={filterUserBooking('expired')}
                            expired={true}
                            updateRecord={() => getUserBookingList()}
                        />
                    ) : (
                        <div className="text-center text-gray-500 py-10">
                            No expired appointments
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default MyBooking;
