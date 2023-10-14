import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTubeEmbed from "../../../../Components/YouTubeEmbed/YouTubeEmbed";
const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const SingleVideoNews = () => {
  const { _id } = useParams();
  const [news, setNews] = useState({});

  useEffect(() => {
    // Fetch the news data from the JSON file
    fetch(`${apiBaseUrl}/news/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, [_id]);
  return (
    <div className="w-10/12 mx-auto py-10">
      {news ? (
        <div className="mx-5 shadow-md rounded-sm p-5">
          <div className=" md:w-full h-[390px]">
            <YouTubeEmbed
              videoUrl={news?.video}
              height={"h-full w-full"}
            ></YouTubeEmbed>
          </div>
          <div className="w-full mt-5">
            <h2 className="text-3xl mb-3 leading-normal font-medium">
              {news.title}
            </h2>
            <hr className="mb-5" />
            <p className="leading-7">{news.description}</p>
          </div>
        </div>
      ) : (
        <p>News not found</p>
      )}
    </div>
  );
};

export default SingleVideoNews;
