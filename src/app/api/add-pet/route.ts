import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("petName");
  const content = searchParams.get("ownerName");

  try {
    if (!title || !content) throw new Error("Pet and owner names required");
    await sql`INSERT INTO Pets (Name, Owner) VALUES (${title},${content})`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const pets = await sql`SELECT * FROM Pets`;
  return NextResponse.json({ pets }, { status: 200 });
}
