"use client";

import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  answerFile: z.instanceof(File).optional(),
  body: z.string().min(2, {
    message: "Explaination of your answer must be at least 2 characters.",
  }),
});

const SubmitFile = () => {
     const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
         body: "",
       },
     });

     const { isSubmitting, errors } = form.formState;
     const { setError } = form;

     const router = useRouter();

     const createRecord = trpc.protected.createRecordTrpc.useMutation({
       onSuccess: () => {
         form.reset();
         toast.success("File uploaded successfully");
         router.refresh();
       },
       onError: (error) => {
         //  console.log(error);
         toast.error(error.message);
       },
     });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);  

        const file = values.answerFile!;
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Failed to upload file");
          }

          const data = await response.json();
          console.log(data);
          const record_data = {
            fileName : data.fileName, 
            url : data.url, 
            remarks : values.body, 
          }

          await createRecord.mutateAsync(record_data);



          // toast.success("File uploaded successfully");
          // revalidatePath("/calculate");
          router.push("/dashboard");
        } catch (error) {
          console.error(error);
        //    setError("answerFile", { message: error.message });
        }
    }
  return (
    <div>
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="answerFile"
            render={({ field : {value, onChange, ...field} }) => (
              <FormItem>
                <FormLabel>Upload Environmental Impact Report</FormLabel>
                <FormControl>
                  <Input
                    
                    {...field}
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      onChange(e.target.files![0]);
                    }}
                    className="focus-visible:ring-0 dark:focus-visible:ring-1"
                  />
                </FormControl>
                <FormDescription>
                  Upload Your Environmental Impact Report. It should be in PDF format.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarks on your file : [To be Read by AI Assistant]</FormLabel>
                <FormControl>
                  <Textarea
                    rows={12}
                    className="focus-visible:ring-0 dark:focus-visible:ring-1"
                    {...field}
                    placeholder="Remarks on your file."
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <Button type="submit" className=''>
              {isSubmitting ? (
                <>
                  <div className="flex space-x-2">
                    <h1>Submitting </h1>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </div>
                </>
              ) : (
                "Submit"
              )}
            </Button>
            <h1 className="text-sm text-neutral-500">
              By clicking “Submit”, you agree to our terms of service
              and acknowledge you have read our privacy policy.
            </h1>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SubmitFile
