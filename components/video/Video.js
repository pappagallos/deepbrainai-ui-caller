import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ReactPlayer from './ReactPlayer';

// styles
import styles from './scss/Video.module.scss';

function Video() {
    const [showVideo, setShowVideo] = useState(false);  // AI 비디오 보여주기 여부
    const [videoInfo, setVideoInfo] = useState({
        number: null,       // 창구번호
        name: null,         // 대기자 이름
        video_url: null     // 비디오 URL
    });

    useEffect(() => {
        const socket = io('http://localhost:8005', {
            reconnectionDelayMax: 10000,
        });

        socket.on('connect', () => {
            console.log('[연결 성공] Socket 서버와 성공적으로 연결되었습니다.');
            socket.emit('message', { message: 'connected' });
        });

        // 서버로부터 show_ai_human 메세지가 오면 창구번호, 대기자 이름, 비디오 URL을 받아 클라이언트에게 보여준다.
        socket.on('show_ai_human', (data) => {
            const { number, name, video_url } = data[0];
            setVideoInfo({
                number,
                name,
                video_url
            });
            setShowVideo(true);
        });

        return () => {
            socket.close();
        }
    }, []);

    /**
     * AI 비디오 가리기 함수
     */
    const hideVideo = () => {
        const timeout = setTimeout(() => {
            setShowVideo(false);
            clearTimeout(timeout);
        }, 500);
    }

    return (
        <div className={styles.video_area}>
            <iframe src='https://www.youtube.com/embed/0GN8t2u3flc?autoplay=1&mute=1' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>
            
            <div className={classNames([styles.ai_video_area, showVideo && styles.show])}>
                { showVideo &&
                    <ReactPlayer
                        autoPlay
                        playsInline
                        controls
                        src={videoInfo.video_url}
                        onVideoEnd={hideVideo}
                    />
                }
            </div>
        </div>
    )
}

export default Video;