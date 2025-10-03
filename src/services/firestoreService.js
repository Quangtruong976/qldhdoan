import { collection, onSnapshot, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const daiHoiXaRef = collection(db, "daihoixa");

export const listenDaiHoiXa = (callback) => {
  return onSnapshot(daiHoiXaRef, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
};

export const updateDaiHoiXa = async (id, data) => {
  const docRef = doc(db, "daihoixa", id);
  await updateDoc(docRef, data);
};

export const addDaiHoiXa = async (donvi) => {
  await addDoc(daiHoiXaRef, {
    donvi,
    ngay: "",
    trangthai: "chua-to-chuc",
    bithu: "",
    phobithu: ""
  });
};

export const deleteDaiHoiXa = async (id) => {
  const docRef = doc(db, "daihoixa", id);
  await deleteDoc(docRef);
};
