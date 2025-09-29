import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
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

// ===== DỮ LIỆU MOCK BAN ĐẦU =====
const initialXa = Array.from({ length: 134 }, (_, i) => ({
  id: i + 1,
  tenXa: `Xã ${i + 1}`,
  ngayToChuc: "",
  daToChuc: false,
  biThu: "",
  phoBiThu: ""
}));

const initialTailieu = [];

// ===== HELPER =====
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

// ===== COMPONENT DASHBOARD =====
function Dashboard({ daiHoiXa }) {
  const totalXa = daiHoiXa.length;
  const daToChucXa = daiHoiXa.filter(d => d.daToChuc).length;
  const chuaToChucXa = totalXa - daToChucXa;

  const dataXa = [
    { name: "Đã tổ chức", value: daToChucXa },
    { name: "Chưa tổ chức", value: chuaToChucXa },
  ];

  return (
    <div className="dashboard">
      <div className="cap-tinh">
        <h2 style={{ display: "inline-block", marginRight: "10px" }}>
          Đại hội cấp tỉnh:
        </h2>
        <span style={{ fontSize: "16px", fontWeight: "normal", color: "red" }}>
          Chưa tổ chức
        </span>
      </div>

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

      <div className="cap-xa">
        <h2>
          Đại hội cấp xã (Đã tổ chức: {daToChucXa}/{totalXa}, Chưa tổ chức: {chuaToChucXa}/{totalXa})
        </h2>

        <div className="chart">
          <ResponsiveContainer width="40%" height={250}>
            <BarChart data={dataXa} barSize={80} barCategoryGap="0%" barGap={0}>
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

// ===== COMPONENT TIN TỨC =====
function TinTuc() {
  return (
    <div className="tintuc">
      <h2 style={{ marginBottom: "20px", color: "#1e88e5" }}>Tin tức Đại hội</h2>
      <iframe
        src="https://tinhdoan.lamdong.gov.vn"
        width="100%"
        height="600px"
        style={{ border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}
        title="Tin tức Đại hội"
      ></iframe>
    </div>
  );
}

// ===== COMPONENT LOGIN =====
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "123456") {
      onLogin({ username: "admin", role: "tinh-doan" });
      navigate("/admin");
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      <h2>Đăng nhập Admin</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/><br/>
      <button type="submit">Đăng nhập</button>
    </form>
  );
}

// ===== COMPONENT CAPXA =====
function CapXa({ user }) {
  const canEdit = user?.role === "tinh-doan";

  const [daiHoiXa, setDaiHoiXa] = useState(() => {
    const saved = localStorage.getItem("daiHoiXa");
    return saved ? JSON.parse(saved) : initialXa;
  });

  const [filterText, setFilterText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    tenXa: "",
    ngayToChuc: "",
    daToChuc: false,
    biThu: "",
    phoBiThu: ""
  });

  useEffect(() => {
    localStorage.setItem("daiHoiXa", JSON.stringify(daiHoiXa));
  }, [daiHoiXa]);

  const startEdit = (dh) => {
    setEditingId(dh.id);
    setFormData({
      tenXa: dh.tenXa,
      ngayToChuc: dh.ngayToChuc,
      daToChuc: dh.daToChuc,
      biThu: dh.biThu,
      phoBiThu: dh.phoBiThu
    });
  };

  const handleSave = () => {
    setDaiHoiXa(prev =>
      prev.map(d => (d.id === editingId ? { ...d, ...formData } : d))
    );
    setEditingId(null);
  };

  const filteredXa = daiHoiXa.filter(d => d.tenXa.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div>
      <h2>Đại hội cấp xã</h2>
      <input
        type="text"
        placeholder="Tìm kiếm xã..."
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
        style={{ marginBottom: "10px", padding: "4px", width: "300px" }}
      />
      <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Tên xã</th>
            <th>Ngày tổ chức</th>
            <th>Trạng thái</th>
            <th>Bí thư</th>
            <th>Phó bí thư</th>
            {canEdit && <th>Sửa / Lưu</th>}
          </tr>
        </thead>
        <tbody>
          {filteredXa.map(dh => (
            <tr key={dh.id} style={{ backgroundColor: dh.daToChuc ? "#c8e6c9" : "#ffcdd2" }}>
              <td>
                {editingId === dh.id ? (
                  <input value={formData.tenXa} onChange={e => setFormData({...formData, tenXa: e.target.value})} />
                ) : dh.tenXa}
              </td>
              <td>
                {editingId === dh.id ? (
                  <input type="date" value={formData.ngayToChuc} onChange={e => setFormData({...formData, ngayToChuc: e.target.value})} />
                ) : formatDate(dh.ngayToChuc)}
              </td>
              <td>
                {editingId === dh.id ? (
                  <select value={formData.daToChuc} onChange={e => setFormData({...formData, daToChuc: e.target.value==="true"})}>
                    <option value="true">Đã tổ chức</option>
                    <option value="false">Chưa tổ chức</option>
                  </select>
                ) : (dh.daToChuc ? "Đã tổ chức" : "Chưa tổ chức")}
              </td>
              <td>
                {editingId === dh.id ? (
                  <input value={formData.biThu} onChange={e => setFormData({...formData, biThu: e.target.value})} />
                ) : dh.biThu || "-"}
              </td>
              <td>
                {editingId === dh.id ? (
                  <input value={formData.phoBiThu} onChange={e => setFormData({...formData, phoBiThu: e.target.value})} />
                ) : dh.phoBiThu || "-"}
              </td>
              {canEdit && (
                <td>
                  {editingId === dh.id ? (
                    <button onClick={handleSave}>Lưu</button>
                  ) : (
                    <button onClick={() => startEdit(dh)}>Sửa</button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ===== COMPONENT CAPTINH =====
function CapTinh() {
  return <h2>Đại hội cấp tỉnh</h2>;
}

// ===== COMPONENT TÀI LIỆU =====
// ===== COMPONENT TÀI LIỆU =====
function TaiLieu({ user }) {
  const [tailieu, setTailieu] = React.useState(() => {
    const saved = localStorage.getItem("tailieu");
    return saved ? JSON.parse(saved) : [];
  });
  const [file, setFile] = React.useState(null);
  const [ten, setTen] = React.useState("");

  const handleUpload = () => {
    if (!file || !ten.trim()) {
      alert("Vui lòng nhập tên tài liệu và chọn file PDF!");
      return;
    }
    const newFile = {
      name: ten.trim(),
      url: URL.createObjectURL(file),
    };
    const updated = [...tailieu, newFile];
    setTailieu(updated);
    localStorage.setItem("tailieu", JSON.stringify(updated));
    setFile(null);
    setTen("");
    alert("Tài liệu đã được lưu!");
  };

  return (
    <div>
      <h2>Tài liệu Đại hội</h2>
      
      {user?.role === "tinh-doan" && (
        <div style={{ marginBottom: "15px", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Tên tài liệu"
            value={ten}
            onChange={e => setTen(e.target.value)}
            style={{ marginRight: "10px", padding: "4px" }}
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={e => setFile(e.target.files[0])}
            style={{ marginRight: "10px" }}
          />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}

      <ul style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
        {tailieu.length === 0 && <li>Chưa có tài liệu nào.</li>}
        {tailieu.map((f, i) => (
          <li key={i}>
            <a href={f.url} target="_blank" rel="noopener noreferrer">{f.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}


// ===== COMPONENT ADMIN =====
function Admin({ user }) {
  const [tab, setTab] = React.useState(null); // 'capxa', 'captinh', 'tailieu'

  if (!user || user.role !== "tinh-doan") {
    return <p>Chỉ admin mới có quyền truy cập.</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Quản lý Admin</h2>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setTab("capxa")} style={{ marginRight: "10px" }}>Cập nhật Đại hội cấp xã</button>
        <button onClick={() => setTab("captinh")} style={{ marginRight: "10px" }}>Cập nhật Đại hội cấp tỉnh</button>
        <button onClick={() => setTab("tailieu")}>Cập nhật Tài liệu</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {tab === "capxa" && <CapXa user={user} />}
        {tab === "captinh" && <CapTinh />}
        {tab === "tailieu" && <TaiLieu user={user} />}
      </div>
    </div>
  );
}


// ===== APP CHÍNH =====
function App() {
  const [user, setUser] = useState(null);

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
          <Link to="/captinh">🏛️ Đại hội Tỉnh đoàn</Link>
          <Link to="/tailieu">📄 Tài liệu Đại hội</Link>
          <Link to="/caidat">⚙️ Cài đặt</Link>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard daiHoiXa={JSON.parse(localStorage.getItem("daiHoiXa")) || initialXa} />} />
            <Route path="/tintuc" element={<TinTuc />} />
            <Route path="/capxa" element={<CapXa user={user} />} />
            <Route path="/captinh" element={<CapTinh />} />
            <Route path="/tailieu" element={<TaiLieu />} />
            <Route path="/caidat" element={<Login onLogin={setUser} />} />
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
