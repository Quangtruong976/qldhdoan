import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

function TaiLieu({ user }) {
  const [files, setFiles] = useState([]);
  const [tenTaiLieu, setTenTaiLieu] = useState("");
  const [urlTaiLieu, setUrlTaiLieu] = useState("");

  // 🔹 Lấy dữ liệu có sắp xếp theo order
  useEffect(() => {
    const q = query(collection(db, "tailieu"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFiles(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Thêm mới tài liệu
  const handleUpload = async () => {
    if (!tenTaiLieu.trim() || !urlTaiLieu.trim()) {
      alert("⚠️ Nhập đủ TÊN và LINK tài liệu!");
      return;
    }
    try {
      const maxOrder = files.length > 0 ? Math.max(...files.map((f) => f.order || 0)) : 0;
      await addDoc(collection(db, "tailieu"), {
        name: tenTaiLieu,
        url: urlTaiLieu,
        order: maxOrder + 1,
      });
      setTenTaiLieu("");
      setUrlTaiLieu("");
      alert("✅ Lưu thành công!");
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi lưu tài liệu!");
    }
  };

  // 🔹 Xóa tài liệu
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

  // 🔹 Di chuyển thứ tự (lên/xuống)
  const moveItem = async (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= files.length) return; // Giới hạn

    const current = files[index];
    const target = files[newIndex];

    try {
      const currentRef = doc(db, "tailieu", current.id);
      const targetRef = doc(db, "tailieu", target.id);
      await Promise.all([
        updateDoc(currentRef, { order: target.order }),
        updateDoc(targetRef, { order: current.order }),
      ]);
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi thay đổi thứ tự!");
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
          textAlign: "left",
        }}
      >
        {files.map((f, index) => (
          <div
            key={f.id}
            style={{
              marginBottom: "12px",
              padding: "10px 15px",
              borderBottom: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <a
              href={f.url}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "16px",
                color: "#0d47a1",
                fontWeight: "normal",
                textDecoration: "none",
                flex: 1,
              }}
            >
              {index + 1}. {f.name}
            </a>

            {user?.role === "tinh-doan" && (
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => moveItem(index, "up")}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: "#1565c0",
                  }}
                >
                  🔼
                </button>
                <button
                  onClick={() => moveItem(index, "down")}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: "#1565c0",
                  }}
                >
                  🔽
                </button>
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaiLieu;
