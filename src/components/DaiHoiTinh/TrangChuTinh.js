import React from "react";
import {
  FileText,
  BookOpen,
  ScrollText,
  MapPin,
  Users,
  MessageSquare,
  Info,
  Image
} from "lucide-react";
import "./TrangChuTinh.css";

const TrangChuTinh = () => {
  const buttons = [
    { icon: <FileText color="#ffcc00" size={22} />, text: "Chương trình Đại hội", bg: "#007bff" },
    { icon: <BookOpen color="#00ff88" size={22} />, text: "Nội quy - Quy chế Đại hội", bg: "#28a745" },
    { icon: <ScrollText color="#ff6600" size={22} />, text: "Văn kiện Đại hội", bg: "#17a2b8" },
    { icon: <MapPin color="#ff3366" size={22} />, text: "Sơ đồ vị trí đại biểu", bg: "#6f42c1" },
    { icon: <Users color="#ffff66" size={22} />, text: "Điểm danh đại biểu", bg: "#dc3545" },
    { icon: <MessageSquare color="#00e6ff" size={22} />, text: "Góp ý văn kiện", bg: "#fd7e14" },
    { icon: <Info color="#ff99cc" size={22} />, text: "Thông tin khác", bg: "#20c997" },
    { icon: <Image color="#ffd700" size={22} />, text: "Thay ảnh đại diện", bg: "#007bff" }
  ];

  return (
    <div className="trang-chu-tinh-container">
      <h2>
        ĐẠI HỘI ĐOÀN TNCS HỒ CHÍ MINH TỈNH LÂM ĐỒNG <br />
        NHIỆM KỲ 2025 - 2030<br />
        -----
      </h2>

      <div className="button-grid">
        {buttons.map((btn, index) => (
          <button
            key={index}
            className="action-button"
            style={{ backgroundColor: btn.bg }}
          >
            <span className="icon">{btn.icon}</span>
            <span className="text">{btn.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrangChuTinh;
