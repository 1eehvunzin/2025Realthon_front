import { useEffect, useState } from "react";

export default function AssignmentHistogram({ evaluationItemId }) {
  const [histData, setHistData] = useState(null);
  const [myScore, setMyScore] = useState(null);

  useEffect(() => {
    if (!evaluationItemId) return;

    const fetchHistogram = async () => {
      try {
        const res = await fetch(
          `https://realthon.betatester772.dev/predict-histogram?evaluation_item_id=${evaluationItemId}`
        );
        const json = await res.json();

        const hist = json.histogram;
        const arr = Object.entries(hist).map(([range, value]) => ({
          range,
          value,
        }));

        setHistData(arr);

        // 유저의 점수 정보 저장
        setMyScore(json.my_score);
      } catch (err) {
        console.error("fetch error:", err);
      }
    };

    fetchHistogram();
  }, [evaluationItemId]);

  if (!histData) {
    return <div>히스토그램 데이터를 불러오는 중...</div>;
  }

  const maxValue = Math.max(...histData.map((b) => b.value));

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "flex-end",
        margin: "30px",
      }}
    >
      {histData.map((b, i) => {
        // my_score가 속한 구간인지 확인
        let isMyScoreRange = false;
        if (myScore !== null) {
          const [min, max] = b.range.split("-").map(Number);
          isMyScoreRange = myScore >= min && myScore < max;
        }

        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: isMyScoreRange ? "#FF8C00" : "#007aff",
                width: "30px",
                height: `${(b.value / maxValue) * 200}px`,
                transition: "height 0.3s",
              }}
              title={`범위: ${b.range}, 값: ${b.value}`}
            />
            <h4
              style={{
                color: isMyScoreRange ? "#FF8C00" : "#ddd",
                marginTop: "6px",
              }}
            >
              {b.range}
            </h4>
          </div>
        );
      })}
    </div>
  );
}
