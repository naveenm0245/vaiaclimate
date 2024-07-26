
import SubmitFile from '@/components/calculateEmission/SubmitFile';
import { Input } from '@/components/ui/input'
import React from 'react'

const CalculatePage = () => {
  return (
    <main>
      <section>
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-semibold">
            Calculate CO<sub>2</sub> Emission
          </h1>
          <div>
            <SubmitFile/>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CalculatePage
