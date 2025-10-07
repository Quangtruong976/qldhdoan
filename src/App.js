// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";

import Dashboard from "./Dashboard";
import CapXa from "./CapXa";
import CapTinh from "./CapTinh"; // vẫn giữ để admin dùng
import TaiLieu from "./TaiLieu";
import Login from "./Login";
import "./App.css";

// Các component của Đại hội cấp tỉnh
import TrangChuTinh from "./components/DaiHoiTinh/TrangChuTinh";
import DiemDanhTinh from "./components/DaiHoiTinh/DiemDanhTinh";
import GopYVanKien from "./components/DaiHoiTinh/GopYVanKien";
import CapNhatTinh from "./components/DaiHoiTinh/CapNhatTinh";

// ----- Tin tức -----
function TinTuc() {
  return (
    <div className="tintuc">
      <h2 style={{ marginBottom: "20px", color: "#1e88e5" }}>Tin tức Đại hội</h2>
      <iframe
        src="https://tinhdoan.lamdong.gov.vn"
        width="100%"
        height="600px"
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
        title="Tin tức Đại hội"
      ></iframe>
    </div>
  );
}

// ----- Giao diện quản lý admin -----
function Admin({ user }) {
  const [tab, setTab] = useState(null);

  if (!user || user.role !== "tinh-doan") {
    return <p>Chỉ admin mới có quyền truy cập.</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Quản lý Admin</h2>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setTab("CapXa")}
          style={{
            marginRight: "10px",
            color: "white",
            backgroundColor: "#0288d1",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Cập nhật Đại hội cấp xã
        </button>

        <button
          onClick={() => setTab("CapTinh")}
          style={{
            marginRight: "10px",
            color: "white",
            backgroundColor: "#0288d1",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Cập nhật Đại hội cấp tỉnh
        </button>

        <button
          onClick={() => setTab("TaiLieu")}
          style={{
            color: "white",
            backgroundColor: "#0288d1",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Cập nhật Tài liệu
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {tab === "CapXa" && <CapXa user={user} />}
        {tab === "CapTinh" && <CapTinh user={user} />}
        {tab === "TaiLieu" && <TaiLieu user={user} />}
      </div>
    </div>
  );
}

// ----- Ứng dụng chính -----
function App() {
  const [user, setUser] = useState(null);
  const [daiHoiXa, setDaiHoiXa] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "daihoixa"), (snapshot) => {
      setDaiHoiXa(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() || {} })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app">
        <header className="header">
          <img src="/logo-doan.png" alt="Logo đoàn" className="logo" />
          <h1 style={{ color: "rgb(238, 239, 240)" }}>
            HỆ THỐNG QUẢN LÝ THEO DÕI ĐẠI HỘI ĐOÀN
          </h1>
        </header>

        <nav className="navbar">
          <Link to="/">🏠 Trang chủ</Link>
          <Link to="/tintuc">📰 Tin tức</Link>
          <Link to="/capxa">🏘️ Đại hội cấp xã</Link>
          <Link to="/captinh">🏛️ Đại hội cấp tỉnh</Link>
          <Link to="/tailieu">📄 Tài liệu Đại hội</Link>
          <Link to="/login">⚙️ Đăng nhập</Link>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard daiHoiXa={daiHoiXa} />} />
            <Route path="/tintuc" element={<TinTuc />} />
            <Route path="/capxa" element={<CapXa user={user} />} />

            {/* ⚙️ Khi nhấn Đại hội cấp tỉnh → hiển thị TrangChuTinh */}
            <Route path="/captinh" element={<TrangChuTinh />} />

            <Route path="/tailieu" element={<TaiLieu user={user} />} />
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/admin" element={<Admin user={user} />} />

            {/* Các route chi tiết trong phần đại hội cấp tỉnh */}
            <Route path="/daihoitinh" element={<TrangChuTinh />} />
            <Route path="/diemdanh" element={<DiemDanhTinh />} />
            <Route path="/gopy" element={<GopYVanKien />} />
            <Route path="/capnhattinh" element={<CapNhatTinh />} />
          </Routes>
        </main>

        <footer className="footer">
          © 2025 - Đoàn TNCS Hồ Chí Minh tỉnh Lâm Đồng
        </footer>
      </div>
    </Router>
  );
}

export default App;
