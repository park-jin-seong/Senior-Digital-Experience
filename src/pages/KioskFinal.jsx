import "./KioskFinal.css";
import { useContext, useState } from "react";
import { DataDispatchContext, DataStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const KioskFinal = () => {
  const { loginedId } = useContext(DataStateContext);
  const { getOrderList } = useContext(DataDispatchContext);
  const { getIsChallenged, onUpdate } = useContext(DataDispatchContext); //미션인지 연습인지(현재 false)
  const nav = useNavigate();
  const [showResult, setShowResult] = useState(true);
  const backMenuPage = () => {
    nav("/");
  };

  const orderList = getOrderList();
  let hasDalgona = false;
  let hasCheseCake = false;

  orderList.map((item) => {
    if (item.name === "달고나 라떼" && item.quantity === 1) {
      hasDalgona = true;
    } else if (item.name === "치즈 케이크" && item.quantity === 2) {
      hasCheseCake = true;
    }
  });
  const isHave = hasDalgona && hasCheseCake;
  if (isHave) {
    var mission = loginedId.mission;
    mission[0] = true;
    onUpdate(
      loginedId.id,
      loginedId.phoneNum,
      loginedId.password,
      loginedId.birth,
      mission
    );
  }

  return (
    <>
      <div className="KioskFinal">
        <div className="KIOSKDP4">
          <img className="KIOSKDP4-img" src="/koisk.png" />
          <div className="KioskFInalAllPage">
            <div className="MissionIcon">
              <img
                src={
                  getIsChallenged()
                    ? isHave
                      ? "/icon_friends.png"
                      : "/icon_sad.png"
                    : "/icon_friends.png"
                }
              />
            </div>
            <div className="finalText">
              {getIsChallenged() ? (
                isHave ? (
                  <b>키오스크 미션 성공 🎉</b>
                ) : (
                  <b>키오스크 미션 실패 😣</b>
                )
              ) : (
                <b>연습모드 종료 고생하셨습니다😘</b>
              )}

              {/* {getIsChallenged(true) &&
                (isHave ? (
                  <b>키오스크 미션 성공 🎉</b>
                ) : (
                  <b>키오스크 미션 실패 😣</b>
                ))} */}
            </div>
            <div className="orderListArea">
              {orderList.map((orderItem) => (
                <div className="FinishWarp" key={orderItem.name}>
                  <div className="text-img">
                    <img src={orderItem.image} />
                  </div>
                  <div className="FINISH">
                    {orderItem.name} {orderItem.price}원 {orderItem.quantity}개
                  </div>
                </div>
              ))}
            </div>
            <div className="MoveHome-btn">
              <button className="MOVEHOME" onClick={backMenuPage}>
                홈으로
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KioskFinal;
