"use client";

import { signIn } from "next-auth/react";
import logo from "../../../../public/logo/logo-via.png";
import Image from "next/image";

const Page = () => {
  return (
    <main className="bg-popover max-w-lg mx-auto my-4 rounded-lg p-10 space-y-4">
      <div className="flex justify-center items-center">
        <Image src={logo} alt="logo" height={50} width={150} />
      </div>
      <h1 className="text-2xl font-bold text-center">
        Sign in to your account
      </h1>

      <div className="mt-4">
        <button
          onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
          className="w-full bg-primary text-primary-foreground text-center hover:opacity-90 font-medium px-4 py-2 rounded-lg block"
        >
          Sign In
        </button>
      </div>
    </main>
  );
};

export default Page;
