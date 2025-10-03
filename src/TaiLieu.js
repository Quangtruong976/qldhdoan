import React, { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

function TaiLieu({ user }) {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [tenTaiLieu, setTenTaiLieu] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tailieu"), snapshot => {
      setFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleUpload = async () => {
    if (!file || !tenTaiLieu.trim()) {
      alert("Chọn file và nhập tên tài liệu!");
      return;
    }
    const fileRef = ref(storage, `tailieu/${file.name}`);
    try {
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      await addDoc(collection(db, "tailieu"), { name: tenTaiLieu, url });
      setFile(null);
      setTenTaiLieu("");
      alert("Upload thành công!");
    } catch (err) {
      console.error(err);
      alert("Lỗi upload file");
    }
  };

  const handleDelete = async (id, fileName) => {
    try {
      await deleteDoc(doc(db, "tailieu", id));
      const fileRef = ref(storage, `tailieu/${fileName}`);
      await deleteObject(fileRef);
      alert("Xóa thành công!");
    } catch (err) {
      console.error(err);
      alert("Lỗi xóa file");
    }
  };

  return (
    <div>
      <h2 style={{ color: "#1e88e5" }}>Tài liệu Đại hội</h2>
      {user?.role === "tinh-doan" && (
        <div>
          <input
            type="text"
            placeholder="Tên tài liệu"
            value={tenTaiLieu}
            onChange={e => setTenTaiLieu(e.target.value)}
          />
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
      <ul>
        {files.map(f => (
          <li key={f.id}>
            <a href={f.url} target="_blank" rel="noreferrer">{f.name}</a>
            {user?.role === "tinh-doan" && <button onClick={() => handleDelete(f.id, f.name)}>Xóa</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaiLieu;
