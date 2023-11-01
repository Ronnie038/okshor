import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import SingleProduct from "../../Components/SingleProduct/SingleProduct";
import shopBanner from "../../assets/shop/ShopImage2.webp";
import SingleLandscapeView from "./SingleLandscapeView/SingleLandscapeView";
import ReactPaginate from "react-paginate";
import { setDocumentTitle } from "../../Components/UseDocumentTitle/UseDocumentTitle";

const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Shop = () => {
  setDocumentTitle("অক্ষর | shop");

  const [showByView, setshowByView] = useState("gridview");
  const [price, setPrice] = useState(10); // Initial value
  const [products, setProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [itemOffset, setItemOffset] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

  console.log({ itemsPerPage });
  const handleSliderChange = (event) => {
    const inputPrice = event.target.value;
    console.log(inputPrice);
    if (inputPrice == 10) {
      return setFilteredProducts(products);
    }
    setPrice(inputPrice);
    const filterdByPrice = products?.filter(
      (item) => item.regularPrice <= inputPrice
    );
    setFilteredProducts(filterdByPrice);
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    console.log(sortValue);

    if (sortValue === "lowest") {
      const sortedProducts = [...products]?.sort(
        (a, b) => a.regularPrice - b.regularPrice
      );
      setFilteredProducts(sortedProducts);
    } else if (sortValue === "highest") {
      const sortedProducts = [...products]?.sort(
        (a, b) => b.regularPrice - a.regularPrice
      );
      setFilteredProducts(sortedProducts);
    } else if (sortValue === "newest") {
      const sortedProducts = [...products]?.filter(
        (product) => product?.newest === true
      );

      setFilteredProducts(sortedProducts);
    } else if (sortValue === "instock") {
      const sortedProducts = products?.filter(
        (product) => product?.status == "in-stock"
      );
      setFilteredProducts(sortedProducts);
    } else {
      console.log("hhllo");
      setFilteredProducts(products);
    }
  };
  // {''''''''''''''react paginataion start'''''''''''''''''}
  // const itemsPerPage = 7;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filteredProducts?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredProducts?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  // {''''''''''''''react paginataion end'''''''''''''''''}

  const handleShowPage = (e) => {
    const value = e.target.value;
    setItemsPerPage(value);
  };

  useEffect(() => {
    fetch(`${apiBaseUrl}/products?skip=${itemOffset}&&limit=${itemsPerPage}`)
      .then((res) => res.json())
      .then((data) => {
        setFilteredProducts(data.products);
        setProducts(data.products);
      })
      .catch((error) => console.log(error));
  }, [itemOffset, itemsPerPage]);

  return (
    <div className="w-10/12 mx-auto  mt-5">
      {/* <div className="flex  gap-4 items-center mb-5">
        <Icon icon="ion:home-sharp" className="hover:text-pink-500" />{" "}
        <Icon icon="ic:baseline-greater-than" /> <span>Shop</span>
      </div> */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* <div className="md:w-[30%] w-full ">
          <div className="bg-gray-200 p-5 mb-5 h-screen">
            <h1 className="pb-5 border-b-2 pl-3 font-bold mt-4 border-gray-400 uppercase">
              Catalog
            </h1>

            <div className="ml-3">
              {" "}
              <h2 className="mt-4 uppercase border-b-2 font-semibold max-w-max border-gray-400 pb-1">
                Price
              </h2>
              <input
                type="range"
                min={60}
                max={10000}
                value={price}
                onChange={handleSliderChange}
                className="slider mt-5 w-full"
              />
              <p className="text-orange-500 font-bold"> £60 - £{price}</p>
            </div>
          </div>
        </div> */}
        <div className=" w-full ">
          <div>
            <img src={shopBanner} className="w-full h-[250px] " alt="" />
          </div>
          <div className="">
            <div className="mt-5">
              <div className="flex justify-between items-center ">
                <h2>Book Shop </h2>
                <p>There are {products.length} products</p>
              </div>
              <div className="flex  flex-col md:flex-row md:justify-between md:items-center gap-3 my-5 p-3 border border-gray-500 text-center md:text-start">
                <div className="flex items-center gap-1 text-[20px]">
                  <Icon
                    icon="ic:baseline-window"
                    onClick={() => setshowByView("gridview")}
                  />{" "}
                  <Icon
                    icon="ic:baseline-list"
                    onClick={() => setshowByView("landscapeview")}
                    className="text-[30px]"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold">Sort By </span>
                  <select
                    name=""
                    id=""
                    className="border"
                    onChange={(e) => handleSort(e)}
                  >
                    <option value="">--</option>
                    <option value="newest">newest</option>
                    <option value="lowest">Price: Lowest First</option>
                    <option value="highest">Price: Higest First</option>
                    <option value="instock">In Stock</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold">Show</span>
                  <select
                    name=""
                    id=""
                    onChange={handleShowPage}
                    className="border"
                  >
                    <option value={24}>24</option>
                    <option value={12}>12</option>
                  </select>
                  <span className="font-bold">per page</span>
                </div>
                <div className=" flex items-center gap-1">
                  {" "}
                  <h2 className=" text-sm ">Price :</h2>
                  <input
                    type="range"
                    min={10}
                    max={10000}
                    value={price}
                    onChange={handleSliderChange}
                    className=""
                  />
                  <p className="text-orange-500 font-bold"> ৳10 - ৳{price}</p>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`${
                  showByView == "gridview"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  justify-around"
                    : "flex flex-col gap-6  justify-around"
                }`}
              >
                {currentItems &&
                  currentItems?.map((product, index) => (
                    <Link
                      key={index}
                      to={`/products/${product._id}/${product?.title.replace(
                        /\s+/g,
                        ""
                      )}`}
                    >
                      {showByView == "gridview" ? (
                        <SingleProduct
                          product={product}
                          index={index}
                        ></SingleProduct>
                      ) : (
                        <SingleLandscapeView
                          product={product}
                          index={index}
                        ></SingleLandscapeView>
                      )}
                    </Link>
                  ))}
              </div>

              {/* {showByView == "landscapeview" && (
                <div className="flex flex-col gap-6">
                  {products?.map((product, idx) => (
                    <Link key={idx} to={`/products/${product.id}`}>
                      <SingleLandscapeView
                        product={product}
                      ></SingleLandscapeView>
                    </Link>
                  ))}
                </div>
              )} */}
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
        </div>
      </div>
    </div>
  );
};

export default Shop;
