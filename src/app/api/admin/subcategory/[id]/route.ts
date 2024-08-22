import { subcategorySchema } from "@/validationSchema/subcategorySchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prismaClient";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // update new subCategory

  if (request.headers.get("content-length") === "0") {
    return NextResponse.json(
      { error: "you have to provide body information" },
      { status: 400 }
    );
  }

  const body = await request.json();

  const validation = subcategorySchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const subcategory = await prisma?.subcategory.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!subcategory)
    return NextResponse.json("unknown subCategory please check out", {
      status: 404,
    });

  const updatedSubcategory = await prisma?.subcategory.update({
    where: {
      id: params.id,
    },
    data: {
      name: body.name,
      categoryId: body.categoryId,
    },
  });
  return NextResponse.json(updatedSubcategory, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // update new subCategory

  if (request.headers.get("content-length") === "0") {
    return NextResponse.json(
      { error: "you have to provide body information" },
      { status: 400 }
    );
  }

  const subcategory = await prisma?.subcategory.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!subcategory)
    return NextResponse.json("unknown subcategory please check out", {
      status: 404,
    });

  const deletedSubcategory = await prisma?.subcategory.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(deletedSubcategory, { status: 200 });
}
