"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const UploadComponent = () => {
  //upload file
  const [ref, setRef] = React.useState<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
    setIsSubmitting(true);
    console.log(ref?.files);
    const file = ref?.files![0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const response1 = await fetch("/api/uploadaws", {
      method: "POST",
      body: formData,
    });

     if (!response1.ok) {
       throw new Error("Failed to upload file");
     }

     const data = await response1.json();
     console.log(data);
     const record_data = {
       fileName: data.fileName,
       url: data.url,
       remarks: "NA",
     };

     await createRecord.mutateAsync(record_data);


    const response2 = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response2.ok) {
      console.log("File Indexed successfully");
      toast.success("File Indexed successfully");
      router.refresh();

      setIsSubmitting(false);
    } else {
      console.error("File Index failed");
      toast.error("File Index failed");
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

      <div>{/* <h1>All Uploaded Documents : </h1> */}</div>
    </div>
  );
};

export default UploadComponent;
