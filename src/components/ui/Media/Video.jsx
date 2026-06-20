import React from 'react';

const Video = ({
  src,
  poster,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  className = '',
  ...props
}) => {
  return (
    <video
      src={src}
      poster={poster}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      className={className}
      {...props}
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
