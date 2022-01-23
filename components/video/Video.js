import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';

// styles
import {useRecoilValue} from 'recoil';
import styles from './scss/Video.module.scss';
import {videoState} from '../../recoil/atoms';

function Video() {
  const [showVideo, setShowVideo] = useState(false); // AI 비디오 보여주기 여부
  const videoInfo = useRecoilValue(videoState);

  /**
   * 상황 1. videoInfo 가 변경되었을 경우 소켓 서버로부터 대기자에 대한 호출이 일어났다는 의미
   *        호출이 일어나면 변환이 완료된 AI 영상을 보여주기
   */
  useEffect(() => {
    setShowVideo(true);
  }, [videoInfo]);

  /**
   * AI 비디오 가리기 함수
   */
  const hideVideo = () => {
    const timeout = setTimeout(() => {
      setShowVideo(false);
      clearTimeout(timeout);
    }, 500);
  };

  const localStyles = {
    video: {
      position: 'absolute',
      top: '850px',
      width: '100%',
      height: '100vh',
      transform: 'scale(2.3)',
      zIndex: 9,
    },
  };

  return (
    <div className={styles.video_area}>
      {/* 24시간 유튜브 아무거나 */}
      {/* TODO. 유튜브 채널을 선택 가능하게 만들기 */}
      <iframe
        title='연합뉴스'
        src='https://www.youtube.com/embed/0GN8t2u3flc?autoplay=1&mute=1'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />

      {/* 비디오 라이브러리 */}
      <div
        className={classNames([styles.ai_video_area, showVideo && styles.show])}
      >
        {showVideo && (
          <ReactPlayer
            width='100%'
            height='100vh'
            playing
            playsinline
            controls
            url={videoInfo.video}
            onEnded={hideVideo}
            style={localStyles.video}
          />
        )}
      </div>
    </div>
  );
}

export default Video;
