import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export async function POST(req: Request) {
  const authObject = await auth();
  const userId = authObject.userId;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  try {
    const docRef = await addDoc(collection(db, "cases"), {
      ...data,
      userId,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ id: docRef.id });
  } catch (error: any) {
    console.error("❌ Firestore save failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
