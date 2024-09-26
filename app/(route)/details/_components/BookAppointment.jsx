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
import emailjs from 'emailjs-com'; // Import EmailJS
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';

function BookAppointment({ doctor }) {
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();
    const [note, setNote] = useState('');
    const { user } = useKindeBrowserClient();

    const saveBooking = () => {
        // Check if the user is logged in
        if (!user) {
            console.error('User is not available');
            toast.error('User is not logged in.');
            return; // Exit early if user is not available
        }

        const data = {
            data: {
                UserName: `${user.given_name || 'Guest'} ${user.family_name || ''}`,
                Date: date.toISOString(), // Ensure the date is in the correct format
                Email: user.email || 'noemail@example.com',
                Time: selectedTimeSlot,
                doctor: doctor.id,
                Note: note,
            }
        };

        // Save the booking in your backend (if needed)
        GlobalApi.bookAppointment(data).then(resp => {
            if (resp) {
                // Sending email using EmailJS
                const emailParams = {
                    from_name: user.given_name || 'Guest',
                    to_email: user.email || 'noemail@example.com',
                    message: `Your appointment is confirmed for ${data.data.Date} at ${data.data.Time}.`,
                };

                emailjs.send(
                    'service_9bad13t', // Replace with your EmailJS Service ID
                    'template_swaebgq', // Replace with your EmailJS Template ID
                    emailParams,
                    'HPqnFe-tLsFOj-TFr' // Replace with your EmailJS User ID
                )
                .then((response) => {
                    console.log('Email sent successfully!', response.status, response.text);
                    toast('Booking Confirmation sent on Email');
                })
                .catch((error) => {
                    console.error('Error sending email:', error);
                    toast.error('Failed to send confirmation email');
                });
            }
        });
    };

    const isPastDay = (day) => day <= new Date();

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
            <DialogContent className='bg-slate-50 max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle className='text-center font-bold pb-4'>Book Appointment</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            <div className='grid gap-3 grid-cols-1 sm:grid-cols-2'>
                                {/* Calendar */}
                                <div className='flex flex-col items-baseline w-full'>
                                    <h2 className='flex gap-2 items-center'>
                                        <CalendarDays className='text-primary h-5 w-5' />
                                        Select Date
                                    </h2>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        disabled={isPastDay}
                                        className="rounded-md mt-2 border bg-slate-50 w-full"
                                    />
                                </div>

                                {/* Time Slot */}
                                <div className='mt-3 sm:mt-0 w-full'>
                                    <h2 className='flex gap-2 items-center mb-3'>
                                        <Clock className='text-primary h-5 w-5' />
                                        Select Time Slot
                                    </h2>
                                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 border rounded-lg p-5'>
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
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className='w-full bg-slate-50 border rounded-md h-[100px] mt-5 p-2'
                                    placeholder="Additional notes (optional)"
                                />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" className='text-red-500 border-red-500 w-full sm:w-auto' variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        className='w-full sm:w-auto'
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
