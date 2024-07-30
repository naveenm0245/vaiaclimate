"use client";

import Link from 'next/link';
import React from 'react'
import useStore from '@/lib/zustand/store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '../ui/button';

interface SelectedFilesProps {
  data: {
    url: string;
    fileName: string;
    remarks: string | null;
    id: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

const SelectFiles:React.FC<SelectedFilesProps> = ({data}) => {
      const [selected, setSelected] = React.useState("");
      const { setFileName, fileName } = useStore();

      console.log("fileName : ", fileName);

  return (
    <div className='space-y-4 bg-red-'>
      <div className="flex flex-col space-y-4 py-2">
        {data.map((record, index) => (
          <div key={index} className="py-2">
            <Link
              href={record.url}
              target="_blank"
              className="text-emerald-600 hover:text-emerald-600/90 cursor-pointer text-sm border-[2px] border-neutral-300 rounded-lg p-2 line-clamp-1 max-w-fit"
            >
              {record.fileName}
            </Link>
          </div>
        ))}
      </div>
      <div>
        <Select onValueChange={setFileName}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="File" />
          </SelectTrigger>
          <SelectContent>
            {data.map((record, index) => (
              <SelectItem key={index} value={record.fileName}>
                {record.fileName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>{fileName && <h1>Selected File : {fileName}</h1>}</div>
    </div>
  );
}

export default SelectFiles
