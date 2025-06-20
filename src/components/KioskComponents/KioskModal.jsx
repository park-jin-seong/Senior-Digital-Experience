import "./KioskModal.css";
import { getCoffeeImage } from "../../util/cafeMenu_imgesCoffee";
import { getCakeImage } from "../../util/cafeMenu_imgesCake";
import { getDrinkImage } from "../../util/cafeMenu_imgesDrink ";
const KioskModal = ({
  selectedItem,
  pickMenu,
  setOnOptionModal,
  onAddToOrder,
}) => {
  // 커피, 음료, 케이크에 따라 리스트 값 불러오고 화면에 뿌림
  const menuDetail = () => {
    if (pickMenu === "coffee") {
      return (
        <div>
          이름:{selectedItem.coffeeName} 가격:{selectedItem.coffeePrice}
          {<img src={getCoffeeImage(selectedItem.coffeeId)} />}
        </div>
      );
    } else if (pickMenu === "drink") {
      return (
        <div>
          이름:{selectedItem.drinkName} 가격:{selectedItem.drinkPrice}
          {<img src={getDrinkImage(selectedItem.drinkId)} />}
        </div>
      );
    } else if (pickMenu === "cake") {
      return (
        <div>
          이름:{selectedItem.CakeName} 가격:{selectedItem.cakePrice}
          {<img src={getCakeImage(selectedItem.CakeId)} />}
        </div>
      );
    }
    return null;
  };
  //담기버튼 클릭시 모달 닫힘
  const MenuAdd = () => {
    onAddToOrder(selectedItem); // 선택된 메뉴 주문 정보 객체 전달
    setOnOptionModal(false);
  };
  //닫기버튼 클릭시 모달 닫힘
  const closeModal = () => {
    setOnOptionModal(false);
  };

  return (
    <div className="modal">
      <div className="modalBody">
        <div className="modalOption"> 옵션선택</div>
        <div className="modalDetail">{menuDetail()}</div>
        <div className="madalOptionDetail">
          음료 옵션선택(온도, 사이즈, 포장)
          <button>온도</button>
          <button>사이즈</button>
          <button>포장</button>
        </div>
        <button onClick={MenuAdd}>담기</button>
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
};
export default KioskModal;
