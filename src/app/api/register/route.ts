import bcrypt from "bcrypt";
import prisma from "../../../../prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    if (!name && !email && !password) {
      return new NextResponse("Missing fields", { status: 2001 });
    }
    const exist = await prisma.user.findUnique({
      where: { email },
    });
    console.log(exist);
    if (exist) {
      throw new Error(`User ${name} already exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    console.log(error);
  }
}
