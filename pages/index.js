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
    // 소켓 서버 연결
    const socket = io(process.env.DEEPBRAIN_SOCKET_SERVER_URL, {
      reconnectionDelayMax: 10000,
    });

    // 연결에 성공하면 서버로 메세지 전송
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

      // 대기자 호출 리스트에 소켓 서버로부터 전달받은 대기자 정보 적재
      callListPushClient(counterNumber, name, video);
    });

    // 페이지를 나가면 소켓 서버와의 연결 끊기
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
    // recoil 상태 관리 라이브러리는 배열을 관리할 때 반드시 아래처럼 관리해주어야 한다.
    // setter 내부에서 관리하지 않고 외부에서 따로 데이터를 가공한 뒤 setter 로 가공한 배열을 넘겨주면 정상 작동을 하지 않는다.
    setRecoilCallList(oldState => {
      const tempOldState = [...oldState];

      // 리스트는 4개까지만 적재가 가능하므로 4개 이상 넘어가면 배열의 마지막 인덱스 데이터를 빼주기
      if (tempOldState.length === 4) {
        tempOldState.pop();
      }

      return [
        {
          counterNumber, // 창구 번호
          name, // 대기자 이름
          video, // 대기자 호출 AI 영상
        },
        ...tempOldState, // 이전 상태를 가지고 있는 배열
      ];
    });
  };

  return <ClientPage />;
}

export default Home;
