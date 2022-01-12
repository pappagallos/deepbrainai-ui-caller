import React, { useState, useEffect, useRef } from 'react';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

function ReactPlayer ({ onVideoEnd = () => {}, ...props }) {
    const ref = useRef(null);
    const [videoState, setVideoState] = useState(null);
    const [hasEnded, setHasEnded] = useState(false);

    useEffect(() => {
        ref.current.subscribeToStateChange(setVideoState);
    }, [setVideoState]);

    useEffect(() => {
        if (videoState && videoState.ended && !hasEnded) {
            setHasEnded(true);
            onVideoEnd();
        }
    }, [videoState, hasEnded, setHasEnded, onVideoEnd]);

    return <Player ref={ref} {...props} />;
};

export default ReactPlayer;