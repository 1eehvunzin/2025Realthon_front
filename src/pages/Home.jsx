import "../style.css";
import { useState } from "react";
import Search from "../assets/Search.png";
import Coursecard from "../components/Coursecard";
import Profile from "../assets/profile.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setuser] = useState("김리얼");
  const navigate = useNavigate();

  return (
    <div className="page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <h4 style={{ color: "#7D8A95" }}>환영합니다!</h4>
          <h3>{user} 님</h3>
        </div>
        <div>
          <button>
            <img src={Search} alt="검색" />
          </button>
          <button onClick={() => navigate("/profile")}>
            <img
              src={Profile}
              alt="프로필 수정"
              style={{ width: "28px", height: "28px" }}
            />
          </button>
        </div>
      </div>
      <h2 style={{ margin: "24px 0 12px 0" }}>이번 학기, 선택과 집중 리포트</h2>
      <div
        style={{
          backgroundColor: "#FAFAFC",
          border: "1px solid #F4F4F6",
          color: "#000000",
          padding: "16px",
          display: "flex",
          borderRadius: "16px",
          width: "90%",
          margin: "12px 0px",
        }}
      >
        예시 텍스트 입니다
      </div>
      <h2 style={{ margin: "24px 0 12px 0" }}>수강 관리 중인 과목</h2>
      <Coursecard />
      <Coursecard />
      <Coursecard />
      <Coursecard />
      <Coursecard />
      <Coursecard />
    </div>
  );
}
