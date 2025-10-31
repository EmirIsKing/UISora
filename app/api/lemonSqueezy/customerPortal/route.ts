import { NextRequest, NextResponse } from "next/server";
import { lemonSqueezySetup, getCustomer } from "@lemonsqueezy/lemonsqueezy.js";

export async function POST(req: NextRequest) {
  const { customerId } = await req.json();

  if (!customerId) {
    return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
  }

  lemonSqueezySetup({apiKey: process.env.LEMONSQUEEZY_API_KEY?.toString()});
  const { data } = await getCustomer(customerId);

  console.log(data?.data.attributes.urls.customer_portal)

//   const portalUrl = json.data.attributes.url.customer_portal;
  return NextResponse.json({ url: data?.data.attributes.urls.customer_portal });
}
