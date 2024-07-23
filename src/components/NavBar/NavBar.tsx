import Image from 'next/image'
import React from 'react'
import logo from "../../../public/logo/logo-via.png"
import { Button } from '../ui/button'

const NavBar = () => {
  return (
    <aside>
      <div className="flex items-center justify-between p-[2rem]">
        <div>
          <Image src={logo} alt="logo" height={50} width={150} />
        </div>
        <div className='flex items-center space-x-[1rem]'>
          <Button variant={"secondary"}>Login</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </aside>
  );
}

export default NavBar