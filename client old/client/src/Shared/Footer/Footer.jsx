import React from "react";
import { Icon } from "@iconify/react";
import logo2 from "../../assets/logo/main_logo_2.png";
import companyLogoMade from "../../assets/Footer/wepoka.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black opacity-95    mt-12  ">
      {/* <div className="w-1/3 mx-auto  text-center  bg-transparent">
        <div className="bg-transparent flex justify-center items-center ">
          <img className="bg-transparent mt-4 text-white " src={logo2} alt="" />
        </div>
        <div className="bg-transparent justify-center items-center flex ju gap-4 mt-4">
          <Icon
            className="w-8 h-8 p-1 bg-white rounded-full  text-black"
            icon="ri:facebook-fill"
          />

          <Icon
            className="w-8 h-8 p-1 bg-white rounded-full  text-black"
            icon="mdi:linkedin"
          />

          <Icon
            className="w-8 h-8 p-1 bg-white rounded-full  text-black "
            icon="mdi:youtube"
          />
        </div>

        <div className="bg-transparent mt-4 text-center">
          <p className="text-white bg-transparent">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>

          <div className="bg-transparent justify-center items-center flex gap-4 mt-4 ">
            <Icon
              className="bg-transparent text-2xl  text-white"
              icon="mdi:email"
            />
            <p className="bg-transparent text-white">
              e-education.info@gmail.com
            </p>
          </div>

          <div className="bg-transparent justify-center mt-3 mb-6 items-center flex  gap-4  ">
            <Icon
              className="bg-transparent text-2xl   text-white"
              icon="fluent:call-12-filled"
            />
            <p className="bg-transparent text-white"> 017-0000-0000</p>
          </div>
        </div>
      </div> */}
      <div className="flex flex-col md:flex-row gap-3 justify-around p-8 md:py-10 md:pl-16  text-white ">
        <div className="w-full">
          <div className="bg-transparent ">
            <img
              className="bg-transparent mt-4 text-white w-48"
              src={logo2}
              alt=""
            />
          </div>
          <p className="mt-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea quia
            veniam eos necessitatibus error id minima? Voluptates, consequatur
            minima rem nobis porro labore tempora, itaque dignissimos totam
            expedita odio. Omnis porro sequi suscipit perspiciatis!
          </p>
          <div className="bg-transparent justify-center items-center flex ju gap-4 mt-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Icon
                className="w-8 h-8 p-1 bg-white rounded-full  text-[#1F2659] hover:bg-[#1F2659] hover:text-white duration-500"
                icon="ri:facebook-fill"
              />
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer">
              <Icon
                className="w-8 h-8 p-1 bg-white rounded-full  text-[#1F2659] hover:bg-[#1F2659] hover:text-white duration-500"
                icon="mdi:linkedin"
              />
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer">
              <Icon
                className="w-8 h-8 p-1 bg-white rounded-full  text-[#1F2659] hover:bg-[#1F2659] hover:text-white duration-500 "
                icon="mdi:youtube"
              />
            </a>
          </div>
        </div>
        <div className="w-full  ">
          {" "}
          <div className=" md:ml-8 text-center md:text-start">
            <h1 className="text-3xl  md:text-start font-bold">Contact</h1>{" "}
            <div className="mt-4">
              <p className="mt-2">
                <span className="">
                  1600 Pennsylvania Ave NW, Washington, DC 20500
                </span>{" "}
                <br />
                <a
                  href="tel:+"
                  className="hover:translate-x-2 duration-500 inline-block"
                >
                  <span className="">Phone</span>: +990 (312) 123 45 67{" "}
                </a>
                <br />{" "}
                <a
                  href="mailto:"
                  className="hover:translate-x-2 duration-500 inline-block"
                >
                  <span className=" ">Email</span>: hello@domain.com
                </a>
              </p>
              <br />
              <p className="">
                <span className=" ">Address</span>: 1600 Pennsylvania Ave NW,
                Washington, DC 20500 <br />
                <a
                  href="tel:+"
                  className="hover:translate-x-2 duration-500 inline-block"
                >
                  <span className="">Phone</span>: +990 (312) 123 45 67
                </a>
                <br />
                <a
                  href="mailto:"
                  className="hover:translate-x-2 duration-500 inline-block"
                >
                  <span className=" ">Email</span>: hello@domain.com
                </a>
              </p>
              <br />
            </div>
          </div>
        </div>
        <div className="w-full ">
          <div className="md:ml-12 text-center md:text-start">
            <h1 className="text-3xl mb-3 font-bold">Services</h1>

            <ul>
              <li className="hover:translate-x-2 duration-500">
                <Link to="">Bookshop</Link>
              </li>
              <li className="hover:translate-x-2 duration-500">
                <Link to="">Job Circular</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center border-t border-gray-500 items-center gap-1 text-white">
        <p className="text-sm">Copyright ©2023 Develop by </p>
        <a
          href="https://weepoka.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={companyLogoMade}
            className="w-[60px] bg-transparent hover:scale-110 duration-300 hover:translate-x-2"
            alt=""
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
