import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { authOptions } from "../../auth/[...nextauth]/route";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  try {
    const lineItems = await Promise.all(
      body.items.map(async (item: any) => {
        const product = await prisma?.product.findUnique({
          where: { id: item.id },
        });

        const unitAmount = (product?.price as number) * 100;

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product?.name,
              images: [item.image],
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        };
      })
    );

    const stripeSession = await stripe.checkout.sessions.create({
      metadata: {
        userId: session.user?.id,
        items: JSON.stringify(body),
      },
      customer_email: session.user?.email as string,
      line_items: lineItems,
      mode: "payment",
      success_url:
        process.env.NODE_ENV === "production"
          ? "https://websitename/success"
          : "http://localhost:3000/success",
      cancel_url:
        process.env.NODE_ENV === "production"
          ? "https://websitename/cancel"
          : "http://localhost:3000/cancel",
    });
    console.log(stripeSession);

    return NextResponse.json(stripeSession, { status: 200 });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json("error", { status: 400 });
  }
}

// import { metadata } from "./../../../layout";
// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { authOptions } from "../../auth/[...nextauth]/route";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-06-20",
// });
// export async function POST(request: NextRequest) {
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({}, { status: 401 });

//   const body = await request.json();
//   const { items } = body;
//   console.log("metaData", items.price);

//   try {
//     const stripeSession = await stripe.checkout.sessions.create({
//       customer_email: session.user?.email as string,
//       line_items: [
//         {
//           price_data: {
//             currency: "USD",
//             product_data: {
//               name: items.name,
//               images: [items.image],
//             },
//             unit_amount: Math.round(items.price * 100),
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url:
//         process.env.NODE_ENV === "production"
//           ? "https://websitename/success"
//           : "http://localhost:3000/success",
//       cancel_url:
//         process.env.NODE_ENV === "production"
//           ? "https://websitename/cancel"
//           : "http://localhost:3000/cancel",
//     });

//     return NextResponse.json(stripeSession, { status: 200 });
//   } catch (error) {
//     console.log("error: ", error);
//     return NextResponse.json("error", { status: 400 });
//   }
// }
