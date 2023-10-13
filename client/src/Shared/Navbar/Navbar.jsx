import React, { useState } from "react";
import logo from "../../assets/Home/logo.png";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const Links = [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "About",
      href: "/about",
    },
    {
      text: "Book Shop",
      href: "/shop",
    },
    {
      text: "Job Circular",
      href: "/jobcircular",
    },
    {
      text: "Contact",
      href: "/contact",
    },
    {
      text: "Dashboard",
      href: "/dashboard",
    },
    {
      text: "Checkout",
      href: "/checkout",
    },
  ];

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-10/12 mx-auto">
      <nav className="flex  items-center lg:justify-between md:justify-between justify-around my-4">
        <Link to="/">
          <img src={logo} alt="okshar logo" className="w-[80px]" />
        </Link>
        <div className="lg:block hidden">
          <ul className="lg:flex lg:flex-row space-x-10 lg:gap-0 p-4">
            {Links?.map((link, index) => (
              <li
                key={index}
                className="hover:text-[#E52D27] uppercase font-semibold transition-all duration-300 menu"
              >
                <NavLink to={link.href}>{link.text}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`${
            isMenuOpen
              ? "lg:block fixed z-40 top-0 right-0 h-full bg-white w-64 shadow-lg transition-transform transform translate-x-0"
              : "hidden"
          } lg:relative lg:h-auto lg:w-auto`}
        >
          <ul className="lg:flex lg:flex-col gap-3 lg:gap-0 p-4 space-y-3">
            <Icon
              onClick={toggleMenu}
              className="text-3xl hover:bg-[#C21820] hover:text-white transition-all duration-200 cursor-pointer border rounded-full p-1"
              icon="eva:close-outline"
            />
            {Links?.map((link, index) => (
              <li
                key={index}
                className="hover:text-sky-400 uppercase font-semibold transition-all duration-300"
              >
                <Link to={link.href}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 items-center menu">
          <NavLink to="/login" className="">
            <Icon icon="mdi:user" className="text-3xl" />
          </NavLink>
          <NavLink
            to="/cart"
            className="flex justify-center items-center gap-2"
          >
            <Icon icon="fluent:cart-16-regular" className="text-3xl" />
          </NavLink>
          <button
            onClick={toggleMenu}
            className="text-[18px] hover:text-sky-400 lg:hidden"
          >
            <Icon
              className="text-2xl hover:text-[#E52D27] transition-all duration-300 menu"
              icon={isMenuOpen ? "eva:close-outline" : "eva:menu-outline"}
            />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
