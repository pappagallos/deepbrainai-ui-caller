import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {io} from 'socket.io-client';
import {saveCalling} from '../reducers/calling';
import {saveCallList} from '../reducers/callList';
import {saveWaitingList} from '../reducers/waitingList';
import axiosInstance from '../utils/axiosInstance';
import ClientPage from './client';

function Home() {
  const dispatch = useDispatch();
  const {callList} = useSelector(state => state.callList);

  /**
   * Socket 연결해주는 부분
   */
  useEffect(() => {
    // 대기자 리스트 가져오기
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

    // 서버로부터 show_ai_human 메세지가 오면 창구번호, 대기자 이름, 비디오 URL을 받아 Recoil 에 저장한다.
    socket.on('show_ai_human', data => {
      const {counterNumber, name, video} = data[0];

      // 대기자 호출 리스트에 소켓 서버로부터 전달받은 대기자 정보 적재
      pushCalling(counterNumber, name, video, callList);
      dispatch(saveCalling({counterNumber, name, video}));

      console.log('[대기자 호출]', counterNumber, name, video);
    });

    // 페이지를 나가면 소켓 서버와의 연결 끊기
    return () => {
      socket.close();
    };
  }, []);

  /**
   * 현재까지 등록된 대기자 리스트 가져와 상태에 저장해주는 함수
   */
  const fetchClientList = async () => {
    try {
      const {data} = await axiosInstance.get('/admin');
      dispatch(saveWaitingList(data.result));
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * callList 상태에 사용자를 Push 해주는 함수
   * @param { string } counterNumber
   * @param { string } name
   */
  const pushCalling = (counterNumber, name, video, newCallList) => {
    // 리스트는 4개까지만 적재가 가능하므로 4개 이상 넘어가면 배열의 마지막 인덱스 데이터를 빼주기
    if (newCallList.length === 4) {
      newCallList.pop();
    }

    newCallList.unshift({counterNumber, name, video});
    console.log(newCallList);
    dispatch(saveCallList(newCallList));
  };

  return <ClientPage />;
}

export default Home;
