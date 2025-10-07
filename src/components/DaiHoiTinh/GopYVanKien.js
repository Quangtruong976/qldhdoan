import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function GopYVanKien() {
  const [hoten, setHoten] = useState("");
  const [noidung, setNoidung] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "gopy_tinh"), {
        hoten,
        noidung,
        thoigian: Timestamp.now(),
      });
      setMessage("✅ Cảm ơn bạn đã góp ý!");
      setHoten("");
      setNoidung("");
    } catch (error) {
      setMessage("❌ Có lỗi, thử lại!");
    }
  };

  return (
    <div className="gopy-tinh">
      <h2>💬 Góp ý Văn kiện Đại hội</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Họ và tên"
          value={hoten}
          onChange={(e) => setHoten(e.target.value)}
          required
        />
        <textarea
          placeholder="Nhập ý kiến góp ý..."
          value={noidung}
          onChange={(e) => setNoidung(e.target.value)}
          required
        />
        <button type="submit">📨 Gửi góp ý</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default GopYVanKien;
