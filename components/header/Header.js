import React, { useEffect, useState } from 'react';

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
        }
    }, []);

    const timer = {
        start: () => {
            if (timerInterval) timer.stop();

            timer.update();

            setTimerInterval(setInterval(() => {
                timer.update();
            }, 1000));
        },
        update: () => {
            setDpTimer(timer.toLocaleString());
        },
        toLocaleString: () => {
            const dateObj = new Date();

            let year = dateObj.getFullYear(),
                month = dateObj.getMonth() + 1,
                date = dateObj.getDate(),
                hour = dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours(),
                minute = dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes(),
                day;

            switch(dateObj.getDay()) {
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
            }

            return {
                date: `${year}년 ${month}월 ${date}일(${day})`,
                time: `${hour}:${minute}`
            }
        },
        stop: () => {
            clearInterval(timerInterval);
        }
    }

    return (
        <div className={styles.header_area}>
            <div className={styles.logo_area}>
                <Logo />
            </div>
            <div className={styles.timer_area}>
                <span className={styles.date}>{ dpTimer?.date }</span>
                <span className={styles.time}>{ dpTimer?.time }</span>
            </div>
        </div>
    )
}

export default Header;