import React from "react";
import "./App.css";
import logoDoan from "./logo-doan.png"; // nhớ thêm file logo vào thư mục src
import lamdong from "./lamdong.png";

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <img src={logoDoan} alt="Logo Đoàn TNCS Hồ Chí Minh" className="logo" />
        <h1>Hệ thống Quản lý Đại hội Đoàn</h1>
      </header>

      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li><a href="#home">Trang chủ</a></li>
          <li><a href="#progress">Tiến độ</a></li>
          <li><a href="#report">Báo cáo</a></li>
          <li><a href="#setting">Đại hội Đoàn cấp tỉnh</a></li>
          <li><a href="#setting">Đăng nhập</a></li>
        </ul>
      </nav>

      {/* Nội dung */}
      <main className="content">
        <h2>Chào mừng bạn đến với hệ thống quản lý Đại hội Đoàn</h2>
        <p>Hãy truy cập vào các nút chức năng để trải nghiệm các tính năng của ứng dụng</p>
      </main>


      <div className="image-wrapper">
  <img 
    src={lamdong} 
    alt="Cảnh đẹp Lâm Đồng" 
    className="footer-image" 
  />
</div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Đoàn TNCS Hồ Chí Minh</p>
      </footer>
    </div>
  );
}

export default App;
