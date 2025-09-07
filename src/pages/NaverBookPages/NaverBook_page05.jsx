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

  // 예약 정보
  const { date, time, slot, purposeTreatment, treatmentRequest } =
    location.state || {};

  const nav = useNavigate();

  const AUTO_NAV_SECONDS = 0;
  const AUTO_NAV_TARGET = "/";

  // 미션모드 on + 첫 페이지로 이동
  const retryPage = () => {
    // 새 랜덤 날짜를 다시 뽑을 수 있도록 세션 초기화
    sessionStorage.removeItem("missionDate");
    sessionStorage.removeItem("missionTime");
    sessionStorage.removeItem("missionPurpose");
    sessionStorage.removeItem("missionRequest");

    setIsChallenged("naverBook", true);
    nav("/NaverBook/page01");
  };

  // 미션 성공/실패 관련 상태
  const [isConfirmed, setIsConfirmed] = useState(false); // 미션 성공 여부
  const [isFailed, setIsFailed] = useState(false); // 미션 실패 여부
  const [showResult, setShowResult] = useState(false); // 결과 보여줄지 여부

  // 문자열 정규화 유틸 (공백 제거 + 소문자)
  const norm = (v) => (v ?? "").toString().trim().toLowerCase();

  // 3초 후 미션 성공/실패 판정
  useEffect(() => {
    const timer = setTimeout(() => {
      // 세션에 저장한 미션 정답 조건 읽기
      const missionDate = sessionStorage.getItem("missionDate");
      const missionTimeVal = sessionStorage.getItem("missionTime") || "14:30";
      const missionPurpose =
        sessionStorage.getItem("missionPurpose") || "보건증 발급";
      const missionRequest =
        sessionStorage.getItem("missionRequest") || "빠른 진료를 원해요";

      // 각각의 조건 비교 (안전하게 정규화)
      const isDateMatch = norm(date) === norm(missionDate);
      const isTimeMatch = norm(time) === norm(missionTimeVal);

      // purposeTreatment가 배열/문자열 모두 대응
      const isPurposeMatch = Array.isArray(purposeTreatment)
        ? purposeTreatment.map(norm).includes(norm(missionPurpose))
        : norm(purposeTreatment).includes(norm(missionPurpose));

      const isRequestMatch = norm(treatmentRequest) === norm(missionRequest);

      // 디버깅 로그 (필요 시 개발자도구에서 확인)
      console.log({
        fromPage: { date, time, purposeTreatment, treatmentRequest },
        fromMission: {
          missionDate,
          missionTimeVal,
          missionPurpose,
          missionRequest,
        },
        match: { isDateMatch, isTimeMatch, isPurposeMatch, isRequestMatch },
      });

      // 네 가지 모두 맞아야 성공
      const isAllMatch =
        isDateMatch && isTimeMatch && isPurposeMatch && isRequestMatch;

      if (isAllMatch) {
        // 미션 성공 시 사용자 mission 배열 업데이트
        try {
          const mission = Array.isArray(loginedId?.mission)
            ? [...loginedId.mission]
            : [];
          mission[1] = true; // 인덱스는 프로젝트 규칙에 맞게 유지
          onUpdate?.(
            loginedId?.id,
            loginedId?.phoneNum,
            loginedId?.password,
            loginedId?.birth,
            mission
          );
        } catch (e) {
          console.warn("onUpdate 처리 중 오류:", e);
        }
        setIsConfirmed(true);
      } else {
        setIsFailed(true);
      }

      setShowResult(true); // 결과 보여주기
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 사라지면 타이머 해제
  }, []);

  // 성공 후 자동 네비게이트
  useEffect(() => {
    if (showResult && isConfirmed && AUTO_NAV_SECONDS > 0) {
      const t = setTimeout(() => {
        nav(AUTO_NAV_TARGET);
      }, AUTO_NAV_SECONDS * 1000);
      return () => clearTimeout(t);
    }
  }, [showResult, isConfirmed, nav]);

  return (
    <div className="bigContainer">
      <Header />
      <div className="bookWrapper">
        <img src="/phone.png" alt="phone" />
        <div className="NaverBook_page05">
          {/* 상단 아이콘 (상태에 따라 이미지 다르게 보여짐) */}
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

          {/* 메시지 및 결과 안내 */}
          <div className="bookConfirm">
            {/* 로딩 중일 때 */}
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

            {/*  미션/연습모드와 무관하게 성공 UI 표시 */}
            {showResult && isConfirmed && (
              <div className="resultBox success">
                <h2>{getIsChallenged() ? "미션 성공" : "연습 성공"}</h2>
                <p>예약 정보가 성공적으로 전달되었습니다.</p>
                {AUTO_NAV_SECONDS > 0 && (
                  <p className="autoNavHint">
                    {AUTO_NAV_SECONDS}초 후 다음 화면으로 이동합니다…
                  </p>
                )}
              </div>
            )}

            {/* 미션 실패 (실전 모드일 때) */}
            {showResult && isFailed && getIsChallenged() && (
              <div className="resultBox fail">
                <h2>미션 실패</h2>
                <p className="missionReason">조건이 맞지 않아 실패했어요</p>
                <p className="retryAgain">다시 도전해보세요!</p>
                <div className="retryBtn">
                  <Button text={"다시 도전하기"} onClick={retryPage} />
                </div>
              </div>
            )}

            {/* 연습모드일 때는 실패 → 연습 종료 */}
            {showResult && isFailed && !getIsChallenged() && (
              <div className="resultBox fail">
                <h2>연습모드 종료</h2>
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

          {/* 하단 예약 정보 요약 */}
          <div className="finalBook">
            <p className="bookName">해봐YOU의원</p>
            <p className="bookDate">
              {date} ∘ {slot} {time}
            </p>
            {purposeTreatment &&
              (Array.isArray(purposeTreatment)
                ? purposeTreatment.length > 0
                : !!purposeTreatment) && (
                <p className="bookPurpose">
                  진료 목적:{" "}
                  {Array.isArray(purposeTreatment)
                    ? purposeTreatment.join(", ")
                    : purposeTreatment}
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
