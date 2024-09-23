import React from 'react'
import CategoryList from './_components/CategoryList'

function layout({children, params}) {
  return (
    // sm:list-item
    <div className='sm:grid sm:grid-cols-4' >

        <div className='hidden md:block' >
            {/* category */}
            <CategoryList />
        </div>

        <div className='col-span-4 md:col-span-3 '>
            {children}
        </div>
        
    </div>
  )
}

export default layout
