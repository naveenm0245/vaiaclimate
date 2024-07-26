import { Button } from '@/components/ui/button';
import { api } from '@/lib/trpc/api'
import Link from 'next/link';
import React from 'react'

const PastRecords = async () => {
    const data = await api.protected.getReocrdsOfUserTrpc.query();

    if(data.length === 0) return <div>No Records Found</div>
  return (
    <div className='space-y-4'>
      <h1 className="text-2xl font-semibold">Past Records : </h1>
      <div className='space-y-4'>
        {data.map((record, index) => (
          <div
            key={index}
            className="text-lg flex flex-row justify-between items-center w-full rounded-lg bg-slate-100 p-[1.2rem]"
          >
            <Link href={record.url} target="_blank">
              <h1 className="p-2 text-emerald-600 hover:text-emerald-600/90 cursor-pointer">
                {record.fileName}
              </h1>
            </Link>
            <Button asChild>
              <Link href={"/dashboard"}>Analysis</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PastRecords
