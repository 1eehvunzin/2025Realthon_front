import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Taskcard from "../components/Taskcard";
import Histogram from "../components/histogram";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setcourse] = useState(null);
  const [items, setitems] = useState([]);
  const [grade, setGrade] = useState("A");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://134.185.97.247:8000/courses");
        const json = await res.json();

        const found = json.find((c) => String(c.id) === String(courseId));

        setcourse(found);
      } catch (err) {
        console.error("fetch error:", err);
      }
    };

    fetchData();
  }, [courseId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://134.185.97.247:8000/evaluation-items");
        const json = await res.json();
        setitems(json);
      } catch (err) {
        console.error("fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const upcomingItems = items
    .filter((item) => String(item.course_id) === String(courseId))
    .filter((item) => !item.is_submitted);

  const pastItems = items
    .filter((item) => String(item.course_id) === String(courseId))
    .filter((item) => item.is_submitted);

  return (
    <div className="page">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <h4 style={{ marginRight: "8px", alignContent: "center" }}>
          목표 등급
        </h4>
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            outline: "none",
          }}
        >
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C+">C+</option>
        </select>
      </div>
      <h2 style={{ margin: "24px 0 12px 0" }}>
        {course
          ? `${course.name}, 선택과 집중 리포트`
          : "강의 정보를 불러오는 중..."}
      </h2>
      <Histogram />
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
      <h2 style={{ margin: "24px 0 12px 0" }}>예정된 과제 • 시험</h2>
      {upcomingItems.map((item) => (
        <Taskcard
          key={item.id}
          title={item.name}
          type={item.name.includes("과제") ? "과제" : "시험"}
          rate="중요도 ⭐ : 5.0"
        />
      ))}
      <button style={{ width: "100%" }}>
        <div
          style={{
            border: "1px solid #007aff",
            padding: "16px",
            display: "flex",
            borderRadius: "16px",
            color: "#007aff",
            width: "90%",
            margin: "12px 0px",
            justifyContent: "center",
          }}
        >
          <h4>예정된 과제 • 시험 추가하기</h4>
        </div>
      </button>
      <h2 style={{ margin: "24px 0 12px 0" }}>지나간 과제 • 시험</h2>
      {pastItems.map((item) => (
        <Taskcard
          key={item.id}
          title={item.name}
          type={item.name.includes("과제") ? "과제" : "시험"}
          rate={`나의 점수: ${item.my_score}`}
        />
      ))}
      <button style={{ width: "100%" }}>
        <div
          style={{
            border: "1px solid #007aff",
            padding: "16px",
            display: "flex",
            borderRadius: "16px",
            color: "#007aff",
            width: "90%",
            margin: "12px 0px",
            justifyContent: "center",
          }}
        >
          <h4>지나간 과제 • 시험 추가하기</h4>
        </div>
      </button>
    </div>
  );
}
