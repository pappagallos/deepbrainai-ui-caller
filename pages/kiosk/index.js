import React, {useEffect, useState} from 'react';

// components
import Header from '../../components/header/Header';

// styles
import styles from '../../styles/KioskPage.module.scss';
import axiosInstance from '../../utils/axiosInstance';

function KioskPage() {
  const [clientName, setClientName] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  /**
   * 상황 1. 사용자가 예약한 뒤 예약완료 화면을 보여주고 있는 상황
   */
  useEffect(() => {
    if (isComplete) {
      // 약 2초 뒤에 예약완료 화면을 다시 가리기
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        setIsComplete(false);
      }, 2000);
    }
  }, [isComplete]);

  /**
   * 키오스크 예약자 등록 함수
   */
  const handleSubmit = async () => {
    try {
      // 이름이 비어있거나 이름이 2글자 미만일 경우 return
      if (clientName === '' && clientName.length >= 2) return;

      // API 호출하여 예약자 등록한 뒤 완료되면 예약완료 화면을 보여주기
      await axiosInstance.post('/client', {name: clientName});
      setIsComplete(true);
    } catch (error) {
      throw new Error(error);
    } finally {
      setClientName('');
    }
  };

  return (
    <>
      {/* 공통 헤더 컴포넌트 */}
      <header>
        <Header />
      </header>
      <main>
        <section className={styles.content_area}>
          {/* 예약완료 화면 및 예약 화면 */}
          {isComplete ? (
            <p className={styles.message}>
              예약되었습니다.
              <br />
              잠시 기다리고 계시면 호명해드리겠습니다.
            </p>
          ) : (
            <div className={styles.client_name_area}>
              <input
                type='text'
                value={clientName}
                maxLength={4}
                spellCheck={false}
                placeholder='성함 입력'
                onChange={e => setClientName(e.target.value)}
                className={styles.client_name}
              />
              <button
                type='button'
                className={styles.submit}
                onClick={handleSubmit}
              >
                예약
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default KioskPage;
