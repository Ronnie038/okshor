import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const TopNavbar = () => {
  return (
    <div className=" flex  items-center px-20 md:justify-between justify-around my-6 py-1 bg-black text-white">
      <div className="flex gap-2 text-sm">
        <p className="p-1 border border-white rounded-full hover:bg-white hover:border-none hover:text-black">
          {" "}
          <Icon icon="ri:facebook-fill" />
        </p>
        <p className="p-1 border border-white rounded-full hover:bg-white hover:border-none hover:text-black">
          {" "}
          <Icon icon="uil:twitter" />
        </p>
        <p className="p-1 border border-white rounded-full hover:bg-white hover:border-none hover:text-black">
          {" "}
          <Icon icon="ant-design:instagram-outlined" />
        </p>
      </div>{" "}
      <Link>
        <button className="p-1 text-[10px] rounded text-white uppercase hover:opacity-80 bg-red-600">
          subscribe
        </button>
      </Link>
    </div>
  );
};

export default TopNavbar;
