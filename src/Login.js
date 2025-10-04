import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists() || docSnap.data().role !== "tinh-doan") {
        alert("Bạn không có quyền admin!");
        return;
      }

      onLogin({ uid: user.uid, email: user.email, role: docSnap.data().role });
      navigate("/admin");
    } catch (error) {
      alert("Sai email hoặc mật khẩu!");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      <h2>Đăng nhập Admin</h2>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br/><br/>
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br/><br/>
      <button
  type="submit"
  style={{
    color: "white",              // màu chữ
    backgroundColor: "#1976d2",  // màu nền xanh dương đậm
    border: "none",              // bỏ viền
    padding: "7px 15px",         // khoảng cách bên trong
    borderRadius: "4px",         // bo góc
    cursor: "pointer"            // con trỏ chuột khi hover
  }}
>
  Đăng nhập
</button>
    </form>
  );
}

export default Login;
