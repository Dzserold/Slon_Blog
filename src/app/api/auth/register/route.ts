import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    //validate email and password
    console.log({ email, password });
    return NextResponse.json({ message: "Succes" });
  } catch (error) {
    console.error({ error });
  }
}
