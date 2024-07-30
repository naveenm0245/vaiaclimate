// import { modelGoogleGenAI } from "@/lib/gemini/utils";
import { pc } from "@/lib/pinecone/pinecone";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";

export async function POST(request: Request) {
  const body = await request.json();
  const { question } = body;
  const { fileName } = body;
  // console.log(question);

  if (!question) return new Response("Type Question", { status: 400 });
  if(!fileName) return new Response("Please Select a File!", { status: 400 });
  console.log('file in server:', fileName);

  const modelGoogleGenAI = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY as string,
    modelName: "embedding-001",
  });

  const embeddings = modelGoogleGenAI;
  // console.log(embeddings);

  const pcIndex = pc.Index("vaiaclimate");

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: pcIndex,
    namespace: fileName,
  });
  // console.log('vectorstore : ', vectorStore);

  const results = await vectorStore.similaritySearch(question, 2);
  console.log('results : ', results);

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    maxOutputTokens: 2048,
    temperature: 0.3,
  });

  const context = results.map((result) => result.pageContent).join("\n\n");

  //  const prompt = `
  //   system,
  //   You are an expert AI assistant. Please provide a detailed answer to the question using the provided context. Ensure that your answer is based solely on the context. If the answer is not available in the provided context, state, "Answer is not available in the provided document." Do not attempt to fabricate an answer.

  //   Context:
  //   ${context}

  //   Question:
  //   ${question}

  //   Answer:
  //   `;

    const prompt = `
    system,
    Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
    provided context just say, "Answer is not available in the provided document.", don't provide the wrong answer.

    Context:
    ${results.map((result) => result.pageContent).join("\n\n")}

    Question:
    ${question}
    `;

  // const res = await model.invoke([
  //   "system",
  //   `Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
  //   provided context just say, "Answer is not available in the provided document.", don't provide the wrong answer\n\n
  //   Context:\n ${results.map((result) => result.pageContent).join("\n")}?\n
  //   Question: \n ${question}\n`,
  // ]);
  const res = await model.invoke([prompt]);
  console.log(res.content);

  try {
    const res = await model.invoke([prompt]);
    console.log(res.content);
    return new Response(
      JSON.stringify({ message: "ok", data: { content: res.content } }),
      { status: 200 }
    );
  }catch(err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Error", data: { content: res.content } }), { status: 500 });
  }
}
