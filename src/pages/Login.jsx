import "./Login.css";
import Logo from "../components/Logo";
import { useContext, useRef, useState } from "react";
import Button from "../components/Button";
import { DataStateContext } from "../App";
import { DataDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const userState = useContext(DataStateContext);
  const { onLogin } = useContext(DataDispatchContext);
  const phoneNumValue = useRef("");
  const passwordValue = useRef("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginOnClick = () => {
    if (phoneNum === "ADMIN" && password === "ADMIN1234") {
      onLogin(phoneNum);
      alert("관리자 계정으로 로그인 하셨습니다.");
      navigate("/");
      return;
    }
    const userFound = userState.data.find(
      (value) => value.phoneNum === phoneNum && value.password === password
    );
    if (userFound) {
      alert("당신의 도전을 응원합니다!");
      onLogin(userFound);
      navigate("/", { replace: true });
    } else {
      const phoneNumExists = userState.data.some(
        (value) => value.phoneNum === phoneNum
      );
      if (phoneNumExists) {
        passwordValue.current.focus();
        alert("비밀번호를 확인해주세요!");
      } else {
        phoneNumValue.current.focus();
        alert("가입된 정보가 없습니다. 회원가입을 진행 해주세요!");
      }
    }
  };
  const newAccountOnClick = () => {
    navigate("/NewAccount", { replace: true });
  };
  return (
    <div className="Login">
      <Logo />
      <div className="login-wrapper">
        <input
          ref={phoneNumValue}
          type="text"
          placeholder="휴대폰 번호"
          value={phoneNum}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              loginOnClick();
            }
          }}
          onChange={(event) => {
            setPhoneNum(event.target.value);
          }}
        />
        <input
          ref={passwordValue}
          type="password"
          placeholder="비밀번호"
          value={password}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              loginOnClick();
            }
          }}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="button-group">
          <Button text={"로그인"} onClick={loginOnClick}></Button>
          <Button text={"회원가입"} onClick={newAccountOnClick}></Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
