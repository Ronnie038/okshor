import React from "react";
// import React from "react";
import logo from "../../assets/Home/logo.png";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
const DemoLogin = () => {
  return (
    <div className=" w-10/12 mx-auto  my-20">
      <div className="  shadow-2xl w-1/2  bg-white ">
        <div className=" bg-transparent p-20 ">
          <div className=" bg-transparent">
            <p className="bg-transparent">Welcome to</p>
            <img className="bg-transparent w-48" src={logo} alt="" />
          </div>
          <div className="mt-4 bg-transparent w-full">
            <div className="form-control">
              <input
                type="email"
                {...register("email")}
                required
                placeholder="Email"
                className="input placeholder-black input-bordered h-16 rounded-none border-black text-black text-xl"
              />
            </div>
          </div>
          <div className="mt-4  bg-transparent w-full">
            <div className=" bg-transparent  w-full relative">
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className=" border w-full  border-black p-4 "
              />
              <div className="absolute right-1 top-3">
                <Icon icon="mdi:eye-off" className="text-3xl" />
              </div>
            </div>
          </div>
          <div className="bg-[#a97726] flex justify-center hover:bg-[#e56af1] items-center w-full p-4 mt-8">
            <button className="text-white ">Log In</button>
          </div>
          <div className="flex bg-transparent justify-end ">
            <Link
              href="#"
              className="label-text-alt bg-transparent link link-hover text-[16px]  mt-6 text-[#1877F2]"
            >
              Forget Password?
            </Link>
          </div>

          <div className="text-center bg-transparent mt-4 lg:px-20">
            <p className="text-[17px] bg-transparent">
              New Member?{" "}
              <Link to="/signUp" className="bg-transparent text-[#1877F2]">
                Registration Now
              </Link>
            </p>
            <div className="divider w-10/12 bg-transparent mx-auto text-black p-8">
              Or
            </div>
          </div>

          <div className="flex bg-transparent gap-4 w-full">
            <div className="border w-1/2 flex gap-2 items-center hover:bg-gray-200 rounded-none justify-center border-black p-3 mt-4">
              <Icon
                icon="entypo-social:google"
                className="text-white bg-red-600 rounded-full p-2 text-3xl"
              />
              <span className="normal-case bg-transparent">
                Log in with Google
              </span>
            </div>
            <div className="border w-1/2 flex gap-2 items-center hover:bg-gray-200 rounded-none bg-transparent justify-center border-black p-3 mt-4">
              <Icon
                icon="ic:baseline-facebook"
                className="text-4xl bg-transparent text-[#1877F2]"
              />
              <span className="normal-case bg-transparent">
                Log in with Facebook
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoLogin;
