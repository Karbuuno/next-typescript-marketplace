import { NextRequest, NextResponse } from "next/server";
import { subcategorySchema } from "../../../../validationSchema/subcategorySchema";

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
  const validation = subcategorySchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const newSubcategory = await prisma?.subcategory.create({
    data: {
      name: body.name,
      categoryId: body.categoryId,
    },
  });

  return NextResponse.json(newSubcategory, { status: 201 });
}

// get all categories
export async function GET(req: NextRequest) {
  // get all categories

  const allSubcategory = await prisma.subcategory.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(allSubcategory, { status: 200 });
}
