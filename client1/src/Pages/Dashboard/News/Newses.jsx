import React, { useEffect, useState } from "react";
import NewsTable from "./NewsTable";
import { newsCategory } from "../../../api/fakeData/fakedata";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Newses = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("all");
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    fetch(`${apiUrl}/news?category=${category}`)
      .then((res) => res.json())
      .then((data) => setNews(data.data))
      .catch((error) => console.log(error));
  }, [category, refetch]);
  return (
    <div className="w-11/12 mx-auto">
      <p className="text-3xl my-8 font-semibold">Newses</p>
      <div className="flex gap-10">
        <div className="border text-center border-green-500 rounded-lg w-[200px] py-8 px-5">
          <p>Total News</p>
          <p className="text-4xl mt-3 font-semibold">{news?.length}</p>
        </div>
        <div className="border text-center border-green-500 rounded-lg w-[200px] py-8 px-5">
          <select
            name=""
            id=""
            className="outline-none p-2 border"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">সব খবর</option>
            {newsCategory.map((item) => (
              <option
                key={item.categoryTitle}
                value={item.category}
                className="outline-none border-none inline-block "
              >
                {item.categoryTitle}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-8 md:grid-cols-2 grid-cols-1">
        <NewsTable newses={news} setRefetch={setRefetch} />
      </div>
    </div>
  );
};

export default Newses;
