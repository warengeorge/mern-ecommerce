import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <div className='flex bg-black p-5'>
      <Link href='/'>
        <h1 className='text-3xl font-semibold text-white'>Products</h1>
      </Link>
    </div>
  )
}

export default Header