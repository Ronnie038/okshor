import News from "../../Components/News/News";
import VideosNews from "./VideosNews/VideosNews";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import productImage from "../../assets/Home/book1.png";
import { useEffect, useState } from "react";

const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const categoryData = ["job", "bangladesh", "world"];
const NewsBd = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.log(error));
  }, [products]);
  return (
    <div>
      <div className="flex flex-col md:flex-row md:gap-4 w-10/12 md:w-[88%] lg:w-10/12 mx-auto ">
        <div className="w-full md:w-[83%]  md:order-1 order-2">
          <div>
            {/* {jobNewses && (
							<div>
								<News news={jobNewses}></News>
							</div>
						)} */}
          </div>
          <div>
            {categoryData.map((cate, index) => (
              <News key={cate} category={cate} index={index}></News>
            ))}
          </div>

          <div>
            <VideosNews category={"video"}></VideosNews>
          </div>
        </div>
        <div className="w-11/12 mx-auto md:w-[17%] order-1 md:order-2">
          <div className="sticky top-3">
            <p className="text-indigo-900 font-bold mb-2 uppercase">
              Newest :{" "}
            </p>
            <hr className="hidden md:block h-2 bg-gray-500" />
            <Link to="/shop">
              {" "}
              <div>
                <div className="relative product flex flex-col justify-between cursor-pointer lg:border p-3 rounded-md h-[360px] ">
                  <div className="p-1 transition-all duration-300 ">
                    <img
                      src={products[0]?.image}
                      className="w-full h-auto object-contain max-w-full max-h-60 hover:text-white productImg transition-all duration-300 "
                      alt="Book 1"
                    />
                  </div>
                  <h3 className="text-sm font-semibold mt-3 ">
                    {products[0]?.title}
                  </h3>

                  <div className="flex justify-between items-center gap-5 my-4 ">
                    <div className="flex gap-3 items-center text-gray-500 ">
                      <p className=" text-[15px] line-through">
                        {products[0]?.regularPrice}৳
                      </p>
                      <span className="text-[18px]">
                        {products[0]?.offerPrice}৳
                      </span>
                    </div>

                    <button className="md:px-3 px-1 py-1 md:py-2 border bg-indigo-900 hover:bg-red-600 font-semibold md:text-[10px] text-[9px] text-white transition-all duration-300 rounded-md">
                      Add to Cart
                    </button>
                  </div>
                  <div className="flex productCart gap-5 flex-col absolute right-0 top-28">
                    <Link to="">
                      <Icon
                        icon="basil:shopping-cart-solid"
                        className=" text-3xl hover:bg-secondary transition-all duration-300 border border-white border-r-0 hover:border-secondary text-white pl-2 pr-5 py-2 w-full h-full rounded-l-xl"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsBd;
