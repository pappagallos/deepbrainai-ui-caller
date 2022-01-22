import React, {useEffect, useState} from 'react';

// components
import Header from '../../components/header/Header';

// styles
import styles from '../../styles/KioskPage.module.scss';
import axiosInstance from '../../utils/axiosInstance';

function KioskPage() {
  const [clientName, setClientName] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        setIsComplete(false);
      }, 3000);
    }
  }, [isComplete]);

  const handleSubmit = async () => {
    try {
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
      <header>
        <Header />
      </header>
      <main>
        <section className={styles.content_area}>
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
