import Image from "next/image";
import React from "react";
import scope from "../../../public/logo/scope1.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import man from "../../../public/logo/man.jpg";
import windmil from "../../../public/image/windmil.jpg";

const HomePage = () => {
  return (
    <main>
      <section className="w-full min-h-screen max-w-[1300px] mx-auto ">
        {/* <div className="flex items-center justify-center">
          <Image src={windmil} alt="logo" className="max-w-[1400px] max-h-[400px] object-fill" />
        </div> */}
        <div className="flex items-center justify-center flex-col gap-[2rem] mx-8">
          <h1 className="text-3xl text-center text-emerald-600 font-semibold hover:text-emerald-600/90">
            Corporate CO<sub>2</sub> Emission Calculator
          </h1>
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between space-y-6 lg:space-y-0 gap-2">
            <Image
              src={scope}
              alt="logo"
              className="max-w-[400px] lg:max-w-screen-md"
            />
            <div className="flex flex-col space-y-6">
              <h1 className="text-3xl text-emerald-700 font-semibold max-w-lg text-left">
                Track and Reduce Carbon Emissions with our AI-Powered Tracker
              </h1>
              <h1 className="text-xl font-medium text-left">
                Our CO2 Carbon Emission Tracker helps businesses reduce their
                carbon footprint, comply with regulations, and save costs.
              </h1>
              <div className="max-w-fit space-x-6 flex">
                <Button asChild>
                  <Link href="/calculate">Calculate Emission</Link>
                </Button>
                <Button variant={"secondary"}>Learn More</Button>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col lg:flex-row-reverse items-center justify-between space-y-6 lg:space-y-0 lg:space-x-[2rem] mx-auto gap-[2rem]">
            <div className="flex flex-col space-y-6">
              <h1 className="text-3xl text-emerald-700 font-semibold max-w-lg text-left">
                Track and Reduce Carbon Emissions with our AI-Powered Tracker
              </h1>
              <h1 className="text-xl font-medium text-left">
                Our CO2 Carbon Emission Tracker helps businesses reduce their
                carbon footprint, comply with regulations, and save costs.
              </h1>
              <div className="max-w-fit space-x-6 flex">
                <Button asChild>
                  <Link href="/calculate">Calculate Emission</Link>
                </Button>
                <Button variant={"secondary"}>Learn More</Button>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <Image
                src={windmil}
                alt="logo"
                className="max-w-[calc(100%)] lg:max-w-screen-md"
              />
            </div>
          </div> */}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
