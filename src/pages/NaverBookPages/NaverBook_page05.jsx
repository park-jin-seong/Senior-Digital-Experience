import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import "./NaverBook_page05.css";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { DataDispatchContext, DataStateContext } from "../../App";
import "../../components/highlight.css";

const NaverBook_page05 = () => {
  const location = useLocation();
  const { getIsChallenged, setIsChallenged, onUpdate } =
    useContext(DataDispatchContext);
  const { loginedId } = useContext(DataStateContext);
  const { date, time, slot, purposeTreatment, treatmentRequest } =
    location.state || {};

  const nav = useNavigate();

  const retryPage = () => {
    setIsChallenged("naverBook", true);
    nav("/NaverBook/page01");
  };

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const missionDate = "2025-06-30";
      const missionTimeVal = "14:30";
      const missionPurpose = "보건증 발급";
      const missionRequest = "빠른 진료를 원해요";

      const isDateMatch = date === missionDate;
      const isTimeMatch = time === missionTimeVal;
      const isPurposeMatch = purposeTreatment?.includes(missionPurpose);
      const isRequestMatch = treatmentRequest === missionRequest;

      const isAllMatch =
        isDateMatch && isTimeMatch && isPurposeMatch && isRequestMatch;

      if (isAllMatch) {
        var mission = loginedId.mission;
        mission[1] = true;
        onUpdate(
          loginedId.id,
          loginedId.phoneNum,
          loginedId.password,
          loginedId.birth,
          mission
        );
        setIsConfirmed(true);
      } else {
        setIsFailed(true);
      }
      setShowResult(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bigContainer">
      <Header />
      <div className="bookWrapper">
        <img src="/phone.png" alt="phone" />
        <div className="NaverBook_page05">
          <div className="bookImg">
            <img
              src={
                showResult
                  ? isConfirmed
                    ? "/icon_friends.png"
                    : getIsChallenged()
                    ? "/icon_sad.png"
                    : "/icon_friends.png"
                  : "/icon_memo.png"
              }
              alt="아이콘"
            />
          </div>

          <div className="bookConfirm">
            {!showResult && (
              <>
                <h1>예약을 확인 중입니다</h1>
                <p>예약이 확정되면 네이버앱 알림으로 알려드릴게요!</p>
                <p>
                  내 예약은 <strong>네이버마이</strong>에서 찾을 수 있어요.
                </p>
                <div className="waitTime">
                  <img src="/icon_clock.png" alt="시계" />
                  <p>확정까지 평균 2~3시간</p>
                </div>
              </>
            )}

            {showResult && isConfirmed && getIsChallenged() && (
              <div className="resultBox success">
                <h2>미션 성공 </h2>
                <p>예약 정보가 성공적으로 전달되었습니다.</p>
              </div>
            )}

            {showResult && isFailed && getIsChallenged() && (
              <div className="resultBox fail">
                <h2>미션 실패 </h2>
                <p className="missionReason">조건이 맞지 않아 실패했어요</p>
                <p className="retryAgain">다시 도전해보세요!</p>
                <div className="retryBtn">
                  <Button text={"다시 도전하기"} onClick={retryPage} />
                </div>
              </div>
            )}

            {showResult && isFailed && !getIsChallenged() && (
              <div className="resultBox fail">
                <h2>연습모드 종료 </h2>
                <p className="missionReason">
                  연습 모드가 종료되었습니다.
                  <br />
                  실전모드를 도전하러 가세요!
                </p>
                <div className="retryBtn">
                  <Button text={"실전모드"} onClick={retryPage} />
                </div>
              </div>
            )}
          </div>

          <div className="finalBook">
            <p className="bookName">해봐YOU의원</p>
            <p className="bookDate">
              {date} ∘ {slot} {time}
            </p>
            {purposeTreatment && purposeTreatment.length > 0 && (
              <p className="bookPurpose">
                진료 목적: {purposeTreatment.join(", ")}
              </p>
            )}
            {treatmentRequest && (
              <p className="bookRequest">요청사항: {treatmentRequest}</p>
            )}
            <p className="smallbookContent">해봐YOU의원_네이버예약</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaverBook_page05;
