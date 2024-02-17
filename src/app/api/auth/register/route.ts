import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const createTable = await sql`CREATE TABLE IF NOT EXISTS users ( 
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL);`;

    const { email, password } = await request.json();
    //validate email and password
    const hashedPassword = await hash(password, 10);
    const isExist = await sql`SELECT * FROM users WHERE email = '${email}' `;

    if (isExist) {
      return NextResponse.json({
        message: "email already exist",
        status: 400,
      });
    } else {
      const response = await sql`INSERT INTO users (email, password)
      VALUES (${email},${hashedPassword})`;

      return NextResponse.json({
        message: "successfully registered",
        status: 200,
      });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      status: 400,
    });
  }
}
