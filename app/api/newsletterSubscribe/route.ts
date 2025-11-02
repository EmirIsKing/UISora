import { NextResponse } from "next/server";

const BASE_URL = "https://api.convertkit.com/v3/";
const API_KEY = process.env.CONVERTKIT_API_KEY;
const FORM_ID = process.env.CONVERTKIT_FORM_ID;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }


    const url = `${BASE_URL}forms/${FORM_ID}/subscribe`;

    const data = {
      api_key: API_KEY,
      email,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return NextResponse.json({ message: "success" }, { status: 200 });
    } else {
        console.log(response)
      return NextResponse.json({ message: "Failed to subscribe" + response }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "There was a problem, please try again: "+error },
      { status: 500 }
    );
  }
}
