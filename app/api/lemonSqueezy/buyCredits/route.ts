export const dynamic = "force-dynamic"
import { LemonSqueezyApiInstance } from "@/actions/lemonSqueezyApiInstance";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data)

    if (!data.productId || !data.userId) {
        return Response.json({message:"Product Id and user Id are required"}, { status: 500 });
    }

    const response = await LemonSqueezyApiInstance.post('/checkouts', {
        data: {
            type: "checkouts",
            attributes: {
              custom_price: data.amount*100,
              product_options: {
                    redirect_url: "http://localhost:3000/profile"
                },
              checkout_data: {
                email: data.email,
                custom: {
                    type: "CreditBuy",
                    user_id: data.userId.toString()
                }
              }  
            },
            relationships: {
              "store": {
                "data": {
                  "type": "stores",
                  "id": process.env.LEMONSQUEEZY_STORE_ID?.toString(),
                }
              },
              variant: {
                "data": {
                  "type": "variants",
                  "id": data.productId.toString(),
                }
              }
            }
          }
    })

    const checkoutUrl = response.data.data.attributes.url;
    console.log(response.data)
    console.log(response.data.data.attributes)

    return Response.json({checkoutUrl}, { status: 200 });
  } catch (error) {
    return new Response("Error submitting to LemonSqueezy", { status: 500 });
  }
}
