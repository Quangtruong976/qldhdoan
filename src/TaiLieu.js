import React, { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";

import { db } from "./firebaseConfig";

function TaiLieu({ user }) {
  const [files, setFiles] = useState([]);
  const [tenTaiLieu, setTenTaiLieu] = useState("");
  const [urlTaiLieu, setUrlTaiLieu] = useState("");

  // 👉 Hiển thị theo thứ tự CŨ NHẤT lên đầu
  useEffect(() => {
    const q = query(collection(db, "tailieu"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // 👉 Khi lưu tài liệu, thêm thời gian tạo
  const handleUpload = async () => {
    if (!tenTaiLieu.trim() || !urlTaiLieu.trim()) {
      alert("⚠️ Nhập đủ TÊN và LINK tài liệu!");
      return;
    }
    try {
      await addDoc(collection(db, "tailieu"), {
        name: tenTaiLieu,
        url: urlTaiLieu,
        createdAt: serverTimestamp(), // 👈 thêm dòng này để sắp xếp được
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
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h2
        style={{
          color: "#1565c0",
          fontSize: "26px",
          marginBottom: "20px",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        📚 Tài liệu Đại hội Đoàn
      </h2>

      {user?.role === "tinh-doan" && (
        <div style={{ marginBottom: "25px" }}>
          <input
            type="text"
            placeholder="Tên tài liệu"
            value={tenTaiLieu}
            onChange={(e) => setTenTaiLieu(e.target.value)}
            style={{
              marginRight: "10px",
              padding: "8px",
              width: "220px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            placeholder="Link tài liệu (Google Drive, ...)"
            value={urlTaiLieu}
            onChange={(e) => setUrlTaiLieu(e.target.value)}
            style={{
              marginRight: "10px",
              padding: "8px",
              width: "320px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleUpload}
            style={{
              padding: "8px 16px",
              backgroundColor: "#1e88e5",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Lưu
          </button>
        </div>
      )}

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          textAlign: "left", // 👈 chữ trong khung canh trái
        }}
      >
        {files.map((f) => (
          <div
            key={f.id}
            style={{
              marginBottom: "12px",
              padding: "10px 15px",
              borderBottom: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between", // 👈 căn dòng xóa sang phải
              alignItems: "center",
            }}
          >
            <a
              href={f.url}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "16px",
                color: " #0d47a1",
                fontWeight: "normal",
                textDecoration: "none",
              }}
            >
              {f.name}
            </a>

            {user?.role === "tinh-doan" && (
              <button
                onClick={() => handleDelete(f.id)}
                style={{
                  background: "none",
                  color: "red",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Xóa
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaiLieu;
