// components/DaiHoiTinh/TrangChuTinh.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./TrangChuTinh.css"; // Tạo file CSS riêng cho đẹp

function TrangChuTinh() {
  const navigate = useNavigate();

  const buttons = [
    {
      label: "📋 Cập nhật tiến độ Đại hội",
      route: "/capnhattinh",
      color: "#0288d1",
      desc: "Nhập thông tin, tiến độ tổ chức Đại hội cấp tỉnh.",
    },
    {
      label: "🧍‍♂️ Điểm danh Đại biểu",
      route: "/diemdanh",
      color: "#43a047",
      desc: "Theo dõi và cập nhật danh sách đại biểu tham dự.",
    },
    {
      label: "🗣️ Góp ý văn kiện",
      route: "/gopy",
      color: "#f57c00",
      desc: "Thu thập ý kiến, góp ý văn kiện Đại hội.",
    },
    {
      label: "📄 Tài liệu, văn bản",
      route: "/tailieu",
      color: "#6a1b9a",
      desc: "Truy cập nhanh các tài liệu phục vụ Đại hội.",
    },
  ];

  return (
    <div className="trangchutinh-container">
      <h2 className="trangchutinh-title">ĐẠI HỘI ĐOÀN TNCS HỒ CHÍ MINH TỈNH LÂM ĐỒNG</h2>
      <p className="trangchutinh-subtitle">
        Cổng thông tin điều hành và theo dõi công tác Đại hội cấp tỉnh
      </p>

      <div className="button-grid">
        {buttons.map((btn, index) => (
          <div
            key={index}
            className="button-card"
            style={{ backgroundColor: btn.color }}
            onClick={() => navigate(btn.route)}
          >
            <h3>{btn.label}</h3>
            <p>{btn.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrangChuTinh;
