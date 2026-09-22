import { inngest } from "@/app/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { requestId, action } = await req.json();

  await inngest.send({
    name: "workflow/start",
    data: {
      requestId,
      action,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Approval workflow started",
  });
}