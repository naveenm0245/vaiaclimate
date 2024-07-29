import { model } from "@/lib/gemini/utils";
import { pc } from "@/lib/pinecone/pinecone";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { PineconeStore } from "@langchain/pinecone";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file") as File;
  const loader = new PDFLoader(file);
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
    namespace: file.name,
  });

  return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}
