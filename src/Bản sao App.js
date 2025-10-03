import React from "react";
import { Link } from "react-router-dom";

function Dashboard({ user }) {
  return (
    <div className="app">
      <header className="header">
        <img src="/logo-doan.png" alt="Logo đoàn" className="logo" />
        <h1>Hệ thống Quản lý Đại hội Đoàn</h1>
      </header>

      <nav className="navbar">
        <Link to="/">🏠 Trang chủ</Link>
        <Link to="/tintuc">📰 Tin tức</Link>
        <Link to="/capxa">🏘️ Đại hội cấp xã</Link>
        <Link to="/captinh">🏛️ Đại hội Tỉnh đoàn</Link>
        <Link to="/tailieu">📄 Tài liệu Đại hội</Link>
        <Link to="/login">⚙️ Cài đặt</Link>
      </nav>

      <main className="content">
        <h2>Chào mừng đến với hệ thống!</h2>
        <p>Đây là giao diện dành cho tất cả người dùng xem dữ liệu.</p>
      </main>

      <footer className="footer">
        @ 2025 - Đoàn TNCS Hồ Chí Minh tỉnh Lâm Đồng
      </footer>
    </div>
  );
}

export default Dashboard;
