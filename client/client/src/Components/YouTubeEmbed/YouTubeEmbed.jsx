import React from "react";

const YouTubeEmbed = ({ videoId, height }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div className={`video-container ${height}`}>
      <iframe
        // width="560"
        // height="315"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
        className="w-full h-full object-cover"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
