import { Icon } from "@iconify/react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { logOut } from "../../../api/auth";

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
      title: "AllNews",
      link: "allnews",
      icon: "streamline:shopping-bag-hand-bag-2-shopping-bag-purse-goods-item-products",
    },
    {
      title: "Add BcsNews",
      link: "addbcsnews",
      icon: "streamline:shopping-bag-hand-bag-2-shopping-bag-purse-goods-item-products",
    },
    {
      title: "BcsNewses",
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
    <div className="bg-[#0C4E67] xl:min-h-screen xl:w-96 lg:w-full md:w-full w-full">
      <div className="xl:my-7 lg:my-5 md:my-5 my-5 mx-8">
        <Link to="/" className="">
          <p className="logoFont text-[#03384D] text-center text-4xl font-bold">
            <span className="text-[#3B95B0] logoFont">Urban</span>Utopia
          </p>
        </Link>
      </div>
      <ul className="nabLinkStyle space-y-4 mx-auto xl:w-full lg:w-[90%] md:w-[90%] w-[95%]">
        {sideBar.map((data, index) => (
          <li
            key={index}
            className=" text-white xl:block lg:inline-block md:inline-block inline-block"
          >
            <NavLink
              className="flex gap-2 p-4 text-xl font-semibold items-center"
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
