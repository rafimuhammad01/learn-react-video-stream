// components/HLSVideo.tsx
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLSVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const video = videoRef.current;

      if (video) {
        const hls = new Hls();
        hls.loadSource('http://localhost:8080/video/1');
        hls.attachMedia(video);

        return () => {
          hls.destroy();
        };
      }
    } else if (videoRef.current) {
      videoRef.current.src =
        'http://localhost:8080/video/1';
    }
  }, []);

  return (
    <div>
      <h1>HLS Video Example</h1>
      <video
        ref={videoRef}
        controls
        width="640"
        height="360"
        onError={(e) => {
          console.error('Error occurred:', e);
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HLSVideo;
