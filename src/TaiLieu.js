import React, { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

function TaiLieu({ user }) {
  const [files, setFiles] = useState([]);
  const [tenTaiLieu, setTenTaiLieu] = useState("");
  const [urlTaiLieu, setUrlTaiLieu] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tailieu"), snapshot => {
      setFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleUpload = async () => {
    if (!tenTaiLieu.trim() || !urlTaiLieu.trim()) {
      alert("⚠️ Nhập đủ TÊN và LINK tài liệu!");
      return;
    }
    try {
      await addDoc(collection(db, "tailieu"), {
        name: tenTaiLieu,
        url: urlTaiLieu,
        ngay: new Date().toLocaleDateString("vi-VN"),
      });
      setTenTaiLieu("");
      setUrlTaiLieu("");
      alert("✅ Lưu thành công!");
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi lưu tài liệu!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa tài liệu này?")) return;
    try {
      await deleteDoc(doc(db, "tailieu", id));
      alert("🗑️ Đã xóa thành công!");
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi xóa!");
    }
  };

  return (
    <div>
      <h2 style={{ color: "#1e88e5" }}>Tài liệu Đại hội</h2>

      {user?.role === "tinh-doan" && (
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Tên tài liệu"
            value={tenTaiLieu}
            onChange={e => setTenTaiLieu(e.target.value)}
            style={{ marginRight: "10px", padding: "5px", width: "200px" }}
          />
          <input
            type="text"
            placeholder="Dán link (Google Drive, v.v.)"
            value={urlTaiLieu}
            onChange={e => setUrlTaiLieu(e.target.value)}
            style={{ marginRight: "10px", padding: "5px", width: "300px" }}
          />
          <button onClick={handleUpload}>Lưu</button>
        </div>
      )}

      <ul>
        {files.map(f => (
          <li key={f.id} style={{ marginBottom: "8px" }}>
            <a href={f.url} target="_blank" rel="noreferrer">{f.name}</a>
            {user?.role === "tinh-doan" && (
              <button
                onClick={() => handleDelete(f.id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Xóa
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaiLieu;
