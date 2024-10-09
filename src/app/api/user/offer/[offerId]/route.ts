import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "../../../../../../prisma/prismaClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { offerId: string } }
) {
  // Get the session to check if the user is authenticated
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  if (request.headers.get("content-length") === "0") {
    return NextResponse.json(
      { error: "You must provide body information" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { status } = body;

  // Validate that the status is either 'accepted' or 'rejected'
  if (!["accepted", "rejected"].includes(status)) {
    return NextResponse.json(
      { message: "Invalid status value", status: 400 },
      { status: 400 }
    );
  }

  try {
    // Fetch the offer to ensure it exists
    const offer = await prisma.offer.findUnique({
      where: { id: params.offerId },
    });
    console.log("Offer found:", offer);
    if (!offer) {
      return NextResponse.json({ message: "Offer not found", status: 404 });
    }

    // Check if the user is either the buyer or seller of the offer
    const isAuthorized =
      offer.buyerId === session.user.id || offer.sellerId === session.user.id;

    if (!isAuthorized) {
      return NextResponse.json(
        {
          message: "You do not have permission to update this offer",
          status: 403,
        },
        { status: 403 }
      );
    }

    // Update the offer status
    const updatedOffer = await prisma.offer.update({
      where: { id: params.offerId },
      data: { status },
    });
    if (status === "accepted") {
      try {
        const updatedProduct = await prisma.product.update({
          where: { id: offer.productId },
          data: { price: offer.price },
        });
        console.log(updatedProduct);
      } catch (error) {
        // Handle the product update failure
        console.error("Error updating product price:", error);
        return NextResponse.json({
          message: "Failed to update product price",
          status: 500,
        });
      }
    }

    return NextResponse.json({
      message: `Offer ${status} successfully`,
      offer: updatedOffer,
      status: 200,
    });
  } catch (error) {
    console.error("Error updating offer:", error);
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}

// Method not allowed handler for other HTTP methods
export async function methodNotAllowed() {
  return NextResponse.json(
    { message: "Method Not Allowed", status: 405 },
    { status: 405 }
  );
}
