// DaiHoiTinh.js
import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";

import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function DaiHoiTinh({ user }) {
  const [tab, setTab] = useState("chuongtrinh");
  const [data, setData] = useState([]);
  const [gopY, setGopY] = useState("");
  const [avatar, setAvatar] = useState("");
  const [diemDanh, setDiemDanh] = useState(false);

  // ===== Lấy dữ liệu tài liệu theo từng tab =====
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "daihoi_tinh"), where("loai", "==", tab));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setData(list);
    };
    fetchData();
  }, [tab]);

  // ===== Điểm danh =====
  const handleDiemDanh = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập!");
      return;
    }
    const daiBieuRef = doc(db, "dai_bieu", user.uid);
    await updateDoc(daiBieuRef, { diemDanh: true });
    setDiemDanh(true);
    alert("✅ Điểm danh thành công!");
  };

  // ===== Cập nhật Avatar =====
  const handleCapNhatAvatar = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập!");
      return;
    }
    if (!avatar.trim()) {
      alert("Nhập link ảnh trước!");
      return;
    }
    const daiBieuRef = doc(db, "dai_bieu", user.uid);
    await updateDoc(daiBieuRef, { avatar });
    alert("✅ Đã cập nhật ảnh đại diện!");
  };

  // ===== Góp ý =====
  const handleGopY = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập!");
      return;
    }
    if (!gopY.trim()) {
      alert("Nhập nội dung góp ý!");
      return;
    }
    await addDoc(collection(db, "gopy"), {
      uid: user.uid,
      ten: user.name || "Ẩn danh",
      noidung: gopY,
      thoigian: new Date().toLocaleString(),
    });
    setGopY("");
    alert("✅ Đã gửi góp ý đến Đại hội!");
  };

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h2 style={{ color: "#0d47a1", textTransform: "uppercase" }}>
        🎯 Đại hội Đoàn cấp tỉnh
      </h2>

      {/* ========== Thanh chọn chức năng ========== */}
      <div style={{ marginBottom: 20 }}>
        {[
          ["chuongtrinh", "🕐 Chương trình"],
          ["noiquy", "⚖️ Nội quy"],
          ["vankien", "📜 Văn kiện"],
          ["sodo", "🪑 Sơ đồ chỗ ngồi"],
          ["diemdanh", "✅ Điểm danh"],
          ["gopy", "💬 Góp ý"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              margin: "4px",
              padding: "8px 12px",
              background: tab === key ? "#1e88e5" : "#f0f0f0",
              color: tab === key ? "#fff" : "#000",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ========== NỘI DUNG HIỂN THỊ ========== */}
      {["chuongtrinh", "noiquy", "vankien", "sodo"].includes(tab) && (
        <div style={{ textAlign: "left", maxWidth: 800, margin: "0 auto" }}>
          {data.length === 0 ? (
            <p>⏳ Chưa có dữ liệu hiển thị.</p>
          ) : (
            data.map((item) => (
              <div key={item.id} style={{ marginBottom: 15 }}>
                <h4>{item.ten}</h4>
                <iframe
                  src={item.link}
                  title={item.ten}
                  width="100%"
                  height="500px"
                  style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                ></iframe>
              </div>
            ))
          )}
        </div>
      )}

      {/* ========== TAB: ĐIỂM DANH ========== */}
      {tab === "diemdanh" && (
        <div>
          {diemDanh ? (
            <p>🎉 Bạn đã điểm danh rồi. Cảm ơn đại biểu!</p>
          ) : (
            <button
              onClick={handleDiemDanh}
              style={{
                padding: "10px 20px",
                backgroundColor: "#43a047",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              ✅ Bấm để điểm danh
            </button>
          )}
        </div>
      )}

      {/* ========== TAB: GÓP Ý ========== */}
      {tab === "gopy" && (
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "left" }}>
          <textarea
            placeholder="Nhập ý kiến góp ý..."
            value={gopY}
            onChange={(e) => setGopY(e.target.value)}
            rows={5}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          ></textarea>
          <button
            onClick={handleGopY}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#1e88e5",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Gửi góp ý
          </button>
        </div>
      )}

      {/* ========== TAB: CẬP NHẬT ẢNH (chèn thêm ở đây nếu muốn) ========== */}
      {tab === "diemdanh" && (
        <div style={{ marginTop: 20 }}>
          <input
            type="text"
            placeholder="Dán link ảnh Google Drive của bạn"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            style={{
              width: "320px",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />{" "}
          <button
            onClick={handleCapNhatAvatar}
            style={{
              padding: "8px 16px",
              backgroundColor: "#1565c0",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cập nhật ảnh
          </button>
        </div>
      )}
    </div>
  );
}

export default DaiHoiTinh;
