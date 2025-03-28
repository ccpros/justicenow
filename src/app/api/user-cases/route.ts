import { getUserCases } from "@/lib/getUserCases";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await getUserCases(); // ✅ should return an array
    return NextResponse.json(results);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
