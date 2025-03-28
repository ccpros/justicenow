import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// GET /api/case/[id] — fetch case by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const ref = doc(db, "cases", params.id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    return NextResponse.json({ id: snapshot.id, ...snapshot.data() });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to load case" }, { status: 500 });
  }
}

// PUT /api/case/[id] — update case by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const ref = doc(db, "cases", params.id);

    await updateDoc(ref, data);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update case" }, { status: 500 });
  }
}
