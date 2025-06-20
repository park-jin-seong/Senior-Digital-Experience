import "./KioskModal_pay.css";
import { useNavigate } from "react-router-dom";
const KioskModalPay = ({ setOnOlderModal }) => {
  const nav = useNavigate();

  const nextPage = () => {
    setOnOlderModal(false);
    nav("/Kiosk/:2");
  };

  return (
    <div className="PayModal">
      <div className="PayModalBody">
        <div className="OLDERlIST">
          <div className="olderContent">주문 내역 목록들 축약</div>
        </div>
        <div className="totalPay">총수량:n개 총금액: n원</div>
        <div>
          <button
            className="leftBtn"
            onClick={() => {
              setOnOlderModal(false);
            }}
          >
            이전
          </button>
          <button className="rightBtn" onClick={nextPage}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default KioskModalPay;
