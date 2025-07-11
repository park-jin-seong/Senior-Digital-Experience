import "./KioskCake.css";
import { getCakeImage } from "../../util/cafeMenu_imgesCake";

//Cake 메뉴들 출력
const KioskCake = ({ CakeId, CakeName, onClick }) => {
  return (
    <div className="cake_menu">
      <div className="wrapper">
        <img
          className="cake_img"
          src={getCakeImage(CakeId)}
          onClick={onClick}
        />
        <div className="cake_name">{CakeName}</div>
      </div>
    </div>
  );
};

export default KioskCake;
