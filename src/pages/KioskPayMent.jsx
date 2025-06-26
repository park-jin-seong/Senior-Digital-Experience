import "./KioskPayMent.css";
import "../components/highlight.css";
import Header from "../components/Header";
import { useContext, useState } from "react";
import { DataDispatchContext } from "../App";

import { useNavigate } from "react-router-dom";
const KioskPayMent = () => {
  const { getIsChallenged } = useContext(DataDispatchContext); //미션인지 연습인지
  const [fourHighlight, setFourHighlight] = useState(false);
  const nav = useNavigate();

  const backMenuPage = () => {
    nav(-1);
  };
  const cardPayMent = () => {
    nav("/KioskCardPay");
    setFourHighlight(true);
  };
  return (
    <div className="KioskPayMent">
      <Header leftIcon="left2" rightIcon="right2" />
      <div className="KIOSKDP2">
        <img className="KIOSKDP2-img" src="/koisk.png" />
        <div className="KioskPayWRAP">
          <div className="LastOlderPage">
            <div className="oldertext">
              <b>결제방법을 선택해주세요</b>
            </div>
            <div className="pickCARD">
              <b>신용카드를 선택해주세요</b>
            </div>
            <div className="olderMETHOD">
              <div className="topBtn">
                {getIsChallenged() ? (
                  ""
                ) : (
                  <div className={`tooltipPay`}>메뉴를 선택해 주세요</div>
                )}
                <button
                  onClick={cardPayMent}
                  className={getIsChallenged() ? "" : "CARDBTN highlighPay"}
                >
                  <div>
                    <img src="card.png" className="CardImg" />
                  </div>
                  <div>신용카드</div>
                </button>

                <button>
                  <div>
                    <img src="coupon.png" className="CardImg" />
                  </div>
                  모바일 쿠폰
                </button>
              </div>
              <div className="bottomBtn">
                <button>
                  <div>
                    <img
                      src="https://mcdn.twosome.co.kr/upload/MOGC0030/202309/MOGC0030_20230912152427_HhnEQPGs"
                      className="CardImg"
                    />
                  </div>
                  투썸기프트카드
                </button>
                <button className="bottomBtn">
                  <div>
                    <img src="kakaoPay.png" className="CardImg" />
                  </div>
                  카카오페이
                </button>
              </div>
            </div>
            {/* <div class="BTNcontainer">
              <button class="BackBTN" onClick={backMenuPage}>
                <b>이전</b>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KioskPayMent;
