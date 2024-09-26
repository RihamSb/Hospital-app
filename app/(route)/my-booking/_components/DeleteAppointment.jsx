import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'


  
function CancelAppointment({onContinueClick}) {

  return (
    <AlertDialog >
    <AlertDialogTrigger asChild>
    <Button variant="outline" className="text-red-600 border-red-600">
        Delete Appointment
    </Button>
    </AlertDialogTrigger>
    <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your appointment
            and remove your data from our servers.
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={()=>onContinueClick()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>

  )
}

export default CancelAppointment