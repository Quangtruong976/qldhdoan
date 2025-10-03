import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function loadTest() {
  try {
    const snapshot = await getDocs(collection(db, "daiHoiXa"));
    snapshot.forEach(doc => console.log(doc.id, doc.data()));
  } catch (e) {
    console.error("Firestore load error:", e);
  }
}
