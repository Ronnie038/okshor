import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import logo from "../../assets/logo/main_logo.png";

import { logOut } from "../../api/auth";
import TopNavbar from "./TopNavbar/TopNavbar";
const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  // const user = true;
  const userData = useSelector((state) => state.user);
  const { user, status, error } = userData;

  // const [cartLength, setCartLength] = useState();
  const cartLength = useSelector((state) => {
    return state?.cartItems.cart.length;
  });
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
  ];

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const activeLink =
    "text-[#E52D27] uppercase font-bold transition-all duration-300 menu";
  const normalLink =
    "hover:text-[#E52D27] uppercase font-semibold transition-all duration-300 menu";

  return (
    <div className="">
      <TopNavbar></TopNavbar>
      <nav className="w-10/12 mx-auto flex  items-center lg:justify-between md:justify-between justify-around my-4 ">
        <Link to="/" className=" block">
          <img src={logo} alt="okshar logo" className="logo-img w-48" />
        </Link>

        <div className="lg:block hidden">
          <div className="lg:flex lg:flex-row  lg:gap-0 ">
            {Links?.map((link, index) => (
              <p key={index}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  {" "}
                  {link.text}
                </NavLink>
              </p>
            ))}
          </div>
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
                className="hover:text-sky-400 uppercase font-bold transition-all duration-300"
              >
                <Link to={link.href} className="font-bold">
                  {link.text}
                </Link>
              </li>
            ))}
            <li>
              {" "}
              {user._id && user.isAdmin && user.role === "admin" && (
                <div className="hover:text-sky-400 uppercase font-bold transition-all duration-300">
                  <Link to="/dashboard">Dashboard</Link>
                </div>
              )}
            </li>
            <li>
              {" "}
              {user._id && (
                <p
                  onClick={logOut}
                  className="hover:text-sky-400 uppercase font-bold transition-all duration-300 cursor-pointer"
                >
                  Logout
                </p>
              )}
            </li>
          </ul>
        </div>

        <div className="flex items-center lg:gap-5 justify-center gap-3">
          {user._id && user.isAdmin && user.role === "admin" && (
            <div className="bg-[#3B95B0] p-2 rounded-md text-white lg:block hidden">
              <Link to="/dashboard">Dashboard</Link>
            </div>
          )}
          <div>
            {user._id ? (
              <>
                <Link to="/userProfile" className="">
                  <div className="rounded-full h-10 w-10 overflow-hidden">
                    {user?.image ? (
                      <img
                        src={user?.image}
                        alt=""
                        className="object-cover object-center h-full w-full"
                      />
                    ) : (
                      <Icon
                        className=" z-50 h-full w-full mt-1"
                        icon="zondicons:user"
                      />
                    )}
                  </div>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <span className="px-5 bg-red-500 text-white py-2 rounded-full font-bold hover:bg-[#03384D] duration-300">
                  Login
                </span>
              </Link>
            )}
          </div>

          <div className="md:w-9 relative hover:scale-110 duration-300">
            <Link to="/cart">
              <Icon
                className="w-full"
                icon="fluent:cart-16-regular"
                width={35}
              />
            </Link>
            <div className="badge bg-[#3B95B0] border-2 gap-2 absolute -top-0 -right-4 text-white">
              {cartLength}
            </div>
          </div>
          {user._id && (
            <div
              onClick={logOut}
              className="p-2 font-bold text-white rounded bg-gray-500  lg:block hidden cursor-pointer hover:translate-x-1 duration-300"
            >
              Logout
            </div>
          )}
          <button
            onClick={toggleMenu}
            className=" hover:text-sky-400 lg:hidden"
          >
            <Icon
              className="text-4xl hover:text-[#E52D27] transition-all duration-300 menu"
              icon={isMenuOpen ? "eva:close-outline" : "eva:menu-outline"}
            />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
