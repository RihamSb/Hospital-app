"use client"
import { Button } from '@/components/ui/button'
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  
function Header() {
    const Menu =[
        {
            id:1,
            name: 'Home',
            path:'/'
        },
        {
            id:2,
            name: 'Explore',
            path:'/'
        },
        {
            id:3,
            name: 'Contact Us',
            path:'/'
        }
    ]

    const {user} = useKindeBrowserClient();

    useEffect(()=>{
        console.log(user)
    },[user])

  return (
    <div className='flex items-center justify-between p-4 shadow-sm'>
        <div className="flex items-center gap-10">
            <Link href={'/'}>
            <Image src='/logo.png' alt='logo'
            width={100}
            height={20} />
            </Link>
            
            <ul className='md:flex gap-8 hidden'>
                {Menu.map((item, index)=>(
                    <Link key={index} href={item.path}>
                    <li className='hover:text-primary cursor:pointer 
                    hover:scale-105 transition-all ease-in-out' key={index}>{item.name}</li>
                    </Link>
                ))}
            </ul>
        </div> 

        {
            user?

            <Popover>
            <PopoverTrigger>            
            <Image 
            src={user?.picture}
            alt='profile'
            width={50}
            height={50}
            className='rounded-full'
            />
            </PopoverTrigger>
            <PopoverContent className='w-44'>
                <ul className='flex flex-col gap-1'>
                    <li className='cursor-pointer rounded-md hover:bg-slate-100 p-2'>Profile</li>
                    <Link href={'/my-booking'} className='cursor-pointer rounded-md hover:bg-slate-100 p-2'>My Booking</Link>
                    <li className='cursor-pointer rounded-md hover:bg-slate-100 p-2'>
                     <LogoutLink>
                        Log out
                     </LogoutLink>
                    </li>
                </ul>
            </PopoverContent>
            </Popover>
            :
            <LoginLink>
                <Button>Get Started</Button>
            </LoginLink>
            
        }
        
        
    </div>
  )
}

export default Header