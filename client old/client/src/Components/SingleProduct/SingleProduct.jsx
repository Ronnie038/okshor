// import React from 'react';
import { Icon } from "@iconify/react";
// import Rating from "react-rating";
// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SingleProduct.css";
import { addToCart } from "../../store/slices/CartSlices";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const SingleProduct = ({ product, index }) => {
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  const dispatch = useDispatch();

  const [addAnimate, setAddAnimate] = useState([]);

  const notify = () =>
    toast.success("Your Product Added Successfull", {
      style: {
        backgroundColor: "#0C4E67",
        color: "white",
      },
      className: "bg-black",
    });

  const handleAddToCart = (item, index, e) => {
    e.preventDefault();

    dispatch(addToCart(item));
    const newAddAnimate = [...addAnimate];
    // console.log(addAnimate);

    newAddAnimate[index] = "animate__animated animate__fadeOutTopRight z-40";

    setAddAnimate(newAddAnimate);

    if (user?.email) {
      notify();
    }

    setTimeout(() => {
      setAddAnimate("");
    }, 1000);
  };

  useEffect(() => {});
  return (
    <div>
      <div className="relative product flex flex-col justify-between cursor-pointer lg:border p-5 rounded-md h-[430px] bg-[#eee]">
        <div className="p-1 transition-all duration-300 ">
          <img
            src={product?.image}
            className="w-full h-auto object-contain max-w-full max-h-60 hover:text-white productImg transition-all duration-300 "
            alt="Book 1"
          />
        </div>
        <h3 className="text-sm font-semibold mt-3 text-center ">
          {product?.title}
        </h3>

        <div className="flex justify-between items-center gap-5 my-4 ">
          <div className="flex gap-3 items-center justify-around text-gray-500 w-full">
            <p className=" text-[18px] line-through text-gray-500 font-semibold">
              {product?.regularPrice}৳
            </p>
            <span className="text-[20px] font-bold text-black">
              {product?.offerPrice}৳
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          {" "}
          <Link
            to={user ? "" : "/login"}
            onClick={(e) => handleAddToCart(product, index, e)}
            className="px-3 py-2 border w-full bg-indigo-900 hover:bg-red-600 font-semibold text-white transition-all text-center duration-300 rounded-md text-[11px]"
          >
            Add to Cart
          </Link>
        </div>
        <div className="flex productCart gap-5 flex-col absolute right-0 top-28">
          <Link to="">
            <Icon
              icon="basil:shopping-cart-solid"
              onClick={(e) => handleAddToCart(product, index, e)}
              className=" text-3xl hover:bg-red-600 transition-all duration-300 border border-white border-r-0 hover:border-secondary text-white pl-2 pr-5 py-2 w-full h-full rounded-l-xl bg-indigo-900"
            />
          </Link>
        </div>
      </div>
      {/* <div className="border w-[300px] singleItem relative ">
      <div className=" p-1">
        <div className=" relative h-[350px]">
          <img src={image} className="h-full w-full object-contain" alt="" />
          <div className="overlay"></div>
        </div>
        <div>
          <h1 className="text-[15px] font-semibold my-2">{title}</h1>
          <div>
            <div className="flex gap-3 text-[12px] my-2">
              <span className="flex text-[#898989]">
                <Icon icon="uil:star" />
                <Icon icon="uil:star" />
                <Icon icon="uil:star" />
                <Icon icon="uil:star" />
                <Icon icon="uil:star" />
              </span>
              <h2 className="text-[#898989] underline">
                1 <span className="ml-1">Reviews</span>
              </h2>
            </div>
            <div>
              {" "}
              <span className="price mr-4 font-semibold"> £ 36.00 </span>
              <span className="price line-through text-[16px] text-[#999999] font-semibold">
                {" "}
                £ 36.00{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[60%] showDiv mx-auto absolute top-[50%] left-[20%] text-center">
        <div className="flex gap-3 w-[100%] text-center justify-between items-center">
          <h1 className="border-2 px-4 py-3 border-white bg-transparent hover:bg-[#c06b81] text-white">
            <Icon icon="ion:cart-outline" />
          </h1>
          <h1 className="border-2 px-4 py-3 border-white bg-transparent hover:bg-[#c06b81] text-white">
            <Icon icon="iconamoon:heart-fill" />
          </h1>
          <h1 className="border-2 px-4 py-3 border-white bg-transparent hover:bg-[#c06b81] text-white">
            <Icon icon="pajamas:chart" />
          </h1>
        </div>
        <button className="uppercase mt-2 w-[100%] font-bold px-4 py-2 bg-white text-black hover:bg-[#c06b81] hover:text-white">
          Quick View
        </button>
      </div>
    </div> */}
    </div>
    // <div
    //   className={`${
    //     idx % 2 === 0 ? "bg-[#EEEEEE]" : "bg-[#F7F7F7] border"
    //   } p-6 rounded`}
    // >
    //   <div>
    //     <img
    //       src={product?.image}
    //       alt=""
    //       className="object-contain mx-auto h-[250px]"
    //     />
    //   </div>
    //   <div className="text-center w-[80%] mx-auto text-[12px] flex flex-col gap-2">
    //     <span className="font-bold text-gray-400">{product?.status}</span>
    //     <h2 className="font-bold">{product?.title}</h2>
    //     <div className="text-[15px] flex gap-5 justify-center items-center font-bold">
    //       <p className="line-through text-gray-500 text-[12px]">
    //         {product?.offerPrice}৳
    //       </p>
    //       <span>{product?.regularPrice}৳</span>
    //     </div>
    //     <button className="text-[10px] px-3 py-1 bg-indigo-900 font-semibold text-white uppercase">
    //       Add to cart
    //     </button>
    //   </div>
    // </div>
  );
};

export default SingleProduct;
