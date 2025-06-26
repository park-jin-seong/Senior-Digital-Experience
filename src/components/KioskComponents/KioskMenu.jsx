import "./KioskMenu.css";
import "../../components/highlight.css";
import Header from "../../components/Header";
import KioskCoffee from "./KioskCoffee.jsx";
import KioskDrink from "../KioskComponents/KioskDrink.jsx";
import KioskCake from "../KioskComponents/KioskCake.jsx";
import KioskModal from "../KioskComponents/KioskModal.jsx";
import KioskModalPay from "../KioskComponents/KioskModal_pay.jsx";
import KioskOrderCal from "../KioskComponents/KioskOrderCal.jsx";
import { getCoffeeImage } from "../../util/cafeMenu_imgesCoffee";
import { getDrinkImage } from "../../util/cafeMenu_imgesDrink ";
import { getCakeImage } from "../../util/cafeMenu_imgesCake";
import { coffeeList } from "../../util/cafeMenu-coffeeList";
import { drinkList } from "../../util/cafeMenu-drinkList";
import { cakeList } from "../../util/cafeMenu-cakeList";
import { DataDispatchContext } from "../../App.jsx";
import { useState, useContext } from "react";

const KioskMenu = () => {
  const { getIsChallenged } = useContext(DataDispatchContext); //미션인지 연습인지(현재 false)
  const [firstHighlight, setFirstHighlight] = useState(true);
  const [secondHighlight, setSecondHighlight] = useState(false);
  const [threeHighlight, setThreeHighlight] = useState(false);

  //kioskMenu 역할
  //1. 카테고리 선택시 해당 메뉴 띄우기
  //2. 특정 메뉴 선택시 옵션 모달창 띄우기

  //카테고리 선택시 변하는 값을 저장할 state
  const [pickMenu, setPickMenu] = useState("coffee");

  //모달창을 띄우기 위한 state
  const [onModal, setOnModal] = useState(false);

  //결제 모달 띄우기 위한 state
  const [onPayModal, setOnPayModal] = useState(false);

  //선택된 음료의 객체를 저장할 state
  const [selectedItem, setSelectedItem] = useState({});

  //클릭한 음료 객체들 담아두는 리스트
  //orderItems에는 선택한 item -> [{itemId,itemName, itemPrice}]
  const [orderItems, setOrderItems] = useState([]);

  // 선택된 메뉴 주문 정보 객체 전달-------
  const AddToOrder = (itemToAdd) => {
    setOrderItems((oldreItems) => {
      // 선택된 메뉴 아이디 가져오기
      const itemId =
        itemToAdd.coffeeId || itemToAdd.drinkId || itemToAdd.CakeId;
      // 선택된 메뉴 이름 가져오기
      const itemName =
        itemToAdd.coffeeName || itemToAdd.drinkName || itemToAdd.CakeName;
      // 선택된 메뉴 가격 가져오기
      const itemPrice =
        itemToAdd.coffeePrice ||
        itemToAdd.drinkPrice ||
        itemToAdd.cakeListPrice;

      let itemImage = "";
      // 선택된 메뉴 이미지 가져오기
      if (pickMenu === "coffee") {
        itemImage = getCoffeeImage(itemId);
      } else if (pickMenu === "drink") {
        itemImage = getDrinkImage(itemId);
      } else if (pickMenu === "cake") {
        itemImage = getCakeImage(itemId);
      }

      // oldreItems는 클릭한 음료(주문 내역에 있는 음료)
      // 이미 주문 내역에 있는 동일한 아이템인지 확인, 인덱스 반환
      // 이미 있는 아이템(메뉴)이라면 인덱스가 0인 경우 하나 있는 거.
      const sameItemIndex = oldreItems.findIndex(
        (orderItem) => orderItem.id === itemId && orderItem.name === itemName
      );

      //만약 주문리스트에 중복이 없다면 추가
      if (sameItemIndex === -1) {
        const newItem = {
          id: itemId,
          name: itemName,
          price: itemPrice,
          quantity: 1,
          totalPrice: itemPrice, //totalPrice는 총 금액 itemPrice는 메뉴 하나의 금액
          image: itemImage,
          type: pickMenu,
        };

        return [
          ...oldreItems, // 기존 아이템 유지
          newItem,
        ];

        // 중복이 있다면 수량과 가격만! 증가
      } else {
        // 기존의 배열 유지
        const changeItems = [...oldreItems];
        // 해당 인덱스에 있는 메뉴의 요소 변경(수량과 가격만)
        changeItems[sameItemIndex] = {
          ...changeItems[sameItemIndex],
          quantity: changeItems[sameItemIndex].quantity + 1,
          totalPrice: changeItems[sameItemIndex].totalPrice + itemPrice,
        };
        return changeItems;
      }
    });
  };
  //AddToOrder함수 끝-----

  //주문 내역 메뉴의의 수량과 금액 증가 함수
  const orderNumPlus = (orderItemId, orderItemName) => {
    setOrderItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (item) => item.id === orderItemId && item.name === orderItemName
      );

      //아이템 존재 유무 확인
      if (itemIndex > -1) {
        //이전 배열 가져오기 (수량, 금액 추가한 새로운 객체 생성)
        const changeItems = [...prevItems];
        //현재 아이템의 객체 정보
        const currentItem = changeItems[itemIndex];

        const newQuantity = currentItem.quantity + 1;
        const newTotalPrice = currentItem.totalPrice + currentItem.price; //AddToOrder 에 저장되어있는 메뉴 하나 가격

        // 가격, 수량 추가한 새로운 객체 생성
        changeItems[itemIndex] = {
          ...currentItem,
          quantity: newQuantity,
          totalPrice: newTotalPrice,
        };
        //가격, 수량 변경된 배열반환->orderItems 상태 업데이트
        return changeItems;
      }
      return prevItems;
    });
  };

  // 수량감소 함수
  const orderNumMinus = (orderItemId, orderItemName) => {
    // prevItems는 선택된 메뉴 배열들의 객체(요소)
    setOrderItems((prevItems) => {
      const index = prevItems.findIndex(
        (item) => item.id === orderItemId && item.name === orderItemName
      );

      //리스트에 메뉴가 없으면 기존의 메뉴 반환
      if (index === -1) {
        return prevItems;
      }

      //아래 prevItems 직접 변경하면 안된다고 함 복사본을 만듦
      const changeItems = [...prevItems];
      //해당 메뉴가 존재한다면 그 메뉴 정보 가져오기
      const currentItem = changeItems[index];

      // 해당 메뉴의 수량 계산하기
      const newQuantity = currentItem.quantity - 1;

      // 수량 -1했는데 0이하라면 해당 메뉴 제외하고 새로운 배열 반환
      if (newQuantity <= 0) {
        //previtem는 prevItems의 객체
        return prevItems.filter(
          (previtem, prevItemsIndex) => prevItemsIndex !== index
        );
      }
      changeItems[index] = {
        ...currentItem, // 기존 메뉴의 이름, ID, 이미지 등은 그대로 유지
        quantity: newQuantity, // 새 수량 적용
        totalPrice: currentItem.totalPrice - currentItem.price, // 새 총 가격 적용
      };
      return changeItems;
    });
  };

  const ItemClick = (item) => {
    setSelectedItem(item); // 클릭된 아이템 정보 저장
    setOnModal(true); // 모달 열기
  };

  // 주문 하기 함수
  const changeMenu = () => {
    if (pickMenu === "coffee") {
      return coffeeList.map((item) => (
        <KioskCoffee
          key={item.coffeeId}
          coffeeId={item.coffeeId}
          coffeeName={item.coffeeName}
          onClick={() => ItemClick(item)}
        />
      ));
    } else if (pickMenu === "drink") {
      return drinkList.map((item) => (
        <KioskDrink
          key={item.drinkId}
          drinkId={item.drinkId}
          drinkName={item.drinkName}
          onClick={() => ItemClick(item)}
        />
      ));
    } else if (pickMenu === "cake") {
      return cakeList.map((item) => (
        <KioskCake
          key={item.CakeId}
          CakeId={item.CakeId}
          CakeName={item.CakeName}
          onClick={() => ItemClick(item)}
        />
      ));
    }
    return null;
  };
  return (
    <>
      <Header leftIcon="left2" rightIcon="right2" />

      <div className="KIoskDisplay">
        {/* 모달창 css 적용을 위한 조건문 */}
        <div className="AllDisplay">
          <div className="MenuBar">
            {/* 메뉴바 버튼 클릭시 pickMenu 값 변경 */}
            <button
              className="button_coffee"
              onClick={() => {
                setPickMenu("coffee");
              }}
            >
              커피
            </button>
            <button
              className="button_drink"
              onClick={() => {
                setPickMenu("drink");
              }}
            >
              음료
            </button>
            <button
              className="button_cake"
              onClick={() => {
                setPickMenu("cake");
              }}
            >
              케이크
            </button>
          </div>
          {getIsChallenged() || !firstHighlight ? (
            ""
          ) : (
            <div className={`tooltipMenu`}>메뉴를 선택해 주세요</div>
          )}
          <div
            className={
              getIsChallenged() || !firstHighlight
                ? "coffee_menuDISPLAY"
                : "coffee_menuDISPLAY highlightMenu"
            }
          >
            {changeMenu()}
            {getIsChallenged() || !secondHighlight ? (
              ""
            ) : (
              <div className={`tooltipMenu down`}>
                수량을 확인하고, 주문하기 버튼을 눌러주세요
              </div>
            )}
          </div>
          <div className="KIOSKDP1">
            <img src="/koisk.png" />
          </div>
        </div>

        <div>
          {onModal &&
            selectedItem && ( // selectedItem이 null이 아닐 때만 모달 렌더링
              <KioskModal
                selectedItem={selectedItem} //선택된 메뉴 정보 객체
                pickMenu={pickMenu} //선택된 메뉴의 카테고리 (커피, 음료, 디저트 중 하나)
                setOnModal={setOnModal} // 모달 닫기 용도로 전달
                onAddToOrder={AddToOrder} // 주문 추가 함수 전달
                setFirstHighlight={setFirstHighlight} //첫번째 하이라이트 조절
                setSecondHighlight={setSecondHighlight} //두번째 하이라이트 조절
              />
            )}
        </div>

        <div>
          {onPayModal && selectedItem && (
            <KioskModalPay
              setOnPayModal={setOnPayModal}
              orderItems={orderItems}
              setSecondHighlight={setSecondHighlight}
              threeHighlight={threeHighlight}
              setThreeHighlight={setThreeHighlight}
            />
          )}
        </div>

        {/* 주문 내역 채우기 및 계산 */}
        <div className="ORDERlIST">
          <KioskOrderCal
            orderItems={orderItems}
            setOrderItems={setOrderItems}
            setOnModal={setOnModal}
            setOnPayModal={setOnPayModal}
            orderNumPlus={orderNumPlus}
            orderNumMinus={orderNumMinus}
            setFirstHighlight={setFirstHighlight}
            setSecondHighlight={setSecondHighlight}
            secondHighlight={secondHighlight}
            setThreeHighlight={setThreeHighlight}
            threeHighlight={threeHighlight}
          />
        </div>
      </div>
    </>
  );
};

export default KioskMenu;
