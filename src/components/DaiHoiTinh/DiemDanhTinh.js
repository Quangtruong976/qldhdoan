import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function DiemDanhTinh() {
  const [hoten, setHoten] = useState("");
  const [ngaysinh, setNgaysinh] = useState("");
  const [donvi, setDonvi] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "diemdanh_tinh"), {
        hoten,
        ngaysinh,
        donvi,
        thoigian: Timestamp.now(),
      });
      setMessage("✅ Điểm danh thành công!");
      setHoten("");
      setNgaysinh("");
      setDonvi("");
    } catch (error) {
      console.error("Lỗi điểm danh:", error);
      setMessage("❌ Có lỗi, thử lại!");
    }
  };

  return (
    <div className="diemdanh-tinh">
      <h2>🪪 Điểm danh Đại biểu Đại hội Tỉnh</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Họ và tên"
          value={hoten}
          onChange={(e) => setHoten(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ngày sinh (dd/mm/yyyy)"
          value={ngaysinh}
          onChange={(e) => setNgaysinh(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Đơn vị công tác"
          value={donvi}
          onChange={(e) => setDonvi(e.target.value)}
          required
        />
        <button type="submit">✅ Điểm danh</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DiemDanhTinh;
