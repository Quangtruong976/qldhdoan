import React, { useState, useEffect, useMemo, useCallback } from "react";
import { listenDaiHoiXa, updateDaiHoiXa, addDaiHoiXa, deleteDaiHoiXa } from "./services/firestoreService";

function CapXa({ user }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [newDonVi, setNewDonVi] = useState("");

  useEffect(() => {
    const unsubscribe = listenDaiHoiXa(setData);
    return () => unsubscribe();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(row =>
      row.donvi?.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const handleChange = useCallback((id, field, value) => {
    setData(prev =>
      prev.map(d => (d.id === id ? { ...d, [field]: value } : d))
    );
  }, []);

  const handleSave = async (id) => {
    const row = data.find(d => d.id === id);
    try {
      await updateDaiHoiXa(id, row);
      alert("✅ Lưu thành công!");
    } catch (err) {
      console.error("❌ Lỗi khi lưu dữ liệu:", err);
      alert("❌ Lỗi khi lưu dữ liệu. Kiểm tra console.");
    }
  };

  const handleAdd = async () => {
    if (!newDonVi.trim()) return alert("⚠️ Nhập tên xã mới!");
    try {
      await addDaiHoiXa(newDonVi);
      setNewDonVi("");
      alert("✅ Thêm xã mới thành công!");
    } catch (err) {
      console.error("❌ Lỗi khi thêm xã:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa xã này không?")) return;
    try {
      await deleteDaiHoiXa(id);
      alert("🗑️ Đã xóa thành công!");
    } catch (err) {
      console.error("❌ Lỗi khi xóa xã:", err);
      alert("❌ Không thể xóa, kiểm tra console.");
    }
  };

  const rowStyle = (trangthai) => ({
    backgroundColor: trangthai === "da-to-chuc" ? "#b6fcb6" : "#f8b6b6"
  });

  return (
    <div>
      <h2 style={{ color: "rgb(3, 95, 175)" }}>Đại hội cấp xã</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Tìm theo tên xã..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", width: "250px" }}
        />
        {user?.role === "tinh-doan" && (
  <>
    <input
      placeholder="Tên xã mới"
      value={newDonVi}
      onChange={(e) => setNewDonVi(e.target.value)}
      style={{ marginRight: "5px", padding: "5px" }}
    />
    <button 
      onClick={handleAdd}
      style={{
        color: "white",
        backgroundColor: "#0288d1", // xanh dương nhạt
        border: "none",
        padding: "5px 10px",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      Thêm
    </button>
  </>
)}

      </div>

      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>TT</th>
            <th>Đơn vị</th>
            <th>Ngày tổ chức</th>
            <th>Trạng thái</th>
            <th>Bí thư</th>
            <th>Phó bí thư</th>
            {user?.role === "tinh-doan" && <th>Hành động</th>}
          </tr>
        </thead>
        <tbody>
  {filteredData.map((row, index) => {
    const isDaToChuc = row.trangthai === "da-to-chuc";
    const textColor = isDaToChuc ? "green" : "rgb(89, 23, 23)";

    return (
      <tr key={row.id} style={rowStyle(row.trangthai)}>
        <td>{index + 1}</td>
        <td style={{ textAlign: "left", color: textColor }}>
          {user?.role === "tinh-doan" ? (
            <input
              value={row.donvi || ""}
              onChange={(e) => handleChange(row.id, "donvi", e.target.value)}
              style={{ width: "100%", color: textColor }}
            />
          ) : (
            row.donvi
          )}
        </td>
        <td style={{ color: textColor }}>
          {user?.role === "tinh-doan" ? (
            <input
              type="date"
              value={row.ngay || ""}
              onChange={(e) => handleChange(row.id, "ngay", e.target.value)}
              style={{ color: textColor }}
            />
          ) : (
            row.ngay
          )}
        </td>
        <td>
          {user?.role === "tinh-doan" ? (
            <select
              value={row.trangthai || ""}
              onChange={(e) => handleChange(row.id, "trangthai", e.target.value)}
              style={{ color: textColor }}
            >
              <option value="chua-to-chuc">Chưa tổ chức</option>
              <option value="da-to-chuc">Đã tổ chức</option>
            </select>
          ) : (
            <span style={{ color: textColor }}>
              {isDaToChuc ? "Đã tổ chức" : "Chưa tổ chức"}
            </span>
          )}
        </td>
        <td style={{ color: textColor }}>
          {user?.role === "tinh-doan" ? (
            <input
              value={row.bithu || ""}
              onChange={(e) => handleChange(row.id, "bithu", e.target.value)}
              style={{ color: textColor }}
            />
          ) : (
            row.bithu
          )}
        </td>
        <td style={{ color: textColor }}>
          {user?.role === "tinh-doan" ? (
            <input
              value={row.phobithu || ""}
              onChange={(e) => handleChange(row.id, "phobithu", e.target.value)}
              style={{ color: textColor }}
            />
          ) : (
            row.phobithu
          )}
        </td>
        {user?.role === "tinh-doan" && (
  <td>
    <button 
      onClick={() => handleSave(row.id)}
      style={{
        color: "white",
        backgroundColor: "#43a047", // xanh lá / xanh đậm
        border: "none",
        padding: "5px 10px",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      Lưu
    </button>
    <button
      onClick={() => handleDelete(row.id)}
      style={{
        color: "white",
        backgroundColor: "red",
        border: "none",
        padding: "5px 10px",
        borderRadius: "4px",
        cursor: "pointer",
        marginLeft: "5px"
      }}
    >
      Xóa
    </button>
  </td>
)}

      </tr>
    );
  })}
</tbody>

      </table>
    </div>
  );
}

export default CapXa;
