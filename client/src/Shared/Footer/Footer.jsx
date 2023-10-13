import React from "react";
import { Icon } from "@iconify/react";
import logo2 from "../../assets/Footer/footer-logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#1F2659] text-center mt-12  ">
      <div className="w-1/3 mx-auto  text-center  bg-transparent">
        <div className="bg-transparent flex justify-center items-center ">
          <img className="bg-transparent mt-4 text-white " src={logo2} alt="" />
        </div>
        <div className="bg-transparent justify-center items-center flex ju gap-4 mt-4">
          <Icon
            className="w-8 h-8 p-1 rounded-full  text-black"
            icon="ri:facebook-fill"
          />

          <Icon className="text-2xl" icon="mdi:linkedin" />

          <Icon className="w-8 h-6  rounded text-black  " icon="mdi:youtube" />
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
      </div>
      <p className="mt-2">
        Copyright ©2023 Weero Digital. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
