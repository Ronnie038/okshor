import { Icon } from "@iconify/react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { logOut } from "../../../api/auth";

import logo from "../../../assets/logo/main_logo_2.png";

const Sidebar = () => {
  const sideBar = [
    {
      title: "Dashboard",
      link: "dashboard",
      icon: "material-symbols:dashboard",
    },
    {
      title: "Orders",
      link: "orders",
      icon: "iconoir:cart",
    },
    {
      title: "Products",
      link: "products",
      icon: "streamline:shopping-bag-hand-bag-1-shopping-bag-purse-goods-item-products",
    },
    {
      title: "Add Products",
      link: "addproducts",
      icon: "streamline:shopping-bag-hand-bag-2-shopping-bag-purse-goods-item-products",
    },
    {
      title: "Add News",
      link: "addnews",
      icon: "streamline:shopping-bag-hand-bag-2-shopping-bag-purse-goods-item-products",
    },
    {
      title: "All News",
      link: "allnews",
      icon: "streamline:shopping-bag-hand-bag-2-shopping-bag-purse-goods-item-products",
    },
    {
      title: "Add BCS",
      link: "addbcsnews",
      icon: "streamline:shopping-bag-hand-bag-2-shopping-bag-purse-goods-item-products",
    },
    {
      title: "Bcs",
      link: "bcsnewses",
      icon: "streamline:shopping-bag-hand-bag-2-shopping-bag-purse-goods-item-products",
    },
    {
      title: "Add Pdf",
      link: "addpdfnews",
      icon: "streamline:shopping-bag-hand-bag-2-shopping-bag-purse-goods-item-products",
    },
    {
      title: "Admin Pdf",
      link: "adminPdf",
      icon: "streamline:shopping-bag-hand-bag-2-shopping-bag-purse-goods-item-products",
    },
    {
      title: "Add Banner",
      link: "addBanner",
      icon: "streamline:shopping-bag-hand-bag-2-shopping-bag-purse-goods-item-products",
    },
    {
      title: "Banners",
      link: "addminBanner",
      icon: "streamline:shopping-bag-hand-bag-2-shopping-bag-purse-goods-item-products",
    },

    // {
    // 	title: 'Delivery & Return',
    // 	link: 'delivery',
    // 	icon: 'iconoir:delivery-truck',
    // },

    // {
    // 	title: 'Contact Details',
    // 	link: 'contact',
    // 	icon: 'ri:contacts-fill',
    // },
  ];
  return (
    <div className="bg-[#1F2659] xl:min-h-screen xl:w-96 lg:w-full md:w-full w-full">
      <div className="xl:my-7 lg:my-5 md:my-5 my-5 mx-8">
        <Link to="/" className="">
          <img src={logo} alt="" className="w-48 -ml-6" />
        </Link>
      </div>
      <ul className="nabLinkStyle space-y-4 mx-auto xl:w-full lg:w-[90%] md:w-[90%] w-[95%]">
        {sideBar.map((data, index) => (
          <li
            key={index}
            className=" text-white xl:block lg:inline-block md:inline-block inline-block"
          >
            <NavLink
              // className="flex gap-2 p-4 text-xl font-semibold items-center"
              className={({ isActive }) =>
                `font-semibold text-lg xl:block md:inline-block ${
                  isActive ? "bg-[#E52D27]" : ""
                } duration-300 px-2`
              }
              to={`${data.link}`}
            >
              <Icon icon={data.icon} /> {data.title}
            </NavLink>
          </li>
        ))}

        <li className="text-white xl:block lg:inline-block md:inline-block inline-block">
          <button
            onClick={logOut}
            className="flex hover:text-[#3997B1] transition-all delay-100 ease-in-out p-4 gap-2 text-xl font-semibold items-center"
          >
            <Icon icon="mi:log-in" /> Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
