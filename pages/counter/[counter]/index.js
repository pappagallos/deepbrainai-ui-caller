import classNames from 'classnames';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/header/Header';
import {io} from 'socket.io-client';

// styles
import styles from '../../../styles/CounterPage.module.scss';
import axiosInstance from '../../../utils/axiosInstance';

function CounterPage() {
  const router = useRouter();
  const [isCall, setIsCall] = useState(false);
  const [waitingList, setWaitingList] = useState([]);
  const [progress, setProgress] = useState('waiting');

  useEffect(() => {
    fetchClientList();

    // 소켓 서버 연결
    const socket = io(process.env.DEEPBRAIN_SOCKET_SERVER_URL, {
      reconnectionDelayMax: 10000,
    });

    // 연결에 성공하면 서버로 메세지 전송
    socket.on('connect', () => {
      socket.emit('message', {message: 'connected'});
      console.log('[소켓 연결 성공] 서버와 연결되었습니다.');
    });

    // 새로운 대기자가 등록되었을 경우
    socket.on('progress', progress => {
      console.log('[대기자 호출중, 전달받은 데이터]', progress[0]);
      setProgress(progress[0].data.progress);
    });

    // 새로운 대기자가 등록되었을 경우
    socket.on('add_client', client => {
      console.log('[대기자 추가, 전달받은 데이터]', client);
      updateClientList(client);
    });

    // 대기자 호출이 완료되었을 경우
    socket.on('complete_client', client => {
      console.log('[대기자 호출 성공, 전달받은 데이터]', client);
      updateClientList(client);
      setProgress('waiting');
    });

    // 대기자가 삭제되었을 경우
    socket.on('remove_client', client => {
      console.log('[대기자 삭제, 전달받은 데이터]', client);

      const {id} = client[0];
      const newWaitingList = [...waitingList];

      const tagetIndex = newWaitingList.findIndex(value => (value.id = id));
      newWaitingList.splice(tagetIndex, 1);

      setWaitingList(newWaitingList);

      console.log('[대기자 삭제]', waitingList);
    });
  }, []);

  /**
   * 현재까지 등록된 대기자 리스트 가져와 상태에 저장해주는 함수
   */
  const fetchClientList = async () => {
    try {
      const {data} = await axiosInstance.get('/admin');
      setWaitingList(data.result);
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateClientList = async client => {
    setWaitingList(client[0]);
    console.log('[대기자 추가]', waitingList);
  };

  /**
   * 대기자를 호출해주는 함수
   * @param { string } _id
   * @param { string } counterNumber
   */
  const call = async (_id, counterNumber) => {
    try {
      setIsCall(true);
      await axiosInstance.put('/admin', {
        id: _id,
        counter_number: counterNumber,
      });
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsCall(false);
    }
  };

  return (
    <>
      <header className={styles.header}>
        {/* 공통 헤더 컴포넌트 */}
        <Header />

        {/* 창구 번호 및 대기자 인원 수 */}
        <div className={styles.couter_header}>
          <span>{router.query.counter}번 창구</span>
          <span>대기자 {waitingList.length}명</span>
        </div>
      </header>

      <main>
        {/* 대기자 리스트 */}
        <div className={styles.content_area}>
          {waitingList.length > 0 &&
            waitingList.map((client, index) => (
              <div className={styles.row} key={client._id}>
                <span>{client.name}</span>
                {/* 다음 순서인 대기자에게만 호출 버튼이 보이기  */}
                {index === 0 && (
                  <button
                    type='button'
                    className={classNames({
                      [styles.submit]: !isCall,
                      [styles.submit__disabled]: isCall,
                    })}
                    onClick={() => call(client._id, router.query.counter)}
                  >
                    {isCall ? progress : '호출'}
                  </button>
                )}
              </div>
            ))}
        </div>
      </main>
    </>
  );
}

export default CounterPage;
