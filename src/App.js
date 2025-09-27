import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./App.css";

// ===== DỮ LIỆU =====
const totalXa = 135;
const daToChucXa = 90;
const chuaToChucXa = totalXa - daToChucXa;

const dataXa = [
  { name: "Đã tổ chức", value: daToChucXa },
  { name: "Chưa tổ chức", value: chuaToChucXa },
];

// ===== TRANG DASHBOARD =====
function Dashboard() {
  return (
    <div className="dashboard">
      {/* Đại hội cấp tỉnh */}
      <div className="cap-tinh">
        <h2 style={{ display: "inline-block", marginRight: "10px" }}>
          Đại hội cấp tỉnh:
        </h2>
        <span style={{ fontSize: "16px", fontWeight: "normal", color: "red" }}>
          Chưa tổ chức
        </span>
      </div>

      {/* Thống kê nhanh */}
      <div className="cards">
        <div className="card xanh">
          <h3>Đã tổ chức</h3>
          <p>{daToChucXa}</p>
        </div>
        <div className="card do">
          <h3>Chưa tổ chức</h3>
          <p>{chuaToChucXa}</p>
        </div>
        <div className="card tong">
          <h3>Tổng số</h3>
          <p>{totalXa}</p>
        </div>
      </div>

      {/* Đại hội cấp xã */}
      <div className="cap-xa">
        <h2>
          Đại hội cấp xã (Đã tổ chức: {daToChucXa}/{totalXa}, Chưa tổ chức:{" "}
          {chuaToChucXa}/{totalXa})
        </h2>

        <div className="chart">
          <ResponsiveContainer width="40%" height={250}>
          <BarChart 
    data={dataXa} 
    barSize={100} 
    barCategoryGap="0%"  // khoảng cách giữa 2 cột
    barGap={0}            // bỏ khoảng hở bên trong
  >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {dataXa.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.name === "Chưa tổ chức" ? "#e53935" : "#1e88e5"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ===== TRANG PHỤ =====
function TinTuc() {
  return <h2>Trang Tin tức</h2>;
}
function CapXa() {
  return <h2>Đại hội cấp xã</h2>;
}
function CapTinh() {
  return <h2>Đại hội cấp tỉnh</h2>;
}
function CaiDat() {
  return <h2>Cài đặt hệ thống</h2>;
}

// ===== APP CHÍNH =====
function App() {
  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className="header">
          <img src="/logo-doan.png" alt="Logo đoàn" className="logo" />
          <h1>Hệ thống Quản lý Đại hội Đoàn</h1>
        </header>

        {/* Navbar */}
        <nav className="navbar">
          <Link to="/">🏠 Trang chủ</Link>
          <Link to="/tintuc">📰 Tin tức</Link>
          <Link to="/capxa">🏘️ Đại hội cấp xã</Link>
          <Link to="/captinh">🏛️ Đại hội Tỉnh đoàn</Link>
          <Link to="/caidat">⚙️ Cài đặt</Link>
        </nav>

        {/* Nội dung */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tintuc" element={<TinTuc />} />
            <Route path="/capxa" element={<CapXa />} />
            <Route path="/captinh" element={<CapTinh />} />
            <Route path="/caidat" element={<CaiDat />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          @Đoàn TNCS Hồ Chí Minh tỉnh Lâm Đồng
        </footer>
      </div>
    </Router>
  );
}

export default App;
