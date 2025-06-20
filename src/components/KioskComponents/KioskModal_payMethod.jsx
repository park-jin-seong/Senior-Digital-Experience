import "./KioskModal_payMethod.css";
import { useNavigate } from "react-router-dom";
const KioskModalPayMethod = () => {
  const nav = useNavigate();

  return (
    <div className="PayModal">
      <div className="PayModalBody">
        <div>결제</div>
        <div>전체금액</div>
        <div className="olderContent"></div>
        <div className="totalPay">총수량:n개 총금액: n원</div>
        <button
          onClick={() => {
            nav("/Kiosk/:2");
          }}
        >
          신용카드 결제
        </button>
        <div></div>
      </div>
    </div>
  );
};
export default KioskModalPayMethod;
