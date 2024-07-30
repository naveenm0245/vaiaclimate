import { generateSlug, nanoid } from "@/lib/utils";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.S3_REGION as string,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_ACCESS_KEY_SECRET as string,
  },
});

export async function POST(request: Request) {
  const body = await request.json();
  const { fileName, fileType } = body;
  console.log(fileName, fileType);

  if (!fileName || !fileType) {
    return new Response("Missing fileName or fileType", { status: 400 });
  }

  const fileSafeName =
    generateSlug(fileName.slice(0, -4)) + "_" + nanoid(3) + ".pdf";

  const params = {
    Bucket: process.env.S3_BUCKET as string,
    Key: fileSafeName,
    ContentType: fileType,
  };

  const publicUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${fileSafeName}`;

  try {
    const command = new PutObjectCommand(params);
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60*5 }); // URL expires in 5 minutes
  return new Response(JSON.stringify({ url: signedUrl , publicUrl }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to upload file" }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}
