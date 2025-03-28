import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getCaseById(id: string) {
  const ref = doc(db, "cases", id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  return { id: snapshot.id, ...snapshot.data() };
}
