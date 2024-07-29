import { api } from '@/lib/trpc/api';
import Link from 'next/link';
import React from 'react'
import SelectFiles from './SelectFiles';

const AllUserFiles = async () => {
    const data = await api.protected.getReocrdsOfUserTrpc.query();

    if (data.length === 0) return <div>No Records Found</div>;
  return (
   <div>
    <h1>All User Files : </h1>
    <SelectFiles data={data} />
   </div>
  )
}

export default AllUserFiles
