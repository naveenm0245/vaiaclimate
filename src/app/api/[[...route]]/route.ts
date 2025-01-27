import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Env, Hono } from "hono";
import { handle } from "hono/vercel";
import { env } from "hono/adapter";
import { getUserAuth } from "@/lib/auth/utils";
import { generateSlug } from "@/lib/utils";
import { nanoid } from "nanoid";

export const runtime = "edge";

const app = new Hono<Env>().basePath("/api");

app.post("/uploadaws", async (c) => {
  const body = await c.req.parseBody();
  // console.log(body);
  const file = body["file"] as File;
  // console.log(file);

  //checking type and size of file otherwise responsing error

  if (!file) {
    return c.json({ message: `Please select a file to upload.` }, 400);
  }

  if (file.type !== "application/pdf") {
    return c.json({ message: `Please select a pdf file to upload.` }, 400);
  }

  if (file.size > 30 * 1024 * 1024) {
    return c.json({ message: `File size exceeds 30MB.` }, 400);
  }

  //uploading file

  const {
    S3_REGION,
    S3_URL,
    S3_ACCESS_KEY_ID,
    S3_ACCESS_KEY_SECRET,
    S3_BUCKET,
  } = env(c);

  const key = {
    region: S3_REGION as string,
    credentials: {
      accessKeyId: S3_ACCESS_KEY_ID as string,
      secretAccessKey: S3_ACCESS_KEY_SECRET as string,
    },
  };

  // console.log('key: ' , key);
  const client = new S3Client(key);

  //replace all space in file.name with "_"

  const fileName =
    generateSlug(file.name.slice(0, -4)) + "_" + nanoid(3) + ".pdf";

  const input = {
    Bucket: S3_BUCKET as string,
    Key: fileName,
    Body: file,
    ContentType: file.type,
  };

  // console.log('input : ', input);
  const command = new PutObjectCommand(input);
  

  const url = `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${fileName}`;

  try {
    const response = await client.send(command);
    if (response) {
      // console.log(response);
      return c.json(
        {
          message: "File uploaded successfully",
          url: url,
          fileName: file.name,
          status: "success",
        },
        200
      );
    }
  } catch (error) {
    console.error(error);
  }
  // console.log(response);
  
  // console.log(url);

  return c.json({
    message: "Hello Upoloading File!",
    url: url,
    fileName: file.name,
    status: "success",
  });
});

export const GET = handle(app);
export const POST = handle(app);