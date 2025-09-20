import React from "react";
import "./App.css";

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {/* Tiêu đề chính */}
      <h1 style={{ textAlign: "center", color: "#1976d2" }}>
        Hệ thống quản lý theo dõi Đại hội Đoàn các cấp tỉnh Lâm Đồng
      </h1>

      {/* Thanh menu */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          margin: "20px 0",
        }}
      >
        <a href="/" style={{ textDecoration: "none", color: "#1976d2" }}>
          Trang chủ
        </a>
        <a href="/tien-do" style={{ textDecoration: "none", color: "#1976d2" }}>
          Tiến độ
        </a>
        <a
          href="/danh-sach"
          style={{ textDecoration: "none", color: "#1976d2" }}
        >
          Danh sách nhân sự
        </a>
        <a
          href="/thong-ke"
          style={{ textDecoration: "none", color: "#1976d2" }}
        >
          Thống kê
        </a>
      </nav>

      {/* Nội dung chào mừng */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Chào mừng!</h2>
        <p>
          Đây là hệ thống giúp theo dõi tiến độ, kết quả và nhân sự Đại hội
          </p>
         <p> Đoàn các cấp, từ tỉnh đến xã phường.
        </p>
      </div>
    </div>
  );
}

export default App;

