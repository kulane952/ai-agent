import { inngest } from "@/app/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { items } = await req.json();

  await inngest.send({
    name: "batch/process",
    data: {
      items,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Batch processing started",
  });
}