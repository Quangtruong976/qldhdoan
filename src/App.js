// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";

import Dashboard from "./Dashboard";
import CapXa from "./CapXa";
import CapTinh from "./CapTinh";
import TaiLieu from "./TaiLieu";
import Login from "./Login";
import "./App.css";

// Tin tức
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
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
        title="Tin tức Đại hội"
      ></iframe>
    </div>
  );
}

// Admin panel
function Admin({ user }) {
  const [tab, setTab] = useState(null);

  if (!user || user.role !== "tinh-doan") {
    return <p>Chỉ admin mới có quyền truy cập.</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Quản lý Admin</h2>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setTab("CapXa")} style={{ marginRight: "10px" }}>
          Cập nhật Đại hội cấp xã
        </button>
        <button onClick={() => setTab("CapTinh")} style={{ marginRight: "10px" }}>
          Cập nhật Đại hội cấp tỉnh
        </button>
        <button onClick={() => setTab("TaiLieu")}>
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

// App
function App() {
  const [user, setUser] = useState(null);
  const [daiHoiXa, setDaiHoiXa] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "daihoixa"), (snapshot) => {
      setDaiHoiXa(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() || {} })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app">
        <header className="header">
          <img src="/logo-doan.png" alt="Logo đoàn" className="logo" />
          <h1>Hệ thống Quản lý Đại hội Đoàn</h1>
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
            <Route path="/captinh" element={<CapTinh user={user} />} />
            <Route path="/tailieu" element={<TaiLieu user={user} />} />
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/admin" element={<Admin user={user} />} />
          </Routes>
        </main>

        <footer className="footer">
          @ 2025 - Đoàn TNCS Hồ Chí Minh tỉnh Lâm Đồng
        </footer>
      </div>
    </Router>
  );
}

export default App;
