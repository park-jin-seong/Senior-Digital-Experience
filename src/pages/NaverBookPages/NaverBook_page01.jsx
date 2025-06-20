import { useNavigate } from "react-router-dom";
import "./NaverBook_page01.css";
import Header from "../../components/Header";
import Button from "../../components/Button";

const NaverBook_page01 = () => {
  const nav = useNavigate();
  const secondPage = () => {
    nav("/NaverBook/page02");
  };

  return (
    <div className="bigContainer">
      <Header />
      <div className="bookWrapper">
        <img src="/phone.png" alt="phone" className="phone-frame" />

        <div className="NaverBook_page01">
          {/* 사진 영역 */}
          <div className="photo-section">
            <div className="main-photo">
              <img src="/logo_1.png" alt="메인" />
            </div>
            <div className="sub-photo-grid">
              <img src="/logo_1.png" alt="sub1" />
              <img src="/logo_1.png" alt="sub2" />
              <img src="/logo_1.png" alt="sub3" />
              <img src="/logo_1.png" alt="sub4" />
            </div>
          </div>

          <h2 className="clinic-title">
            해봐YOU의원 <span>건강의학과</span>
          </h2>
          <p className="reviews">방문자 리뷰 49 · 블로그 리뷰 170</p>

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

            <div className="action-buttons">
              <Button text={"예약"} />
              <Button text={"문의"} />
            </div>
          </div>

          <div className="action-buttons">
            <button className="green" onClick={secondPage}>
              예약
            </button>
            <button className="gray">문의</button>
          </div>

          <div className="tab-bar">
            <div className="tab active">홈</div>
            <div className="tab">리뷰</div>
            <div className="tab">사진</div>
            <div className="tab">지도</div>
            <div className="tab">주변</div>
            <div className="tab">정보</div>
          </div>

          {/* 병원 정보 아이콘 + 텍스트 한 줄씩 */}
          <div className="info-section">
            <div className="info-line">
              <i className="fi fi-sr-marker"></i>
              <p>서울 관악구 봉천로 227 보라매샤르망 5층 한국정보교육원</p>
            </div>

            <div className="info-line">
              <i className="fi fi-sr-navigation"></i>
              <p>신림선 당곡역 2번출구, 2호선 신림역 6번출구 (환승)</p>
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

          <button className="more-info">정보 더보기</button>
        </div>
      </div>
    </div>
  );
};

export default NaverBook_page01;
