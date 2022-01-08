import React from 'react';

// styles
import styles from './scss/Video.module.scss';

function Video() {
    return (
        <div className={styles.video_area}>
            <iframe src='https://www.youtube.com/embed/0GN8t2u3flc' title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>
            {/* <video autoPlay playsInline controls loop>
                <source src='/static/assets/video/play_video.mp4' type='video/mp4' />
            </video> */}
        </div>
    )
}

export default Video;