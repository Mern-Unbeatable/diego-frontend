import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Settings, ExternalLink, Maximize2, Minimize2, X } from 'lucide-react';

const CourseMain = ({ course }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  
  // Settings Popup States
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');

  // Picture in Picture Mock State
  const [isPipActive, setIsPipActive] = useState(false);

  // Fullscreen State
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (val > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Fullscreen handler
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Error enabling fullscreen:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Track fullscreen changes from ESC key or browser controls
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Video Container (ref attached for fullscreen) */}
      <div 
        ref={containerRef}
        className={`relative aspect-video w-full overflow-hidden bg-black shadow-lg transition-all duration-300 ${
          isFullscreen ? 'rounded-none h-full w-full' : 'rounded-2xl'
        }`}
      >
        {/* Video Thumbnail */}
        <img
          src={course.video}
          alt={course.title}
          className="h-full w-full object-cover"
        />

        {/* Dark overlay for bottom controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Centered Play Button */}
        {!isPipActive && (
          <button
            onClick={handlePlayPause}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/30 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="fill-[#55B18D] text-[#55B18D]" size={32} />
            ) : (
              <Play className="fill-[#55B18D] text-[#55B18D] ml-1" size={32} />
            )}
          </button>
        )}

        {/* Video controls container */}
        <div className="absolute right-6 bottom-4 left-6 flex flex-col gap-3 z-10">
          {/* Progress Bar */}
          <div className="relative flex items-center">
            <div className="h-[3px] w-full rounded-full bg-white/30">
              <div className="relative h-full w-[28%] rounded-full bg-[#55B18D]">
                <div className="absolute -right-1.5 -top-[4px] h-3.5 w-3.5 rounded-full bg-white shadow-md cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-white">
            {/* Left Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePlayPause}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="hover:text-[#55B18D] transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="fill-white" size={16} />
                ) : (
                  <Play className="fill-white" size={16} />
                )}
              </button>
              <span className="text-xs font-medium tracking-wider select-none">
                00:01 <span className="ml-2 text-white/60">({playbackSpeed})</span>
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-5 relative">
              {/* Volume Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  aria-label="Volume"
                  className="hover:text-[#55B18D] transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="h-[3px] w-16 cursor-pointer appearance-none rounded-full bg-white/30 accent-[#55B18D] focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #55B18D 0%, #55B18D ${
                      isMuted ? 0 : volume
                    }%, rgba(255, 255, 255, 0.3) ${isMuted ? 0 : volume}%, rgba(255, 255, 255, 0.3) 100%)`,
                  }}
                />
              </div>

              {/* Settings Dropdown Wrapper */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  aria-label="Settings"
                  className={`transition-colors cursor-pointer block ${
                    showSettings ? 'text-[#55B18D]' : 'hover:text-[#55B18D]'
                  }`}
                >
                  <Settings size={18} />
                </button>

                {/* Settings Popup Menu */}
                {showSettings && (
                  <div className="absolute right-0 bottom-8 z-30 w-36 rounded-lg bg-black/90 p-2 text-xs text-white shadow-xl border border-white/10 backdrop-blur-sm">
                    <div className="mb-1 border-b border-white/10 pb-1 text-center font-semibold text-gray-400">
                      Playback Speed
                    </div>
                    {['0.5x', '1.0x', '1.5x', '2.0x'].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => {
                          setPlaybackSpeed(speed);
                          setShowSettings(false);
                        }}
                        className={`flex w-full items-center justify-between rounded px-2 py-1 text-left cursor-pointer hover:bg-white/10 ${
                          playbackSpeed === speed ? 'text-[#55B18D] font-bold' : ''
                        }`}
                      >
                        <span>{speed}</span>
                        {playbackSpeed === speed && <div className="h-1.5 w-1.5 rounded-full bg-[#55B18D]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Picture in Picture */}
              <button
                onClick={() => setIsPipActive(!isPipActive)}
                aria-label="Picture in Picture"
                className={`transition-colors cursor-pointer ${
                  isPipActive ? 'text-[#55B18D]' : 'hover:text-[#55B18D]'
                }`}
              >
                <ExternalLink size={18} />
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                aria-label="Fullscreen"
                className="hover:text-[#55B18D] transition-colors cursor-pointer"
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Picture in Picture Floating window */}
      {isPipActive && (
        <div className="fixed right-6 bottom-6 z-50 w-72 overflow-hidden rounded-xl border border-white/20 bg-black shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="relative aspect-video w-full">
            <img
              src={course.video}
              alt="PiP Video Preview"
              className="h-full w-full object-cover opacity-90"
            />
            {/* Overlay controls */}
            <div className="absolute inset-0 flex flex-col justify-between p-2.5 bg-black/40">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/80 font-medium truncate max-w-[180px]">
                  PiP: {course.title}
                </span>
                <button
                  onClick={() => setIsPipActive(false)}
                  className="rounded-full bg-black/60 p-1 text-white hover:bg-black/90 cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={handlePlayPause}
                  className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:scale-105 cursor-pointer"
                >
                  {isPlaying ? <Pause size={14} className="fill-white" /> : <Play size={14} className="fill-white ml-0.5" />}
                </button>
              </div>
              <div className="h-1 w-full rounded-full bg-white/20">
                <div className="h-full w-[28%] rounded-full bg-[#55B18D]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Description Section */}
      <div className="mt-6 space-y-3">
        <h2 className="text-[22px] font-semibold text-[#1d1d1d]">
          Video: <span className="font-normal text-[#5a5a5a]">What is Seveso Training</span>
        </h2>
        <p className="text-base leading-relaxed text-[#5a5a5a]">
          {course.description}
        </p>
      </div>
    </div>
  );
};

export default CourseMain;
