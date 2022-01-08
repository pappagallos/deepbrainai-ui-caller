import React from 'react';

// styles
import styles from './scss/Video.module.scss';

function Video() {
    return (
        <div className={styles.video_area}>
            <video autoPlay playsInline controls>
                <source src='/static/assets/video/demo.mp4' type='video/mp4' />
            </video>
        </div>
    )
}

export default Video;