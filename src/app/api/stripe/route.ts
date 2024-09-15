import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "../../../../prisma/prismaClient";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  if (request.method === "POST") {
    const _raw = await request.text();

    const signature = request.headers.get("stripe-signature") as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        _raw,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET_KEY as string
      );

      switch (event.type) {
        case "checkout.session.completed":
          const chargeSucceeded = event.data.object;

          if (event.data.object.metadata) {
            const orderItems = JSON.parse(event.data.object.metadata?.items);

            const userId = event.data.object.metadata.userId;

            const userInfo = await prisma?.user.findUnique({
              where: { id: userId },
            });
            await Promise.all(
              orderItems.items.map(async (item: any) => {
                const product = await prisma?.product.findUnique({
                  where: { id: item.id },
                });
                if (product) {
                  const order = await prisma?.order.create({
                    data: {
                      userId: userInfo?.id as string,
                      productId: product?.id as string,
                      name: product?.name,
                      brand: product?.brand,
                      price: product?.price,
                      color: product?.color,
                      status: "paid",
                    },
                  });
                }
              })
            );
          }

          break;
      }

      return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json("error", { status: 400 });
    }
  }
}
