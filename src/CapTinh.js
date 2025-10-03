// CapTinh.js
import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function CapTinh({ user }) {
  const [listTinh, setListTinh] = useState([]);
  const [tenTinh, setTenTinh] = useState("");
  const [thoiGian, setThoiGian] = useState("");
  const [dangSua, setDangSua] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "daihoitinh"), (snapshot) => {
      setListTinh(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
    return () => unsub();
  }, []);

  // ===== Thêm mới =====
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!tenTinh || !thoiGian) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    await addDoc(collection(db, "daihoitinh"), {
      ten: tenTinh,
      thoigian: thoiGian,
    });
    setTenTinh("");
    setThoiGian("");
  };

  // ===== Xóa =====
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      await deleteDoc(doc(db, "daihoitinh", id));
    }
  };

  // ===== Chỉnh sửa =====
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!dangSua) return;

    const ref = doc(db, "daihoitinh", dangSua.id);
    await updateDoc(ref, {
      ten: tenTinh,
      thoigian: thoiGian,
    });
    setDangSua(null);
    setTenTinh("");
    setThoiGian("");
  };

  // ===== Chọn bản ghi để sửa =====
  const startEdit = (record) => {
    setDangSua(record);
    setTenTinh(record.ten);
    setThoiGian(record.thoigian);
  };

  return (
    <div className="captinh">
      <h2 style={{ color: "#1e88e5" }}>Tiến độ Đại hội cấp tỉnh</h2>

      {/* Bảng hiển thị */}
      <table border="1" cellPadding="8" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th>Tên tỉnh</th>
            <th>Thời gian tổ chức</th>
            {user?.role === "tinh-doan" && <th>Hành động</th>}
          </tr>
        </thead>
        <tbody>
          {listTinh.map((item) => (
            <tr key={item.id}>
              <td>{item.ten}</td>
              <td>{item.thoigian}</td>
              {user?.role === "tinh-doan" && (
                <td>
                  <button onClick={() => startEdit(item)}>✏️ Sửa</button>{" "}
                  <button onClick={() => handleDelete(item.id)}>🗑️ Xóa</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form thêm/sửa - chỉ admin mới có */}
      {user?.role === "tinh-doan" && (
        <form
          onSubmit={dangSua ? handleUpdate : handleAdd}
          style={{ marginTop: "20px" }}
        >
          <h3>{dangSua ? "Sửa thông tin" : "Thêm mới"}</h3>
          <input
            placeholder="Tên tỉnh"
            value={tenTinh}
            onChange={(e) => setTenTinh(e.target.value)}
          />{" "}
          <input
            placeholder="Thời gian"
            value={thoiGian}
            onChange={(e) => setThoiGian(e.target.value)}
          />{" "}
          <button type="submit">{dangSua ? "Cập nhật" : "Thêm"}</button>
          {dangSua && (
            <button
              type="button"
              onClick={() => {
                setDangSua(null);
                setTenTinh("");
                setThoiGian("");
              }}
            >
              Hủy
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default CapTinh;
