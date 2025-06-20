import "./Kiosk.css";
import Header from "../components/Header";
import Button from "../components/Button";
import KioskMenu from "../components/KioskComponents/KioskMenu";
import { useNavigate } from "react-router-dom";

const Kiosk = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="KioskDisplay">
        <div className="ControlBar">
          <Header
            title={"로고 넣기"}
            rightChild={
              <Button
                onClick={() => {
                  nav("/");
                }}
                text={"홈으로"}
                type={"home"}
              />
            }
          />
        </div>

        <div className="KioskMenuDisplay">
          <KioskMenu />
        </div>
      </div>
    </>
  );
};

export default Kiosk;
