import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "@clerk/nextjs/server";

export async function getUserCases() {
  const session = await auth();
  const userId = session?.userId;

  if (!userId) return [];

  const q = query(collection(db, "cases"), where("userId", "==", userId));
  const snapshot = await getDocs(q);

  const results = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return results;
}
