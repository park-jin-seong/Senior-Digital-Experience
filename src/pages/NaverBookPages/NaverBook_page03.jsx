import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import "./NaverBook_page03.css";
import { useState, useContext } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Highlight from "../../components/highlight"; // 강조 컴포넌트
import { DataDispatchContext } from "../../App"; // 미션 모드 확인용 context

const NaverBook_page03 = () => {
  const nav = useNavigate();
  const { getIsChallenged } = useContext(DataDispatchContext); // 미션 모드 여부 확인

  // 날짜, 시간, 현재 기준 월 저장 상태
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // 현재 연도와 월 정보
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 달력 시작 날짜 계산 (해당 월의 첫 날에서 일요일까지 포함)
  const firstDayOfMonth = new Date(year, month, 1); // 1은 그 달의 1일을 의미
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(1 - firstDayOfMonth.getDay()); // 그 달 1일이 무슨 요일인지 알려준다.

  // 달력 끝 날짜 계산 (해당 월의 마지막 날에서 토요일까지 포함)
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  // 날짜들을 주 단위로 그룹화
  const groupDatesByWeek = (start, end) => {
    const weeks = []; // 결과를 담을 배열 (주 단위 묶음)
    let currentWeek = []; // 현재 주에 해당하는 7일 묶음
    let current = new Date(start); // 현재 날짜 (반복하면서 이동)
    while (current <= end) {
      currentWeek.push(new Date(current)); // 현재 날짜를 현재 주에 추가
      if (currentWeek.length === 7) {
        weeks.push(currentWeek); // 7일 모이면 주 배열에 추가
        currentWeek = []; // 다음 주를 위한 배열 초기화
      }
      current.setDate(current.getDate() + 1); // 다음 날짜로 이동
    }
    return weeks; // 전체 주 배열 반환
  };

  // 오늘 이전 날짜인지 확인 (선택 불가하도록 막기)
  const isPastDate = (date) => {
    const today = new Date();
    //  시간을 00:00:00.000으로 초기화
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const weeks = groupDatesByWeek(startDay, endDay); // 실제 달력에 그릴 날짜 그룹

  // 이전 달 보기
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // 다음 달 보기
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // 다음 페이지로 이동하며 날짜, 시간 전달
  const forthPage = () => {
    if (selectedDate && selectedTime) {
      nav("/NaverBook/page04", {
        state: {
          date: selectedDate.toLocaleDateString("sv-SE"), // ISO 형식 날짜 ("YYYY-MM-DD")
          time: selectedTime,
        },
      });
    } else {
      alert("날짜와 시간을 선택해주세요!");
    }
  };

  return (
    <div className="bigContainer">
      <Header leftIcon="left1" rightIcon="right1" />
      <div className="bookWrapper">
        <img src="/phone.png" alt="phone" />
        <div className="NaverBook_page03">
          {/* 병원 소개 카드 */}
          <div className="thirdBookDiv">
            <h3>해봐YOU의원_네이버예약</h3>
            <p>
              해봐YOU의원 네이버 예약입니다. 간편하게 예약하고 문의해주세요.
              감사합니다.
            </p>
          </div>

          {/* 예약, 상세정보, 리뷰 버튼 */}
          <div className="action-buttons">
            <div className="reserveBtn">
              <Button text="예약하기" />
            </div>
            <div className="otherBtn">
              <Button text="상세정보" />
            </div>
            <div className="otherBtn">
              <Button text="리뷰" />
            </div>
          </div>

          {/* 날짜 선택 달력 */}
          <div className="allCalendar">
            <h3>날짜와 시간을 선택해주세요</h3>

            {/* 달력 헤더 (년/월 + 이전/다음 버튼) */}
            <div className="calendar">
              <div className="calendarHeader">
                <button onClick={handlePrevMonth}>◀</button>
                {year}.{month + 1}
                <button onClick={handleNextMonth}>▶</button>
              </div>

              {/* 요일 라벨 */}
              <div className="calendarWeek">
                {["일", "월", "화", "수", "목", "금", "토"].map(
                  (day, index) => (
                    <div className="weekday" key={index}>
                      {day}
                    </div>
                  )
                )}
              </div>

              {/* 날짜 목록: 미션 모드 X + 미선택 시 강조 */}
              {!selectedDate && !selectedTime && !getIsChallenged() ? (
                <Highlight tooltip="날짜를 선택해주세요" color="green">
                  <div className="calendarDay">
                    {/* map()으로 각 주, 각 날짜를 반복 렌더링 */}
                    {weeks.map((week, weekIndex) => (
                      <div className="week" key={weekIndex}>
                        {week.map((date, dayIndex) => {
                          const isSelected =
                            selectedDate &&
                            date.toDateString() === selectedDate.toDateString();
                          const isPast = isPastDate(date);

                          return (
                            <div
                              key={dayIndex}
                              className={`day ${isSelected ? "selected" : ""} ${
                                isPast ? "past" : ""
                              }`}
                              onClick={() => {
                                if (!isPast) setSelectedDate(date);
                              }}
                            >
                              {date.getDate()}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </Highlight>
              ) : (
                // 선택된 날짜 렌더링
                <div className="calendarDay">
                  {weeks.map((week, weekIndex) => (
                    <div className="week" key={weekIndex}>
                      {week.map((date, dayIndex) => {
                        const isSelected =
                          selectedDate &&
                          date.toDateString() === selectedDate.toDateString();
                        const isPast = isPastDate(date);

                        return (
                          <div
                            key={dayIndex}
                            className={`day ${isSelected ? "selected" : ""} ${
                              isPast ? "past" : ""
                            }`}
                            onClick={() => {
                              if (!isPast) setSelectedDate(date);
                            }}
                          >
                            {date.getDate()}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 시간 선택 영역 */}
          {/* 미션 모드 X + 날짜만 선택된 경우 강조 */}
          {selectedDate && !selectedTime && !getIsChallenged() ? (
            <Highlight tooltip="시간을 선택해주세요" color="green">
              <TimeSelection
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            </Highlight>
          ) : (
            <TimeSelection
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          )}

          {/* 다음 단계 버튼 + 조건부 하이라이트 */}
          <div className="nextButton">
            <div className="toolTipButton">
              <Button text="💬" />
            </div>

            {selectedDate && selectedTime && !getIsChallenged() ? (
              <Highlight tooltip="다음 단계로 이동해주세요" color="green">
                <div className="forthPageButton" onClick={forthPage}>
                  <Button text="다음 단계" />
                </div>
              </Highlight>
            ) : (
              <div className="forthPageButton" onClick={forthPage}>
                <Button text="다음 단계" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 시간 선택 부분을 컴포넌트로 분리 (오전/오후 버튼)
const TimeSelection = ({ selectedTime, setSelectedTime }) => (
  <div className="clockbutton">
    <div className="timeBlock">
      <p className="timeLabel">오전</p>
      <div className="timeGroup">
        {["9:00", "9:30", "10:00", "10:30", "11:00", "11:30"].map(
          (time, index) => (
            <button
              key={index}
              className={`timeButton ${
                selectedTime === time ? "selected" : ""
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          )
        )}
      </div>
    </div>
    <div className="timeBlock">
      <p className="timeLabel">오후</p>
      <div className="timeGroup">
        {[
          "12:00",
          "12:30",
          "13:00",
          "13:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30",
          "17:00",
          "17:30",
          "18:00",
        ].map((time, index) => (
          <button
            key={index}
            className={`timeButton ${selectedTime === time ? "selected" : ""}`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default NaverBook_page03;
