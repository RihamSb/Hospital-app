import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from 'lucide-react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';

function BookAppointment({ doctor }) {
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();
    const [note, setNote] = useState(''); // Added state for note input
    const { user } = useKindeBrowserClient();

    const saveBooking = () => {
        const data = {
            data: {
                UserName: user.given_name + " " + user.family_name,
                Date: date,
                Email: user.email,
                Time: selectedTimeSlot,
                doctor: doctor.id,
                Note: note
            }
        };
        GlobalApi.bookAppointment(data).then(resp => {
            console.log(resp);
            if (resp) {
                GlobalApi.sendEmail(data).then(resp=>{
                    console.log(resp)
                })
                toast('Booking Confirmation sent on Email');
            }
        });
    };

    const isPastDay = (day) => {
        return day <= new Date();
    };

    useEffect(() => {
        getTime();
    }, []);

    const getTime = () => {
        const timeList = [];
        for (let i = 10; i <= 12; i++) {
            timeList.push({ time: i + ':00 AM' });
            timeList.push({ time: i + ':30 AM' });
        }

        for (let i = 1; i <= 6; i++) {
            timeList.push({ time: i + ':00 PM' });
            timeList.push({ time: i + ':30 PM' });
        }
        setTimeSlot(timeList);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='mt-3 rounded-full'>Book Appointment</Button>
            </DialogTrigger>
            <DialogContent className='bg-slate-50'>
                <DialogHeader>
                    <DialogTitle className='text-center font-bold pb-4'>Book Appointment</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            <div className='grid gap-3 grid-cols-1 md:grid-cols-2'>
                                {/* Calendar */}
                                <div className='flex flex-col items-baseline'>
                                    <h2 className='flex gap-2 items-center'>
                                        <CalendarDays className='text-primary h-5 w-5' />
                                        Select Date
                                    </h2>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        disabled={isPastDay}
                                        className="rounded-md mt-2 border bg-slate-50"
                                    />
                                </div>

                                {/* Time Slot */}
                                <div className='mt-3 md:mt-0'>
                                    <h2 className='flex gap-2 items-center mb-3'>
                                        <Clock className='text-primary h-5 w-5' />
                                        Select Time Slot
                                    </h2>
                                    <div className='grid grid-cols-3 gap-2 border rounded-lg p-5'>
                                        {timeSlot?.map((item, index) => (
                                            <div
                                                onClick={() => setSelectedTimeSlot(item.time)}
                                                className={`p-2 border rounded-full cursor-pointer text-center hover:bg-primary hover:text-white ${item.time === selectedTimeSlot && 'bg-primary text-white'}`}
                                                key={index}>
                                                {item.time}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Notes Input */}
                            <div>
                                <textarea
                                    name="text"
                                    value={note} // Bound the note state to textarea
                                    onChange={(e) => setNote(e.target.value)}
                                    className='w-full bg-slate-50 border rounded-md h-[100px] mt-5'
                                    placeholder="Additional notes (optional)"
                                />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <span>
                            <Button type="button" className='text-red-500 border-red-500' variant="outline">
                                Close
                            </Button>
                        </span>
                    </DialogClose>
                    <Button
                        type="button"
                        onClick={saveBooking}
                        disabled={!(date && selectedTimeSlot)}>
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default BookAppointment;
