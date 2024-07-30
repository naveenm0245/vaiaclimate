"use client";

import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/lib/trpc/client';
import { toast } from 'sonner';

const UploadPreSigned = () => {
     const [ref, setRef] = React.useState<HTMLInputElement | null>(null);
     const [isSubmitting, setIsSubmitting] = React.useState(false);
     const [message, setMessage] = useState("");


     const router = useRouter();

     const createRecord = trpc.protected.createRecordTrpc.useMutation({
       onSuccess: () => {
         toast.success("File uploaded. Indexing the File...");
       },
       onError: (error) => {
         //  console.log(error);
         toast.error(error.message);
       },
     });

     const uploadFile = async () => {
        if (!ref) return;
        const file = ref?.files![0];
        if (!file) {
          setMessage("Please select a file to upload.");
          return;
        }
        setIsSubmitting(true);
        setMessage("");
        
        try {
      const response = await fetch('/api/presigned', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      const data = await response.json();

      if (response.ok) {
        // Upload the file to S3 using the signed URL
        const uploadResponse = await fetch(data.url, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
          },
          body: file,
        });

        if (uploadResponse.ok) {
            
          setMessage('File uploaded successfully.');
          toast.success('File uploaded successfully. Indexing the File...');
        //   router.refresh();

        //   const formData = new FormData();
        //   formData.append("file", file);

           const response2 = await fetch("/api/uploadv2", {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               fileName: data.publicUrl.split("/").slice(-1)[0],
               name : file.name,
               fileType: file.type,
             }),
           });

           if (response2.ok) {
            await createRecord.mutateAsync({
              fileName: file.name,
              url: data.publicUrl as string,
              remarks: "NA",
            });
             console.log("File Indexed successfully");
             toast.success("File Indexed successfully");
             router.refresh();
           } else {
             console.error("File Index failed");
             toast.error("File Index failed, Upload Rejected");
           }



        } else {
          setMessage('Failed to upload file.');
        }
      } else {
        setMessage(data.error || 'Failed to get signed URL.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('An error occurred while uploading the file.');
    } finally {
      setIsSubmitting(false);
    }

    
  };

  return (
    <div className="flex flex-col w-full space-y-4 lg:min-w-[400px]">
      <Input
        type="file"
        placeholder="Upload File"
        onChange={(e) => {
          e.target.files![0];
        }}
        ref={setRef}
      />
      <Button className="max-w-fit" onClick={uploadFile}>
        {isSubmitting ? (
          <div className="flex space-x-2 items-center">
            <Loader2 className="w-6 h-6 animate-spin transition-all" />
            <h1>Uploading...</h1>
          </div>
        ) : (
          "Upload"
        )}
      </Button>
       {message && <p>{message}</p>}

     
    </div>
  );
}

export default UploadPreSigned
