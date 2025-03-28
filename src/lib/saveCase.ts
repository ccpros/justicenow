import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { currentUser } from "@clerk/nextjs/server";

export async function saveCaseData(data: any) {
  const user = await currentUser();
  const userId = user?.id;

  const docRef = await addDoc(collection(db, "cases"), {
    ...data,
    userId,
    createdAt: Timestamp.now(),
  });

  return docRef.id;
}
