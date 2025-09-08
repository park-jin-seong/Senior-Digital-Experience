import { useContext, useMemo, useState } from "react";
import MissionPopup from "../MissionPopup.jsx";
import { DataDispatchContext } from "../../App";
import "./NaverMissionButton.css";

const NaverMissionButton = () => {
  const ctx = useContext(DataDispatchContext);
  const getIsChallenged =
    ctx && typeof ctx.getIsChallenged === "function"
      ? ctx.getIsChallenged
      : null;

  const [open, setOpen] = useState(false);

  const message = useMemo(() => {
    return (
      <span>
        <span className="redHighlight">
          {sessionStorage.getItem("missionDate") || ""}
        </span>
        ,{" "}
        <span className="redHighlight">
          {sessionStorage.getItem("missionTime") || "14:30"}
        </span>
        <br />
        진료 목적은{" "}
        <span className="redHighlight">
          {sessionStorage.getItem("missionPurpose") || "보건증 발급"}
        </span>
        으로,
        <br />
        요청사항에는{" "}
        <span className="redHighlight">
          {sessionStorage.getItem("missionRequest") || "빠른 진료를 원해요"}
        </span>
        로,
        <br />
        병원 예약 부탁해~
      </span>
    );
  }, [open]);

  const shouldShow = getIsChallenged ? !!getIsChallenged() : true;
  if (!shouldShow) return null;

  return (
    <>
      <button
        type="button"
        className="naver-mission-btn"
        onClick={() => setOpen(true)}
      >
        힌트
      </button>

      {open && (
        <MissionPopup message={message} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

export default NaverMissionButton;
