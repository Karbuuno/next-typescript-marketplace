import { getServerSession, Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { productSchema } from "../../../../validationSchema/productSchema";

import prisma from "../../../../../prisma/prismaClient";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { authOptions } from "../../auth/[...nextauth]/route";
interface FieldsValue {
  [key: string]: string;
}

const s3Client = new S3Client({
  region: process.env.AWS_BUCKER_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});
const uploadFile = async (file: Buffer, fileName: string): Promise<string> => {
  const bucketName = process.env.AWS_BUCKET_NAME as string;

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: fileName,
      Body: file,
    },
  });

  upload.on("httpUploadProgress", progress => {
    if (progress.loaded !== undefined && progress.total !== undefined) {
      console.log(`uploaded progress: ${progress.loaded} of ${progress.total}`);
    }
  });

  await upload.done();

  return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
};
// Create new products
export async function POST(req: NextRequest) {
  // if (req.headers.get("content-length") === "0") {
  //   return NextResponse.json(
  //     { error: "you have to provide body information" },
  //     { status: 400 }
  //   );
  // }

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const formData = await req.formData();
  const fields: FieldsValue = {};
  const base64Images = [];
  for (const [key, value] of formData) {
    if (key.startsWith("newImages") && typeof value === "string") {
      base64Images.push(value);
    } else if (typeof value === "string") {
      fields[key] = value;
    }
  }
  const newImageUrls = await Promise.all(
    base64Images.map(async base64Image => {
      const buffer = Buffer.from(base64Image.split(",")[1], "base64");

      const fileName = `${uuidv4()}.jpeg`;

      return await uploadFile(buffer, fileName);
    })
  );

  try {
    const newProduct = await prisma?.product.create({
      data: {
        // sellerId: session.user.id,
        sellerId: session.user.id,
        name: fields.name,
        color: fields.color,
        brand: fields.brand,
        size: fields.size,
        condition: fields.condition,
        location: fields.location,
        categoryId: fields.categoryId,
        subcategoryId: fields.subcategoryId,
        thumbnail: newImageUrls[0] || "",
        gallery: newImageUrls,
        price: parseFloat(fields.price),
        description: fields.description,
      },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Error registering product files" },
      { status: 500 }
    );
  }
}
// get all products
export async function GET(req: NextRequest) {
  // get all products

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products, { status: 200 });
}
