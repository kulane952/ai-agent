import { inngest } from "@/app/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email } = await req.json();

  await inngest.send({
    name: "user/create",
    data: {
      name,
      email,
    },
  });

  return NextResponse.json({
    success: true,
    message: "User created successfully",
  });
}