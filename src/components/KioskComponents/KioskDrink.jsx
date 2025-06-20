import "./KioskDrink.css";
import { getDrinkImage } from "../../util/cafeMenu_imgesDrink ";

//Drink 메뉴들 출력
const KioskDrink = ({ drinkId, drinkName, onClick }) => {
  return (
    <div className="drink_menu">
      <div className="wrapper">
        <img
          className="drink_img"
          src={getDrinkImage(drinkId)}
          onClick={onClick}
        />
        <div className="drink_name">{drinkName}</div>
      </div>
    </div>
  );
};

export default KioskDrink;
