import ChatComponent from "@/components/chat/ChatComponent";
import AllUserFiles from "@/components/upload/AllUserFiles";
import UploadComponent from "@/components/upload/UploadComponent";
import { api } from "@/lib/trpc/api";
import Link from "next/link";

export const dynamic = "force-dynamic";

const DocumentPage = async () => {
  return (
    <div className="flex flex-col min-h-screen w-full py-12 ">
      <h1 className="text-3xl font-semibold text-center">Document Parser For Vaia Climate</h1>
      <div className="flex space-x-4 p-[2rem] bg-red-">
        <div className="w-[4/10] border-r-[2px] border-primary-foreground px-[2rem] flex flex-col space-y-4">
          <UploadComponent />
          <AllUserFiles/>
        </div>
        <div className="w-[6/10] bg-blue min-w-lg">
          <ChatComponent />
        </div>
      </div>
    </div>
  );
}

export default DocumentPage;


