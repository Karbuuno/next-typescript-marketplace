import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Knock } from "@knocklabs/node";
const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY);

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  try {
    const body = await request.json();
    const { newOffer } = body;
    console.log(newOffer);

    // if (!productId || !buyerId || !sellerId || !price) {
    //   return NextResponse.json(
    //     { error: "Missing required fields" },
    //     { status: 400 }
    //   );
    // }

    const product = await prisma.product.findUnique({
      where: { id: newOffer.productId },
      include: { user: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (!product.sellerId) {
      return NextResponse.json(
        { error: "Seller not found for the product" },
        { status: 400 }
      );
    }
    // const seller = prisma.user.findMany({
    //   where: {
    //     id: product.sellerId
    //   },
    //   select: {
    //     id: true,
    //   },
    // });
    // await knockClient.workflows.trigger("new-offer", {
    //   actor: session?.user.id,
    //   recipients: [product.sellerId as string],
    //   data: {
    //     productName: product.name,
    //     buyerName: session?.user.name,
    //     offerPrice: newOffer.price,
    //   },
    // });

    const offer = await prisma.offer.create({
      data: {
        productId: newOffer.productId,
        buyerId: newOffer.buyerId,
        sellerId: product.sellerId,
        name: product.name,
        price: newOffer.price,
        status: "pending",
      },
    });

    return NextResponse.json(offer);
  } catch (error) {
    console.error("Error creating offer:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
// Get All offers

export async function GET(req: NextRequest) {
  // Get the session to check if the user is authenticated
  const session = await getServerSession(authOptions);

  // If the session is not found, return unauthorized
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id; // Assuming the user's ID is stored in the session

  try {
    // Fetch offers where the user is either the buyer or seller
    const offers = await prisma.offer.findMany({
      where: {
        OR: [
          { buyerId: userId }, // Offers where the user is the buyer
          { sellerId: userId }, // Offers where the user is the seller
        ],
      },
      orderBy: { createdAt: "desc" }, // Order offers by creation date
    });

    return NextResponse.json(offers, { status: 200 });
  } catch (error) {
    console.error("Error fetching user offers:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
