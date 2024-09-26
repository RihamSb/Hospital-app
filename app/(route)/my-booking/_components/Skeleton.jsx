import React from 'react'

function Skeleton() {
  return (
    <div className="animate-pulse flex gap-4 items-center border p-5 m-3 rounded-lg">
      <div className="rounded-full bg-gray-300 h-[70px] w-[70px]"></div>
      <div className="flex flex-col gap-2 w-full">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  )
}

export default Skeleton;
