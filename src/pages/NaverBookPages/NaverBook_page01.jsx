// src/pages/NaverBookPages/NaverBook_page01.jsx
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import { useContext, useState, useEffect } from "react";
import "./NaverBook_page01.css";
import Header from "../../components/Header";
import Button from "../../components/Button";
import MissionPopup from "../../components/MissionPopup";
import Highlight from "../../components/highlight"; // 하이라이트 및 툴팁 UI 컴포넌트
import { DataDispatchContext } from "../../App";
import NaverMissionButton from "../../components/NaverBookComponents/NaverMissionButton.jsx";

// === 유틸: 랜덤 미래 날짜 생성(YYYY-MM-DD) ===
const getRandomFutureDate = (minDays = 1, maxDays = 60) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const add = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
  const d = new Date(today);
  d.setDate(today.getDate() + add);
  return d.toLocaleDateString("sv-SE"); // "YYYY-MM-DD"
};

const NaverBook_page01 = () => {
  const nav = useNavigate(); // 페이지 이동 함수
  const [showPopup, setShowPopup] = useState(true); // 팝업창 표시 여부
  const { getIsChallenged } = useContext(DataDispatchContext); // 미션모드 여부

  // 팝업에 표시할 미션 값(표시용)
  const [missionDisplay, setMissionDisplay] = useState({
    dateIso: "",
    dateText: "", 
    time: "14:30",
    timeText: "14:30", 
    purpose: "보건증 발급",
    request: "빠른 진료를 원해요",
  });

  // 미션 모드일 때 매번 랜덤 미래 날짜 생성 → 세션 저장 + 팝업 표시
  useEffect(() => {
    if (!getIsChallenged()) return;

    const dateIso = getRandomFutureDate(1, 60); // 내일~60일 사이 임의의 일자
    const time = "14:30";
    const purpose = "보건증 발급";
    const request = "빠른 진료를 원해요";

    sessionStorage.setItem("missionDate", dateIso);
    sessionStorage.setItem("missionTime", time);
    sessionStorage.setItem("missionPurpose", purpose);
    sessionStorage.setItem("missionRequest", request);

    setMissionDisplay({
      dateIso,
      dateText: dateIso, 
      time,
      timeText: time, 
      purpose,
      request,
    });
  }, [getIsChallenged]);

  // 페이지 이동 + 시작 시간 저장 (미션 타이머 시작)
  const secondPage = () => {
    sessionStorage.setItem("missionStart", new Date().toISOString());
    nav("/NaverBook/page02");
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bigContainer">
      {/* 미션모드일 때만 팝업을 띄움 */}
      {showPopup && getIsChallenged() && (
        <MissionPopup
          message={
            <span>
              <span className="redHighlight">{missionDisplay.dateText}</span>,{" "}
              <span className="redHighlight">{missionDisplay.timeText}</span>에
              <br />
              진료 목적은{" "}
              <span className="redHighlight">{missionDisplay.purpose}</span>
              으로,
              <br />
              요청사항에는{" "}
              <span className="redHighlight">{missionDisplay.request}</span>로,
              <br />
              병원 예약 부탁해~
            </span>
          }
          onClose={handleClosePopup}
        />
      )}

      {/* 상단 헤더 컴포넌트 */}
      <Header leftIcon="left1" rightIcon="right1" />

      {/* 스마트폰 프레임 레이아웃 */}
      <div className="bookWrapper">
        <img src="/phone.png" alt="phone" className="phone-frame" />

        <div className="NaverBook_page01">
          {/* 사진 영역 - 메인 및 서브 이미지 */}
          <div className="photo-section">
            <div className="main-photo">
              <img src="/logo_1.png" alt="메인" />
            </div>
            <div className="sub-photo-grid">
              <img src="/icon_img01.jpg" alt="sub1" />
              <img src="/icon_img02.jpg" alt="sub2" />
              <img src="/icon_img03.jpg" alt="sub3" />
              <img src="/icon_img04.jpg" alt="sub4" />
            </div>
          </div>

          {/* 병원 이름과 리뷰 정보 */}
          <h2 className="clinic-title">
            해봐YOU의원 <span>건강의학과</span>
          </h2>
          <p className="reviews">방문자 리뷰 49 · 블록 리뷰 170</p>

          {/* 저장, 거리뷰, 공유 등의 아이콘 + 예약 버튼 */}
          <div className="icon-group">
            <div className="icon-bar">
              <div className="icon-item">
                <i className="fi fi-sr-star"></i>
                <p>저장</p>
              </div>
              <div className="divider" />
              <div className="icon-item">
                <i className="fi fi-sr-marker"></i>
                <p>거리뷰</p>
              </div>
              <div className="divider" />
              <div className="icon-item">
                <i className="fi fi-sr-share"></i>
                <p>공유</p>
              </div>
            </div>

            {/* 조건에 따라 버튼 강조 표시 여부 결정 */}
            {getIsChallenged() ? (
              <div className="reservation_button">
                <Button text={"예약"} onClick={secondPage} />
              </div>
            ) : (
              // 미션모드가 아닐 때 하이라이트 + 툴팁 적용
              <Highlight tooltip="예약하기 버튼을 눌러주세요" color="green">
                <div className="reservation_button">
                  <Button text={"예약"} onClick={secondPage} />
                </div>
              </Highlight>
            )}
          </div>

          {/* 하단 탭바 메뉴 */}
          <div className="tab-bar">
            <div className="tab active">홈</div>
            <div className="tab">리뷰</div>
            <div className="tab">사진</div>
            <div className="tab">지도</div>
            <div className="tab">주변</div>
            <div className="tab">정보</div>
          </div>

          {/* 병원 상세 정보 섹션 */}
          <div className="info-section">
            <div className="info-line">
              <i className="fi fi-sr-marker"></i>
              <p>서울 관악구 봉천로 227 보라매샤르망 5층 한국정보교육원</p>
            </div>
            <div className="info-line">
              <i className="fi fi-sr-navigation"></i>
              <p>신림선 단곡역 2번출구, 2호선 신림역 6번출구 (환승)</p>
            </div>
            <div className="info-line">
              <i className="fi fi-sr-clock"></i>
              <p>24시간 운영</p>
            </div>
            <div className="info-line">
              <i className="fi fi-sr-phone-call"></i>
              <p>
                0507-1318-9611 <span className="copy">복사</span>
              </p>
            </div>
            <div className="info-line">
              <i className="fi fi-sr-user-md"></i>
              <p>정신건강의학과 전문의 4명</p>
            </div>
            <div className="info-line">
              <i className="fi fi-sr-globe"></i>
              <p className="naverlink">http://www.keduit.com</p>
            </div>
            <div className="info-line">
              <i className="fi fi-sr-wheelchair"></i>
              <p>예약, 남/녀 화장실 구분, 대기공간</p>
            </div>
          </div>

          {/* 정보 더보기 버튼 */}
          <button className="more-info">정보 더보기</button>
        </div>
      </div>

      {/* 좌상단 고정: 미션 다시보기 버튼 */}
      <NaverMissionButton />
    </div>
  );
};

export default NaverBook_page01;
