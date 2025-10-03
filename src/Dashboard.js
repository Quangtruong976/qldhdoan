import React from "react";

function Dashboard({ daiHoiXa }) {
  const daToChuc = daiHoiXa.filter(x => x.trangthai === "da-to-chuc").length;
  const chuaToChuc = daiHoiXa.filter(x => x.trangthai !== "da-to-chuc").length;
  const total = daiHoiXa.length;

  const percentDa = total ? (daToChuc / total) * 100 : 0;
  const percentChua = total ? (chuaToChuc / total) * 100 : 0;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#1e88e5" }}>Thống kê Đại hội cấp xã</h2>

      {/* Ô thống kê số lượng cố định chiều rộng */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#b6fcb6", padding: "20px", width: "200px", textAlign: "center", borderRadius: "8px" }}>
          <h3>Đã tổ chức</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{daToChuc}</p>
        </div>
        <div style={{ backgroundColor: "#f8b6b6", padding: "20px", width: "200px", textAlign: "center", borderRadius: "8px" }}>
          <h3>Chưa tổ chức</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{chuaToChuc}</p>
        </div>
      </div>

      {/* Biểu đồ cột */}
      <div style={{ marginTop: "30px", maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>
        <h3>Tỷ lệ đã / chưa tổ chức</h3>
        <div style={{ display: "flex", height: "30px", border: "1px solid #ccc", borderRadius: "5px", overflow: "hidden" }}>
          <div style={{ width: `${percentDa}%`, backgroundColor: "#4caf50" }}></div>
          <div style={{ width: `${percentChua}%`, backgroundColor: "#f44336" }}></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px", fontSize: "14px" }}>
          <span>Đã tổ chức: {percentDa.toFixed(1)}%</span>
          <span>Chưa tổ chức: {percentChua.toFixed(1)}%</span>
        </div>
      </div>

      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Tổng số xã: {total} (Đã tổ chức: {daToChuc}/{total}, Chưa tổ chức: {chuaToChuc}/{total})
      </p>
    </div>
  );
}

export default Dashboard;
