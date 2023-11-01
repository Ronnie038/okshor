import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTubeEmbed from "../../../../Components/YouTubeEmbed/YouTubeEmbed";
import HTMLStringToComponent from "../../../../Components/HTMLStringToComponent/HTMLStringToComponent";
import { setDocumentTitle } from "../../../../Components/UseDocumentTitle/UseDocumentTitle";
import { setTimeformat } from "../../../../api/setTimeFormat";
const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const SingleVideoNews = () => {
  const { _id } = useParams();
  const [news, setNews] = useState({});

  // const showDate = (updatedAt) => {
  //   let postDate = new Date(updatedAt);
  //   const day = postDate.getDate(); // 13
  //   const month = postDate.toLocaleString("en-US", {
  //     month: "long",
  //   }); // Months are 0-based, so add 1 to get the correct month (10 for October)
  //   // const year = postDate.getFullYear();
  //   const hour = postDate.toLocaleString("en-US", {
  //     hour: "numeric",
  //     hour12: true,
  //   });

  //   return `${hour} ${day} ${month} `;
  // };

  useEffect(() => {
    // Fetch the news data from the JSON file
    fetch(`${apiBaseUrl}/news/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.data);
        setDocumentTitle(`অক্ষর | ${data.data.title}`);
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
            <div className="flex justify-between items-center">
              <h2 className="text-3xl w-[80%] mb-3 leading-normal font-medium">
                {news.title}
              </h2>
              <p className="w-[20%] text-gray-500 font-semibold text-center">
                {setTimeformat(news?.updatedAt)}
              </p>
            </div>
            <hr className="mb-5" />
            <p className="leading-7">{news.description}</p>
            <HTMLStringToComponent htmlString={news?.mainDescription} />
          </div>
        </div>
      ) : (
        <p>News not found</p>
      )}
    </div>
  );
};

export default SingleVideoNews;
