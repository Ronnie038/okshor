import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const AllNews = () => {
  const [allNews, setAllNews] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const category = queryParams.get("category");

  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  // {''''''''''''''react paginataion start'''''''''''''''''}
  // const itemsPerPage = 7;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = allNews.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allNews.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allNews.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  // {''''''''''''''react paginataion end'''''''''''''''''}
  console.log(category);
  useEffect(() => {
    fetch(`${apiBaseUrl}/news?category=${category}`) // Update the path to the JSON file
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllNews(data.data); // Store the fetched data in state
      })
      .catch((err) => console.log(err));
  }, [category]); // Include category in the dependency array

  return (
    // <div className="w-10/12 mx-auto">
    //   <div>
    //     {allNews?.map((news, index) => (
    //       <div key={index} className="flex gap-2 justify-between mb-5 border">
    //         {" "}
    //         <div className="w-[30%]">
    //           <img src={news?.image} alt="" />
    //         </div>
    //         <div className="w-[50%]  flex justify-center items-center">
    //           <div>
    //             <p className="mb-5">{news.title}</p>
    //             <p>{news.description?.slice(0, 200) + "..."}</p>
    //           </div>
    //         </div>
    //         <div className="w-[20%] flex justify-center items-center ">
    //           <Link to={`/news/${news._id}`}>
    //             {" "}
    //             <button className="px-2 py-1 border-2 border-black rounded my-2">
    //               বিস্তারিত
    //             </button>
    //           </Link>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="md:w-10/12 w-[90%] mx-auto my-20">
      <div className="grid lg:grid-cols-2 gap-5">
        {currentItems?.map((news, index) => (
          <>
            <div className="w-11/12 border rounded shadow-lg transition-all duration-200 p-5">
              <h2 className="text-xl mb-4 font-medium hover:text-[#C21820] transition-all duration-200">
                {news?.title}
              </h2>
              <div
                key={index}
                className="flex xl:items-start items-center justify-between xl:flex-nowrap lg:flex-wrap md:flex-wrap flex-wrap gap-10 mx-auto "
              >
                <div className=" w-full">
                  <img
                    src={news?.image}
                    className="w-full rounded-md h-[300px] "
                    alt=""
                  />
                </div>
                <div className="w-full">
                  <p className="text-justify leading-7 text-sm">
                    {news.description?.slice(0, 220) + "... "}
                    <Link
                      to={`/খবর/${encodeURIComponent(
                        news.title.split(" ").join("-")
                      )}/${news._id}`}
                      className=" items-center font-semibold text-[#1F2659] hover:opacity-90 text-[15px]"
                    >
                      বিস্তারিত
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="flex gap-2 items-center mt-3">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="paginationBttns"
          previousLinkClassName="prevBttn"
          nextLinkClassName="nextBttn"
          disabledClassName="paginationdisabled"
          activeClassName="paginationActive"
          // pageLinkClassName="paginationBttn"
        />
      </div>
    </div>
  );
};

export default AllNews;
