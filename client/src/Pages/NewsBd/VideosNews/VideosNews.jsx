import React from "react";
import { useEffect, useState } from "react";
// import f from "../../../../assets"
import bgTitle from "../../../assets/bgtitle.png";
// import bgTitleNews from "../../../assets/bgTitleNews.png";
import { Icon } from "@iconify/react";
// import f from "../../../"
import { Link } from "react-router-dom";
import YouTubeEmbed from "../../../Components/YouTubeEmbed/YouTubeEmbed";
import HTMLStringToComponent from "../../../Components/HTMLStringToComponent/HTMLStringToComponent";

const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const VideosNews = ({ category }) => {
  const [videosNews, setVideosNews] = useState([]);

  const showDate = (updatedAt) => {
    let postDate = new Date(updatedAt);
    const day = postDate.getDate(); // 13
    const month = postDate.toLocaleString("en-US", { month: "long" }); // Months are 0-based, so add 1 to get the correct month (10 for October)
    const year = postDate.getFullYear();

    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    fetch(`${apiBaseUrl}/news?category=${category}`)
      .then((res) => res.json())
      .then((data) => setVideosNews(data.data))
      .catch((error) => console.log(error));
  }, [category]);

  return (
    <div>
      <div className={`${"flex justify-start"}`}>
        <div className="relative inline-block max-w-content">
          {" "}
          <img src={bgTitle} alt="" className="w-[80%]" />
          <p className="absolute top-[30%] left-[15%] text-white font-bold text-[20px]">
            {videosNews[0]?.categoryTitle}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 p-5 ">
        {" "}
        <div className="md:w-[50%] w-full p-4 ">
          {" "}
          <p className=" my-1 text-black font-bold  mt-2 hover:text-red-600 transition-all duration-300">
            {videosNews[0]?.title.slice(0, 50) + "..."}
          </p>
          <div className="h-[270px]">
            <YouTubeEmbed
              videoUrl={`${videosNews[0]?.video}`}
              height={"h-full w-full"}
            ></YouTubeEmbed>
          </div>
          <div className="my-2 flex justify-start items-center gap-1 text-[14px] font-semibold text-gray-500">
            {" "}
            <Icon icon="mdi:clock-outline" />
            <p>{showDate(videosNews[0]?.updatedAt)}</p>
          </div>
          <p className="text-[15px] text-gray-500">
            <HTMLStringToComponent
              htmlString={videosNews[0]?.description}
            ></HTMLStringToComponent>

            <Link
              to={`/ভিডিও/${encodeURIComponent(
                videosNews[0]?.title.split(" ").join("-")
              )}/${videosNews[0]?._id}`}
            >
              {" "}
              <span className="  text-indigo-800 font-semibold    ">
                বিস্তারিত
              </span>
            </Link>
          </p>
          {/* <Link to={`/news/${news[0]?._id}`}>
          {" "}
          <button className="bg-transparent hover:bg-blue-500 text-indigo-800 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full text-[13px] mt-2 w-1/2">
            বিস্তারিত
          </button>
        </Link> */}
        </div>
        <div className="md:w-[50%] w-full">
          <div className="grid grid-cols-2 gap-3">
            {videosNews?.slice(0, 4).map((singleNews, idx) => (
              <Link
                to={`/ভিডিও/${encodeURIComponent(
                  singleNews.title.split(" ").join("-")
                )}/${singleNews._id}`}
                key={idx}
              >
                <div className=" mb-3 border p-2 shadow-lg">
                  <div className="overflow-hidden">
                    <div className=" w-full overflow-hidden ">
                      {" "}
                      <div className="w-full h-[170px]">
                        <YouTubeEmbed
                          videoUrl={`${singleNews?.video} `}
                          height={"h-full w-full"}
                        ></YouTubeEmbed>
                      </div>
                      <p className=" text-black font-bold text-[12px] mt-2 hover:text-red-600 transition-all duration-200">
                        {singleNews?.title}
                      </p>
                      <div className="mt-2 flex justify-end items-center gap-1 text-[11px] font-semibold text-gray-500">
                        {" "}
                        <Icon icon="mdi:clock-outline" />
                        <p>{showDate(singleNews?.updatedAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div>
            <Link
              to={`/ভিডিও/${encodeURIComponent(
                videosNews[0]?.categoryTitle.split(" ").join("-")
              )}`}
            >
              <button className="bg-[#1F2659] hover:bg-[#C21820] text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent  text-[15px] mt-1 w-full transition-all duration-300 ">
                সব খবর
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosNews;
