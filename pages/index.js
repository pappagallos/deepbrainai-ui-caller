import React, {useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {io} from 'socket.io-client';
import {callListState, videoState} from '../recoil/atoms';
import ClientPage from './client';

function Home() {
  const [recoilVideo, setRecoilVideo] = useRecoilState(videoState);
  const setRecoilCallList = useSetRecoilState(callListState);

  /**
   * Socket 연결해주는 부분
   */
  useEffect(() => {
    const socket = io('http://localhost:8005', {
      reconnectionDelayMax: 10000,
    });

    socket.on('connect', () => {
      socket.emit('message', {message: 'connected'});
    });

    // 서버로부터 show_ai_human 메세지가 오면 창구번호, 대기자 이름, 비디오 URL을 받아 Recoil 에 저장한다.
    socket.on('show_ai_human', data => {
      const {counterNumber, name, video} = data[0];
      setRecoilVideo({
        ...recoilVideo,
        counterNumber,
        name,
        video,
      });
      callListPushClient(counterNumber, name, video);
    });

    return () => {
      socket.close();
    };
  }, []);

  /**
   * callList 상태에 사용자를 Push 해주는 함수
   * @param { string } counterNumber
   * @param { string } name
   */
  const callListPushClient = (counterNumber, name, video) => {
    setRecoilCallList(oldState => {
      const tempOldState = [...oldState];

      if (tempOldState.length === 4) {
        tempOldState.pop();
      }

      return [
        {
          counterNumber,
          name,
          video,
        },
        ...tempOldState,
      ];
    });
  };

  return <ClientPage />;
}

export default Home;
