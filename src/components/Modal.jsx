import "./Modal.css";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { DataDispatchContext } from "../App";
import { DataStateContext } from "../App";

export const Modal = ({ setModal }) => {
  const { onCreateCommunity } = useContext(DataDispatchContext);
  const { loginedId } = useContext(DataStateContext);

  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    loginedId === "ADMIN" && setUserName("관리자");
  }, []);

  const handleCreateContent = () => {
    if (!title.trim() || !userName.trim() || !text.trim()) {
      // 입력값 유효성 검사
      alert("모든 입력란을 채워주세요!");
      return;
    }
    const createDate = new Date().toLocaleDateString();

    onCreateCommunity(title, loginedId, userName, createDate, text);
    setModal(false); // 모달 닫기
    alert("글 작성을 완료했습니다!");
  };

  return (
    <div className="Overlay">
      <div className="container">
        <div className="modal-header">
          <div className="title">
            <input
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="userName">
            <input
              id="userName"
              placeholder="닉네임"
              value={userName}
              disabled={loginedId === "ADMIN"}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
        <div className="text">
          <textarea
            placeholder="문의사항이나 건의사항을 입력해주세요"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <Button
          type={"cancle"}
          text={"취소"}
          onClick={() => {
            setModal(false);
          }}
        />

        <Button
          onClick={handleCreateContent}
          text={"글 추가"}
          type={"add-content"}
        />
      </div>
    </div>
  );
};
