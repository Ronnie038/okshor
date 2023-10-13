import React from "react";
import { Icon } from "@iconify/react";

const Faq = () => {
  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl my-8 font-semibold">FAQ</h2>
      <p className="text-xl font-medium">
        Certainly, I can help you create a set of frequently asked questions
        (FAQ) related to various topics. Please let me know which specific topic
        you're interested in, whether it's related to a product, service,
        company, or any other subject. Additionally, if you have a list of
        questions you'd like to include in the FAQ, feel free to provide them,
        and I can help you organize and refine them.
      </p>
      <div className="mt-6 flex gap-6">
        <div className="w-full">
          <div className="w-full">
            <label className="text-xl font-semibold">Question</label>
            <div className="flex mt-3 border">
              <div className="border px-3 flex items-center justify-center">
                <span className="font-semibold">1</span>
              </div>
              <div className="border px-3 flex items-center justify-center">
                <span>Topic</span>
              </div>
              <input
                className="w-full border-purple-200 px-3 py-3"
                type="text"
                name=""
                placeholder=""
                id=""
              />
              <div className="text-2xl flex justify-center items-center">
                <button className="btn bg-[#282B35] text-white rounded-none hover:bg-[#3B95B0]"><Icon icon="icomoon-free:plus" /></button>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex mt-3 border">
              <div className="border px-3 flex items-center justify-center">
                <span className="font-semibold">1</span>
              </div>
              <div className="border px-3 flex items-center justify-center">
                <span>Color</span>
              </div>
              <input
                className="w-full border-purple-200 px-3 py-3"
                type="text"
                name=""
                placeholder="How many color in this product?"
                id=""
              />
              <div className="text-2xl flex justify-center items-center">
                <button className="btn bg-transparent text-red-700 rounded-none hover:bg-red-700 hover:text-white"><Icon icon="fluent-mdl2:delete" className="text-xl" /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full">
            <label className="text-xl font-semibold">Answer</label>
            <div className="flex mt-3 border">
              <div className="border px-3 flex items-center justify-center">
                <span className="font-semibold">1</span>
              </div>
              <div className="border px-3 flex items-center justify-center">
                <span>Topic</span>
              </div>
              <input
                className="w-full border-purple-200 px-3 py-3"
                type="text"
                name=""
                placeholder=""
                id=""
              />
              <div className="text-2xl flex justify-center items-center">
                <button className="btn bg-[#282B35] text-white rounded-none hover:bg-[#3B95B0]"><Icon icon="icomoon-free:plus" /></button>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex mt-3 border">
              <div className="border px-3 flex items-center justify-center">
                <span className="font-semibold">1</span>
              </div>
              <div className="border px-3 flex items-center justify-center">
                <span>Color</span>
              </div>
              <input
                className="w-full border-purple-200 px-3 py-3"
                type="text"
                name=""
                placeholder="4 color, Dark-Blue, Purple, Orange, Black"
                id=""
              />
              <div className="text-2xl flex justify-center items-center">
                <button className="btn bg-transparent text-red-700 rounded-none hover:bg-red-700 hover:text-white"><Icon icon="fluent-mdl2:delete" className="text-xl" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end my-10">
        <button className="flex justify-center btn items-center bg-[#282B35] hover:bg-[#3B95B0] rounded-none py-3 px-8 text-[#F5F5F5]">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Faq;
