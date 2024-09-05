import { NextRequest, NextResponse } from "next/server";
import { categorySchema } from "./../../../../validationSchema/categorySchema";

import prisma from "../../../../../prisma/prismaClient";

// Create new categories
export async function POST(req: NextRequest) {
  if (req.headers.get("content-length") === "0") {
    return NextResponse.json(
      { error: "you have to provide body information" },
      { status: 400 }
    );
  }
  const body = await req.json();
  const validation = categorySchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const newCategory = await prisma?.category.create({
    data: {
      name: body.name,
    },
  });

  return NextResponse.json(newCategory, { status: 201 });
}

// get all categories
export async function GET(req: NextRequest) {
  // get all categories

  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(categories, { status: 200 });
}
