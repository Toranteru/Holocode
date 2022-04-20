import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { toggleVideo } from '../../helpers/AudioControls';
import './Player.css';

let video, slider;

function initializeProgress() {
  if (!slider || !video) return;
  slider.setAttribute('max', Math.round(video.duration));
}

export default function Player() {
  const { file } = useSelector(state => state.videoSlice);

  useEffect(() => {
    video = document.getElementById('video-player');
    slider = document.getElementById('video-slider');
    if (!video || !file) return;

    video.src = URL.createObjectURL(file);
    video.volume = 0.2;
    video.addEventListener('loadedmetadata', initializeProgress);

    // Cleanup function
    return () => {
      video.removeEventListener('loadedmetadata', initializeProgress);
    }
  }, [file]);

  return (
    <div className='video-container flex center'>
      <video id='video-player'></video>
      {file && 
      <>
        <div className='audio-controls'>
          <input id='video-slider' className='slider' type='range' min='0' defaultValue='0' onInput={(e) => {
            if (!video) return;
            video.currentTime = e.target.value;
          }}></input>
          <i id='video-button' className="fa-solid fa-play fa-width fa-xl pointer" onClick={() => toggleVideo(video)}></i>
          <input id='volume-slider' className='slider' type='range' min='0' max='100' defaultValue='20' onInput={(e) => {
            if (!video) return;
            video.volume = e.target.value / 100;
          }}></input>
        </div>
      </>}
    </div>
  );
}