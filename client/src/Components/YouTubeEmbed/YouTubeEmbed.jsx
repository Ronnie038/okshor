import React, { useEffect, useState } from "react";
import { Icon, InlineIcon } from "@iconify/react";
// import playCircle from "@iconify/icons-fa-solid/play-circle";
// import { Icon } from '@iconify/react';
import { useRef } from "react";
import HTMLStringToComponent from "../HTMLStringToComponent/HTMLStringToComponent";

const YouTubeEmbed = ({ videoUrl, height }) => {
  // const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  console.log(videoUrl);
  const [iframeVisible, setIframeVisible] = useState(false);

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIframeVisible(true);
  };

  // useEffect(()=>{})
  return (
    // <div className={`video-container ${height}`}>
    //   <iframe
    //     // width="560"
    //     // height="315"
    //     src={embedUrl}
    //     title="YouTube video player"
    //     frameBorder="0"
    //     allowFullScreen
    //     className="w-full h-full object-cover"
    //   ></iframe>
    // </div>

    <div className={`video-container ${height}`}>
      {!iframeVisible ? (
        <div
          className="play-container flex justify-center items-center h-full w-full bg-black"
          onClick={(e) => handlePlayClick(e)}
        >
          {/* <Icon icon="ic:baseline-play-circle" /> */}
          <Icon
            icon="ic:baseline-play-circle"
            width={60}
            height={60}
            color="red"
            // className="bg-red-500"
          />
        </div>
      ) : (
        <HTMLStringToComponent
          htmlString={videoUrl}
          autoplay
        ></HTMLStringToComponent>
      )}
    </div>
  );
};

export default YouTubeEmbed;
