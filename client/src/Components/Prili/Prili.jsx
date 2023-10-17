import React from "react";
import { setDocumentTitle } from "../UseDocumentTitle/UseDocumentTitle";

const Prili = ({ data }) => {
  const showDate = (createdAt) => {
    let postDate = new Date(createdAt);
    const day = postDate.getDate(); // 13
    const month = postDate.toLocaleString("en-US", { month: "long" }); // Months are 0-based, so add 1 to get the correct month (10 for October)
    const year = postDate.getFullYear();

    return `${day} ${month} ${year}`;
  };
  setDocumentTitle(`অক্ষর | ${data[0]?.subcategory}`);

  console.log(data);
  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between lg:w-10/12 w-[90%]  mx-auto py-14">
      <div className="w-full md:w-[70%]">
        {data?.map((news, idx) => (
          <div
            key={idx}
            className="flex lg:flex-nowrap md:flex-wrap flex-wrap gap-10 mx-5 my-7"
          >
            <div className="lg:w-6/12 md:w-full">
              <img src={news?.image} className="w-full" alt="" />
            </div>
            <div className="w-full">
              <h2 className="text-xl mb-3 text-[#1F2659] font-bold">
                {news.title}
              </h2>
              <div
                className="htmlString"
                dangerouslySetInnerHTML={{ __html: news.description }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="md:w-[30%] w-full">
        <div className="flex justify-between items-center">
          <p className="text-red-600 font-bold">Related News</p>
          <p className="text-[#1F2659] font-bold hidden lg:block">
            Total News : {data?.length}
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 gap-2">
          {data?.map((news, idx) => (
            <div
              key={idx}
              className="flex flex-col lg:flex-row sm:justify-between gap-2 sm:border-b-2 sm:border-gray-500 mb-4 h-[300px] sm:h-auto md:h-auto"
            >
              {" "}
              <img src={news?.image} alt="" className="lg:w-[60px] w-full" />
              <div className="p-2 flex flex-col justify-between">
                <p className="text-[11px]">{news.title}</p>
                <p className="text-[10px] text-right">
                  {showDate(news.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prili;
