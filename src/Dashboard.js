// src/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";

function Dashboard({ daiHoiXa }) {
  const daToChuc = daiHoiXa.filter(x => x.trangthai === "da-to-chuc").length;
  const chuaToChuc = daiHoiXa.filter(x => x.trangthai !== "da-to-chuc").length;
  const total = daiHoiXa.length;

  const percentDa = total ? (daToChuc / total) * 100 : 0;
  const percentChua = total ? (chuaToChuc / total) * 100 : 0;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#1e88e5" }}>Thống kê Đại hội cấp xã</h2>

      {/* Ô thống kê số lượng */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#b6fcb6", padding: "20px", width: "200px", textAlign: "center", borderRadius: "8px" }}>
          <h3 style={{ color: "green", marginBottom: "10px" }}>Đã tổ chức</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: "green" }}>{daToChuc}</p>
        </div>
        <div style={{ backgroundColor: "#f8b6b6", padding: "20px", width: "200px", textAlign: "center", borderRadius: "8px" }}>
          <h3 style={{ color: "red", marginBottom: "10px" }}>Chưa tổ chức</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: "red" }}>{chuaToChuc}</p>
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

      <p style={{ marginTop: "20px", textAlign: "center", color: "red" }}>
        Tổng số xã: {total} (Đã tổ chức: {daToChuc}/{total}, Chưa tổ chức: {chuaToChuc}/{total})
      </p>

      {/* 🔹 Nút điều hướng sang Đại hội cấp tỉnh */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link
          to="/daihoitinh"
          style={{
            display: "inline-block",
            backgroundColor: "#1976d2",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          🔹 Đại hội cấp tỉnh
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
