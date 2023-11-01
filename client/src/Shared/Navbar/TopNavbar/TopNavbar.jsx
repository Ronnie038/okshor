import { Icon } from "@iconify/react";

const TopNavbar = () => {
  return (
    <div className=" flex  items-center px-20 md:justify-between justify-around my-6 py-[6px] bg-black text-white">
      <div className="flex gap-2 text-sm">
        <p className="p-1 border border-white rounded-full hover:bg-[#3b5998] hover:text-white duration-300 cursor-pointer">
          <a href="" target="_blank" rel="noopener noreferrer">
            <Icon icon="ri:facebook-fill" />
          </a>
        </p>
        <p className="p-1 border border-white rounded-full hover:bg-[#00acee] hover:text-white duration-300 cursor-pointer">
          <a href="" target="_blank" rel="noopener noreferrer">
            <Icon icon="uil:twitter" />
          </a>
        </p>
        <p className="p-1 border border-white rounded-full hover:bg-[#D03C6C] hover:text-white duration-300 cursor-pointer">
          <a href="" target="_blank" rel="noopener noreferrer">
            <Icon icon="ant-design:instagram-outlined" />
          </a>
        </p>
      </div>{" "}
      <a href="" target="_blank" rel="noopener noreferrer"></a>
      <button className="p-1 text-[10px] rounded text-white uppercase hover:opacity-80 bg-red-600 duration-300">
        subscribe
      </button>
    </div>
  );
};

export default TopNavbar;
