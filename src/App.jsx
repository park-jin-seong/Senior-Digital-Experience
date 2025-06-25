import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewAccount from "./pages/NewAccount";
import MyPage from "./pages/MyPage";
import Map from "./pages/Map";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import KioskStart from "./pages/Kiosk_Start";
import Kiosk from "./pages/Kiosk";
import KioskPayMent from "./pages/KioskPayMent";
import Kiosk_CardPayMent from "./pages/Kiosk_CardPayMent";
import KioskFinal from "./pages/KioskFinal";
import { Routes, Route, useNavigate } from "react-router-dom";
import { createContext } from "react";
import { useEffect, useReducer, useRef, useState } from "react";
import NaverBook_page01 from "./pages/NaverBookPages/NaverBook_page01";
import NaverBook_page02 from "./pages/NaverBookPages/NaverBook_page02";
import NaverBook_page03 from "./pages/NaverBookPages/NaverBook_page03";
import NaverBook_page04 from "./pages/NaverBookPages/NaverBook_page04";
import NaverBook_page05 from "./pages/NaverBookPages/NaverBook_page05";
import Community_content from "./pages/Community_content";
import StampPopup from "./components/StampPopup";

// 사용자 관리 reducer
function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      nextState = [action.data, ...state];
      break;
    case "UPDATE":
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    case "DELETE":
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    default:
      return state;
  }
  localStorage.setItem("UserStatus", JSON.stringify(nextState));
  return nextState;
}

// 게시글 관리 reducer
function communityReducer(state, action) {
  let nextState;
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      nextState = [action.data, ...state];
      break;
    case "UPDATE":
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id)
          ? { ...item, answer: action.data.answer }
          : item
      );
      break;
    case "DELETE":
      nextState = state.filter(
        (item) => String(item.id) !== String(action.data.id)
      );
      break;
    default:
      return state;
  }
  localStorage.setItem("CommunityData", JSON.stringify(nextState));
  return nextState;
}

export const DataStateContext = createContext();
export const DataDispatchContext = createContext();

// 휴대폰 번호 정규식
const phoneNumPattern =
  /^01(?:0|1|[6-9])(?:-|\s)?(?:\d{3}|\d{4})(?:-|\s)?\d{4}$/;

function App() {
  const nav = useNavigate();
  const [isLogin, setIslogin] = useState("");
  const [loginedId, setLoginedId] = useState(null);
  const kioskIsChallenged = useRef(false);
  const naverBookIsChallenged = useRef(false);
  const orderList = useRef([]);

  const getOrderList = () => {
    return orderList.current;
  };

  const setOrderList = (tempOrderList) => {
    orderList.current = tempOrderList;
  };

  const getIsChallenged = (ChallengeType) => {
    if (ChallengeType === "Kiosk") {
      return kioskIsChallenged.current;
    }
    return naverBookIsChallenged.current;
  };

  const setIsChallenged = (ChallengeType, isChallenged) => {
    if (ChallengeType === "Kiosk") {
      kioskIsChallenged.current = isChallenged;
    }
    naverBookIsChallenged.current = isChallenged;
  };

  // 사용자 mockData
  const mockData = [{ id: 0, phoneNum: "ADMIN", password: "ADMIN1234" }];

  // 게시글 mockData
  const generateCommunityMockData = (count) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
      data.push({
        id: i, // 커뮤니티 게시글 구분 key
        title: `게시물 제목 ${i}`,
        author: "ADMIN",
        userName: `사용자${i}`,
        date: `2025-06-${String(Math.floor(Math.random() * 30) + 1).padStart(
          2,
          "0"
        )}`, // 랜덤 날짜
        text: `안녕하세요, ${i}번째 게시물 내용입니다.`,
        answer: "", // 답변 상태
      });
    }
    return data;
  };

  // 원하는 게시물 수 설정
  const numberOfPosts = 0;
  const communityMockData = generateCommunityMockData(numberOfPosts);

  // 사용자
  const [data, dispatch] = useReducer(reducer, []);
  // 커뮤니티
  const [communityData, setCommunityData] = useReducer(communityReducer, []);

  const [isLoading, setIsLoading] = useState(true);
  const userIdRef = useRef(1);
  const communityIdRef = useRef(0);

  useEffect(() => {
    // 1. 사용자 데이터 로드 및 초기화
    const storedUserData = localStorage.getItem("UserStatus");
    if (!storedUserData || JSON.parse(storedUserData).length === 0) {
      dispatch({ type: "INIT", data: mockData });
      const maxMockUserId = mockData.reduce(
        (max, item) => Math.max(max, item.id),
        0
      );
      userIdRef.current = maxMockUserId + 1;
      localStorage.setItem("UserStatus", JSON.stringify(mockData));
    } else {
      const parsedUserData = JSON.parse(storedUserData);
      const maxStoredUserId = parsedUserData.reduce(
        (max, item) => Math.max(max, item.id),
        0
      );
      userIdRef.current = maxStoredUserId + 1;
      dispatch({ type: "INIT", data: parsedUserData });
    }

    // 2. 커뮤니티 데이터 로드 및 초기화
    const storedCommunityData = localStorage.getItem("CommunityData");
    if (!storedCommunityData || JSON.parse(storedCommunityData).length === 0) {
      setCommunityData({ type: "INIT", data: communityMockData });
      const maxMockCommunityId = communityMockData.reduce(
        (max, item) => Math.max(max, item.id),
        0
      );
      communityIdRef.current = maxMockCommunityId + 1;
      localStorage.setItem("CommunityData", JSON.stringify(communityMockData));
    } else {
      const parsedCommunityData = JSON.parse(storedCommunityData);
      const maxStoredCommunityId = parsedCommunityData.reduce(
        (max, item) => Math.max(max, item.id),
        0
      );
      communityIdRef.current = maxStoredCommunityId + 1;
      setCommunityData({ type: "INIT", data: parsedCommunityData });
    }

    setIsLoading(false); // 모든 데이터 로드/초기화 완료 후 로딩 상태 해제
  }, []);

  // 커뮤니티 관리기능
  const onCreateCommunity = (title, author, userName, date, text) => {
    setCommunityData({
      type: "CREATE",
      data: {
        id: communityIdRef.current++,
        author,
        title,
        userName,
        date,
        text,
        answer: "",
      },
    });
  };

  const onUpdateCommunity = (contentID, answer) => {
    setCommunityData({
      type: "UPDATE",
      data: {
        id: contentID,
        answer,
      },
    });
  };

  const onDeleteCommunityContent = (contentID) => {
    setCommunityData({
      type: "DELETE",
      data: {
        id: contentID,
      },
    });
  };

  // 유저 관리기능
  const onCreate = (phoneNum, password, birth, isUserAgree, isUserConsent) => {
    // 현재 날짜 밀리세컨드로 가져오기
    const currentDate = Date.now();

    if (!isUserAgree || !isUserConsent) {
      alert("필수사항을 동의해주세요!");
      return;
    }

    if (!Number(phoneNum)) {
      alert("전화번호는 숫자만 입력해주세요!");
      return;
    }

    if (!phoneNumPattern.test(phoneNum)) {
      alert("전화번호를 다시 확인해주세요!");
      return;
    }

    if (new Date(birth).getTime() > currentDate) {
      alert("생년월일을 다시한번 확인해주세요!");
      return;
    }

    if (data.find((item) => String(item.phoneNum) === String(phoneNum))) {
      alert("이미 가입된 전화번호입니다.");
      return;
    }
    if (phoneNum && password && birth) {
      var mission = [false, false];
      dispatch({
        type: "CREATE",
        data: {
          id: userIdRef.current++,
          phoneNum,
          password,
          birth,
          mission,
        },
      });
      alert("계정이 생성되었습니다.");
      nav("/");
    } else {
      alert("입력란을 채워주세요!");
    }
  };

  const onUpdate = (id, phoneNum, password, birth, mission) => {
    loginedId.id = id;
    loginedId.phoneNum = phoneNum;
    loginedId.password = password;
    loginedId.birth = birth;
    loginedId.mission = mission;
    dispatch({
      type: "UPDATE",
      data: {
        id: id,
        phoneNum,
        password,
        birth,
        mission,
      },
    });
  };
  const onDelete = (id) => {
    let idCommunity = [];
    communityData.map((item) => {
      if (item.author.id === id) {
        idCommunity = [...idCommunity, item.id];
      }
    });
    idCommunity.map((id) => {
      onDeleteCommunityContent(id);
    });
    dispatch({
      type: "DELETE",
      id,
    });
  };
  const onLogin = (id) => {
    setLoginedId(id);
    if (id === "ADMIN") {
      setIslogin("ADMIN");
      return;
    }
    setIslogin("LOGIN");
  };
  const onLogout = () => {
    setLoginedId(null);
    setIslogin("");
  };

  if (isLoading) {
    return <div>데이터를 로드하는 중입니다...</div>;
  }
  return (
    <>
      <DataStateContext.Provider
        value={{ data, communityData, isLogin, loginedId }}
      >
        <DataDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
            onLogin,
            onLogout,
            onCreateCommunity,
            onDeleteCommunityContent,
            onUpdateCommunity,
            getIsChallenged,
            setIsChallenged,
            getOrderList,
            setOrderList,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/NewAccount" element={<NewAccount />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/Kiosk" element={<KioskStart />}></Route>
            <Route path="/Kiosk/:1" element={<Kiosk />}></Route>
            <Route path="/KioskPay" element={<KioskPayMent />}></Route>
            <Route path="/KioskCardPay" element={<Kiosk_CardPayMent />}></Route>
            <Route path="/KioskFinal" element={<KioskFinal />}></Route>
            <Route
              path="/NaverBook/page01"
              element={<NaverBook_page01 />}
            ></Route>
            <Route
              path="/NaverBook/page02"
              element={<NaverBook_page02 />}
            ></Route>
            <Route
              path="/NaverBook/page03"
              element={<NaverBook_page03 />}
            ></Route>
            <Route
              path="/NaverBook/page04"
              element={<NaverBook_page04 />}
            ></Route>
            <Route
              path="/NaverBook/page05"
              element={<NaverBook_page05 />}
            ></Route>
            <Route path="/Map" element={<Map />} />
            <Route path="/Community" element={<Community />} />
            <Route
              path="/Community_content/:id"
              element={<Community_content />}
            />
            <Route path="/popup" element={<StampPopup />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </DataDispatchContext.Provider>
      </DataStateContext.Provider>
    </>
  );
}

export default App;
