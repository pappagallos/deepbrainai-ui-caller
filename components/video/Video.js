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
      <iframe
        title='연합뉴스'
        src='https://www.youtube.com/embed/0GN8t2u3flc?autoplay=1&mute=1'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />

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
