import "./KioskCoffee.css";
import { getCoffeeImage } from "../../util/cafeMenu_imgesCoffee";

//Coffee 메뉴들 출력
const KioskCoffee = ({ coffeeId, coffeeName, onClick }) => {
  //모달창 띄우기 현재 켜지지 않은 상태

  return (
    <div className="coffee_Menu">
      <div className="wrapper">
        {/* 이미지 클릭시 해당 정보 modal로 전달..? */}
        <img
          className="coffee_img"
          src={getCoffeeImage(coffeeId)}
          onClick={onClick}
        />
        <div className="coffee_name"> {coffeeName}</div>
      </div>
    </div>
  );
};

export default KioskCoffee;
