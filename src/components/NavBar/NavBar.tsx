import Image from 'next/image'
import React from 'react'
import logo from "../../../public/logo/logo-via.png"
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'

const NavBar = () => {
  return (
    <aside>
      <div className="flex items-center justify-between p-[2rem]">
        <div>
          <Image src={logo} alt="logo" height={50} width={150} />
        </div>
        <div className='flex items-center space-x-[1rem]'>
          <Link href="/sign-in" className={buttonVariants({ variant: "secondary" })}>Login</Link>
          <Link href="/sign-in" className={buttonVariants()}>Sign Up</Link>
        </div>
      </div>
    </aside>
  );
}

export default NavBar
