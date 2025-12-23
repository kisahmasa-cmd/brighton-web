import { NextResponse } from "next/server";
import { saveActivityLog } from "@/services/activity-log-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await saveActivityLog(body.data);

    return NextResponse.json({
      success: true,
      response,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "Unknown error" }, { status: 500 });
  }
}
