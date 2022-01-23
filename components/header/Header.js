import React, {useEffect, useState} from 'react';

// styles
import styles from './scss/Header.module.scss';

// assets
import Logo from './assets/logo.svg';

function Header() {
  const [timerInterval, setTimerInterval] = useState();
  const [dpTimer, setDpTimer] = useState();

  useEffect(() => {
    timer.start();

    return () => {
      timer.stop();
    };
  }, []);

  /**
   * 시간에 관한 유틸리티 함수
   */
  const timer = {
    /**
     * 1초마다 화면을 시간을 업데이트 해주어 화면을 리렌더링 해주기 위한 interval 함수
     */
    start: () => {
      if (timerInterval) timer.stop();

      timer.update();

      setTimerInterval(
        setInterval(() => {
          timer.update();
        }, 1000),
      );
    },
    /**
     * 화면에 보여줄 시간 포맷을 업데이트 해주는 함수
     */
    update: () => {
      setDpTimer(timer.toLocaleString());
    },
    /**
     * 화면에 보여줄 시간 포맷으로 가공해주는 함수
     * @returns { object }
     */
    toLocaleString: () => {
      const dateObj = new Date();

      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const date = dateObj.getDate();
      const hour =
        dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours();
      const minute =
        dateObj.getMinutes() < 10
          ? `0${dateObj.getMinutes()}`
          : dateObj.getMinutes();
      let day;

      switch (dateObj.getDay()) {
        case 0: {
          day = '일';
          break;
        }
        case 1: {
          day = '월';
          break;
        }
        case 2: {
          day = '화';
          break;
        }
        case 3: {
          day = '수';
          break;
        }
        case 4: {
          day = '목';
          break;
        }
        case 5: {
          day = '금';
          break;
        }
        case 6: {
          day = '토';
          break;
        }
        default:
          break;
      }

      return {
        date: `${year}년 ${month}월 ${date}일(${day})`,
        time: `${hour}:${minute}`,
      };
    },
    /**
     * timer.start() 한 시점에서 생성된 interval 를 제거해주는 함수
     */
    stop: () => {
      clearInterval(timerInterval);
    },
  };

  return (
    <div className={styles.header_area}>
      {/* 로고 */}
      <div className={styles.logo_area}>
        <Logo />
      </div>
      {/* 시간 */}
      <div className={styles.timer_area}>
        <span className={styles.date}>{dpTimer?.date}</span>
        <span className={styles.time}>{dpTimer?.time}</span>
      </div>
    </div>
  );
}

export default Header;
