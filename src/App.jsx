import React, { useRef, useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const iframeRef = useRef(null); // useRef to reference the iframe element
  const [player, setPlayer] = useState(null); // State to hold the YouTube player instance
  const [isPlaying, setIsPlaying] = useState(false); // Track the video play/pause state

  useEffect(() => {
    // Load YouTube IFrame API script
    const script = document.createElement('script');
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player(iframeRef.current, {
        videoId: '8EtsfWQSF7I', // Video ID from the URL
        events: {
          onReady: (event) => {
            setPlayer(event.target); // Set the player instance when ready
          },
        },
      });
    };
  }, []);

  const handlePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo(); // Pause the video
      } else {
        player.playVideo(); // Play the video
      }
      setIsPlaying(!isPlaying); // Toggle play/pause state
    }
  };

  return (
    <div className="app">
      <h1>MS Dhoni Highlights</h1>

      <div className="video-container">
        {/* Embed YouTube video with iframe */}
        <iframe
          ref={iframeRef}
          width="600"
          height="340"
          src="https://www.youtube.com/embed/8EtsfWQSF7I?enablejsapi=1"
          title="MS Dhoni Highlights"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* Play/Pause button */}
        <button onClick={handlePlayPause} className="play-pause-button">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default App;
