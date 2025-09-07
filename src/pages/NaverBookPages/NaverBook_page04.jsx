import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import "./NaverBook_page04.css";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { DataStateContext, DataDispatchContext } from "../../App";
import Highlight from "../../components/highlight";
import NaverMissionButton from "../../components/NaverBookComponents/NaverMissionButton.jsx";

const NaverBook_page04 = () => {
  // 이전 페이지에서 넘어온 예약 정보 (날짜, 시간)
  // navigate()로 페이지 이동할 때 함께 넘긴 state 데이터를 받아올 때 사용
  const location = useLocation();
  // location.state가 undefined일 경우를 대비한 안전장치 -> 에러 없이 구조분해 할당이 가능
  const { date, time } = location.state || {};

  const nav = useNavigate(); // 페이지 이동
  const { getIsChallenged } = useContext(DataDispatchContext); // 미션 모드 여부

  const [medicaPurpose, setMedicaPurpose] = useState(false); // 진료목적 선택 여부
  const [medicaRequest, setMedicaRequest] = useState(false); // 요청사항 선택 여부

  const userState = useContext(DataStateContext); // 로그인 유저 정보
  // userState는 전역 상태(Context)에서 가져온 로그인 정보 객체 -> 그런데 userState가 아직 undefined일 수 있다.
  // ?. (optional chaining, 옵셔널 체이닝
  // 만약 userState?.loginedId가 없으면(= 로그인 안 했으면) 빈 객체 할당
  const loginedUser = userState?.loginedId || {};

  const [purposeTreatment, setPurposeTreatment] = useState([]); // 선택된 진료 목적
  const [treatmentRequest, setTreatmentRequest] = useState(""); // 선택된 요청사항

  // 시간대(오전/오후) 계산 함수
  const getSlot = (time) => {
    // : 기준으로 "14"와 "30"으로 나눠진 배열
    const hour = parseInt(time.split(":")[0]);
    return hour < 12 ? "오전" : "오후";
  };
  const slot = time ? getSlot(time) : "";

  // 진료 목적 체크박스 선택 토글
  const handleCheckboxChange = (value) => {
    setPurposeTreatment((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setMedicaPurpose(true); // 진료 목적 선택 완료 상태로 변경
  };

  // 다음 페이지(예약 확인/결과)로 이동하며 입력 정보 넘김
  const fifthPage = () => {
    sessionStorage.setItem("missionEnd", new Date().toISOString()); // 미션 종료 시간 기록
    nav("/NaverBook/page05", {
      state: {
        date,
        time,
        slot,
        purposeTreatment,
        treatmentRequest,
      },
    });
  };

  return (
    <div className="bigContainer">
      <Header leftIcon="left1" rightIcon="right1" />
      <div className="bookWrapper">
        <img src="/phone.png" alt="phone" />
        <div className="NaverBook_page04">
          <p>아래 내용이 맞는지 확인해주세요</p>

          {/* 예약 정보 요약 */}
          <div className="BookCheck">
            <strong>해봐YOU의원 진료 예약</strong>
            <div className="bookTimeDate">
              <span>일정</span>
              <span>
                {date} ( {slot} ) · {time}
              </span>
            </div>
          </div>

          {/* 진료 목적 선택 - 조건부 강조 (Highlight) */}
          {!medicaPurpose && !medicaRequest && !getIsChallenged() ? (
            <Highlight tooltip="진료 목적을 선택해주세요" color="green">
              <TreatmentPurposeSection />
            </Highlight>
          ) : (
            <TreatmentPurposeSection />
          )}

          {/* 예약자 정보 + 요청사항 입력 */}
          <div className="userInfoSection">
            <h4>예약자 정보</h4>
            <div className="userInfoTop">
              <div>
                <p className="userbirth">
                  생년월일 : {loginedUser.birth || "**-**-**"}
                </p>
                <p className="userphone">
                  전화번호 : {loginedUser.phoneNum || "010-****-****"}
                  <button className="checkBtn">연락처 확인</button>
                </p>
              </div>
              <Button text={"변경"} type={"graySmall"} />
            </div>

            {/* 요청사항 선택 - 조건부 강조 */}
            {medicaPurpose && !medicaRequest && !getIsChallenged() ? (
              <Highlight tooltip="요청사항을 선택해주세요" color="green">
                <RequestDropdown />
              </Highlight>
            ) : (
              <RequestDropdown />
            )}
          </div>

          {/* 안내 문구 */}
          <div className="addNotice">
            실제 방문자가 다르다면 정보를 추가해 주세요.
          </div>

          {/* 뒤로가기/예약신청 버튼 */}
          <div className="bookButtonRow">
            <div className="bookBack">
              <Button text={"이전"} onClick={() => nav("/NaverBook/page03")} />
            </div>

            {/* 예약 버튼 - 미션 모드 아닐 경우 강조 */}
            {medicaPurpose && medicaRequest && !getIsChallenged() ? (
              <Highlight tooltip="예약 신청을 눌러주세요" color="green">
                <div className="agreeAndbookRequest" onClick={fifthPage}>
                  <Button text={"동의하고 예약 신청하기"} />
                </div>
              </Highlight>
            ) : (
              <div className="agreeAndbookRequest" onClick={fifthPage}>
                <Button text={"동의하고 예약 신청하기"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // 진료 목적 체크박스 그룹
  function TreatmentPurposeSection() {
    return (
      <div className="addInfo">
        <h3>추가 정보</h3>
        <div className="medicaTreatmentPurpose">
          <p>진료목적</p>
          <div className="bookCheckBox">
            {[
              "클리닉",
              "도수상담",
              "수액",
              "보건증 발급",
              "진성 간호사와 상담",
            ].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  value={item}
                  onChange={() => handleCheckboxChange(item)}
                  checked={purposeTreatment.includes(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        <NaverMissionButton />
      </div>
    );
  }

  // 요청사항 드롭다운
  function RequestDropdown() {
    return (
      <div className="requestInfo">
        <p className="requestLabel">요청사항</p>
        <select
          className="requestInput"
          value={treatmentRequest}
          onChange={(e) => {
            setTreatmentRequest(e.target.value);
            if (e.target.value) setMedicaRequest(true); // 요청사항 선택되면 상태 true
          }}
        >
          <option value="">요청사항을 선택해주세요.</option>
          <option value="빠른 진료를 원해요">빠른 진료를 원해요</option>
          <option value="조용한 자리를 원해요">조용한 자리를 원해요</option>
          <option value="허리가 아파요">허리가 아파요</option>
        </select>
      </div>
    );
  }
};

export default NaverBook_page04;
