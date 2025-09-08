import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 hook
import "./NaverBook_page02.css";
import Header from "../../components/Header";
import Highlight from "../../components/highlight"; // 강조 효과 및 툴팁 컴포넌트
import { DataDispatchContext } from "../../App";
import { useContext } from "react";
import NaverMissionButton from "../../components/NaverBookComponents/NaverMissionButton.jsx";

const NaverBook_page02 = () => {
  const nav = useNavigate(); // 페이지 이동 함수 생성
  const { getIsChallenged } = useContext(DataDispatchContext); // 미션모드 여부 가져오기

  // 다음 페이지(날짜/시간 선택 페이지)로 이동
  const thirdPage = () => {
    nav("/NaverBook/page03");
  };

  return (
    <div className="bigContainer">
      {/* 상단 헤더 */}
      <Header leftIcon="left1" rightIcon="right1" />

      {/* 스마트폰 모형 프레임 */}
      <div className="bookWrapper">
        <img src="/phone.png" alt="스마트폰 프레임" />

        <div className="NaverBook_page02">
          {/* 병원 상단 이미지와 정보가 겹쳐지는 영역 */}
          <div className="topImageBox">
            <img src="/hospital.png" alt="병원 내부" />

            {/* 이미지 위에 덮여지는 그라데이션 및 병원 정보 */}
            <div className="gradientOverlay">
              <h2>해봐YOU의원</h2>
              <p>★ 4.99 / 리뷰 1520</p>
              <div className="ratingBox">
                <span>★ 4.99</span>
                <span className="dividerDot">·</span>
                <span>리뷰 1520</span>
              </div>
            </div>
          </div>

          {/* 주소 및 아이콘 정보 */}
          <div className="contactBox">
            {/* 주소 표시 */}
            <div className="contactIconRow">
              <i className="fi fi-sr-marker"></i>
              <p>서울 관악구 봉천로 227 보라매샤르망 5층 한국정보교육원</p>
            </div>

            {/* 네이버 예약에서 자주 쓰이는 기능 아이콘 (지도, 톡톡 등) */}
            <div className="contactIconRow">
              <div className="iconItem">
                <i className="fi fi-sr-map-marker"></i>
                <span>지도</span>
              </div>
              <div className="iconItem">
                <i className="fi fi-sr-comment-alt"></i>
                <span>톡톡</span>
              </div>
              <div className="iconItem">
                <i className="fi fi-sr-home"></i>
                <span>홈페이지</span>
              </div>
              <div className="iconItem">
                <i className="fi fi-sr-phone-call"></i>
                <span>전화</span>
              </div>
            </div>
          </div>

          {/* 예약 영역 */}
          <div className="reservationSection">
            <h3>예약</h3>

            {/* 미션모드일 경우 강조 없음, 일반 모드일 경우 하이라이트 적용 */}
            {getIsChallenged() ? (
              <div className="reservationCard" onClick={thirdPage}>
                <h4>더해봐YOU의원 _ 네이버예약</h4>
                <p>
                  해봐YOU의원 네이버 예약입니다. 간편하게 예약하고 문의해주세요.
                  감사합니다.
                </p>
                <div className="reviewAndBtnRow">
                  <span className="reviewSmall">★ 4.99 / 리뷰 1520</span>
                  <button className="greenBtn">예약하기</button>
                </div>
              </div>
            ) : (
              // 일반 모드: 강조 효과(Highlight 컴포넌트) + 툴팁 표시
              <Highlight
                tooltip="병원을 선택해 예약을 시작해보세요!"
                color="green"
              >
                <div className="reservationCard" onClick={thirdPage}>
                  <h4>더해봐YOU의원 _ 네이버예약</h4>
                  <p>
                    해봐YOU의원 네이버 예약입니다. 간편하게 예약하고
                    문의해주세요. 감사합니다.
                  </p>
                  <div className="reviewAndBtnRow">
                    <span className="reviewSmall">★ 4.99 / 리뷰 1520</span>
                    <button className="greenBtn">예약하기</button>
                  </div>
                </div>
              </Highlight>
            )}
          </div>

          {/* 병원 소개 영역 */}
          <div className="sectionWrapper">
            <h3 className="sectionTitle">소개</h3>
            <div className="introSection">
              <p>
                행신동 치과 일대 최대 규모 상상플란트치과
                <br />
                - 구강악안면외과, 보철과, 교정과 전문의 협진
                <br />
                - 대학병원급 장비 및 감염방지 시스템 구축
                <br />- 1:1 맞춤 진료와 전문 상담 제공
              </p>
            </div>
          </div>
        </div>
      </div>
      <NaverMissionButton />
    </div>
  );
};

export default NaverBook_page02;
