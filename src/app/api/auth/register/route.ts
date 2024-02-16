import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    await sql`CREATE TABLE IF NOT EXISTS users( id SERIAL PRIMARY KEY,
      id SERIAL PRIMARY KEY,
      email VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(50) NOT NULL`;

    const { email, password } = await request.json();
    //validate email and password
    const hashedPassword = await hash(password, 10);
    const response = await sql`INSERT INTO users (email, password)
       VALUES (${email},${hashedPassword})`;
  } catch (error: any) {
    console.log(error);
  }
}
