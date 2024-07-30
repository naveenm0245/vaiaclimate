import { model } from "@/lib/gemini/utils";
import { pc } from "@/lib/pinecone/pinecone";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { PineconeStore } from "@langchain/pinecone";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { bufferToBlob } from "@/lib/utils";

const s3 = new S3Client({ region: process.env.S3_REGION as string });


const streamToBuffer = (stream: Readable): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
}

export async function POST(request: Request) {
//   const form = await request.formData();
//   const file = form.get("file") as File;
//   const loader = new PDFLoader(file);
//   const docs = await loader.load();
//   console.log(docs);


 const body = await request.json();
 const { fileName } = body;
 console.log(fileName);

  const params = {
    Bucket: process.env.S3_BUCKET as string,
    Key: fileName,
  };

  try {
     const data = await s3.send(new GetObjectCommand(params));
     const fileBuffer = await streamToBuffer(data.Body as Readable);
     const fileBlob = bufferToBlob(fileBuffer, "application/pdf");
     const loader = new PDFLoader(fileBlob as Blob);
     const docs = await loader.load();
     console.log(docs);

     const textSplitter = new RecursiveCharacterTextSplitter({
       chunkSize: 3000,
       chunkOverlap: 600,
     });

      const splitDocs = await textSplitter.splitDocuments(docs);
      console.log(splitDocs);
      console.log("length :", splitDocs.length);

      const pcIndex = pc.Index("vaiaclimate");

      const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "embedding-001", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      });

      const res = await embeddings.embedQuery("OK Google");

      console.log(res, res.length);

      await PineconeStore.fromDocuments(splitDocs, embeddings, {
        pineconeIndex: pcIndex,
        namespace: fileName,
      });

      return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
    
  } catch (error) {
     console.error(error);
     return new Response(JSON.stringify({ error: "Failed to Index file" }), { status: 500 });
  }

}
