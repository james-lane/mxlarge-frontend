'use client';

import ReactPlayer from 'react-player/youtube';
import { useState, useEffect } from 'react';
import styles from './videoPlayer.module.css';

export default function VideoPlayer({ url }) {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  return (
    <div className={styles.videoPlayer}>
      {hasWindow && (
        <ReactPlayer url={url} width={'auto'} style={{ minWidth: '100%' }} />
      )}
    </div>
  );
}
