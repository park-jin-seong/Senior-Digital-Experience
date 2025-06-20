import { useNavigate } from "react-router-dom";
import "./NaverBook_page03.css";
import { useState } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";

const NaverBook_page03 = () => {
  const nav = useNavigate();

  // 시간, 날짜 관련 usestate
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(1 - firstDayOfMonth.getDay());
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  const groupDatesByWeek = (start, end) => {
    const weeks = [];
    let currentWeek = [];
    let current = new Date(start);
    while (current <= end) {
      currentWeek.push(new Date(current));
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      current.setDate(current.getDate() + 1);
    }
    return weeks;
  };

  const weeks = groupDatesByWeek(startDay, endDay);

  // 달을 이전 달로 넘기는 함수
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // 달을 다음 달로 넘기는 함수
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // 날짜와 시간 선택해야 페이지 4로 넘어감
  const forthPage = () => {
    if (selectedDate && selectedTime) {
      nav("/NaverBook/page04", {
        state: {
          date: selectedDate.toISOString().slice(0, 10),
          time: selectedTime,
        },
      });
    } else {
      alert("날짜와 시간을 선택해주세요!");
    }
  };

  return (
    <div className="bigContainer">
      <Header />
      <div className="bookWrapper">
        <img src="/phone.png" alt="phone" />
        <div className="NaverBook_page03">
          <div className="thirdBookDiv">
            <h3>해봐YOU의원_네이버예약</h3>
            <p>
              해봐YOU의원 네이버 예약입니다. 간편하게 예약하고 문의해주세요.
              감사합니다.
            </p>
          </div>

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

          <div className="allCalendar">
            <h3>날짜와 시간을 선택해주세요</h3>
            <div className="calendar">
              <div className="calendarHeader">
                <button onClick={handlePrevMonth}>◀</button>
                {year}.{month + 1}
                <button onClick={handleNextMonth}>▶</button>
              </div>
              <div className="calendarWeek">
                {["일", "월", "화", "수", "목", "금", "토"].map(
                  (day, index) => (
                    <div className="weekday" key={index}>
                      {day}
                    </div>
                  )
                )}
              </div>
              <div className="calendarDay">
                {weeks.map((week, weekIndex) => (
                  <div className="week" key={weekIndex}>
                    {week.map((date, dayIndex) => {
                      const isSelected =
                        selectedDate &&
                        date.getDate() === selectedDate.getDate() &&
                        date.getMonth() === selectedDate.getMonth() &&
                        date.getFullYear() === selectedDate.getFullYear();
                      return (
                        <div
                          key={dayIndex}
                          className={`day ${isSelected ? "selected" : ""}`}
                          onClick={() => setSelectedDate(date)}
                        >
                          {date.getDate()}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                    className={`timeButton ${
                      selectedTime === time ? "selected" : ""
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="nextButton">
            <div className="toolTipButton">
              <Button className="menuBtn" text="💬" />
            </div>
            <div className="forthPageButton" onClick={forthPage}>
              <Button className="menuBtn" text="다음 단계" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaverBook_page03;
