import React from "react";

const AddBcsNews = () => {
  const handleInput = () => {};
  const handleImageChange = () => {};
  return (
    <div className="w-11/12 mx-auto">
      {" "}
      <h1 className="text-3xl my-8 font-semibold">Add BcsNewses</h1>
      <form action="">
        <div>
          <div className="w-full">
            <label className="font-semibold cursor-pointer" htmlFor="category">
              Category
            </label>{" "}
            <br />
            <input
              onChange={handleInput}
              className="border w-full border-purple-200 mt-3 p-3 "
              type="text"
              name="category"
              placeholder="বিসিএস সিলেবাস"
              id="category"
              required={true}
            />
          </div>
          <div className="w-full">
            <label
              className="font-semibold cursor-pointer"
              htmlFor="subcategory"
            >
              Subcategory
            </label>{" "}
            <br />
            <input
              onChange={handleInput}
              className="border w-full border-purple-200 mt-3 p-3 "
              type="text"
              name="subcategory"
              placeholder="প্রিলিমিনিয়ার"
              id="subcategory"
              required={true}
            />
          </div>
          <div className="w-full">
            <label className="font-semibold cursor-pointer" htmlFor="title">
              Title
            </label>{" "}
            <br />
            <input
              onChange={handleInput}
              className="border w-full border-purple-200 mt-3 p-3 "
              type="text"
              name="title"
              placeholder="গরুর চিকিৎসা কাজে কেনা গাড়ির ব্যাক্তিগত ব্যাবহার"
              id="title"
              required={true}
            />
          </div>
          <div className="w-full mt-5">
            <label className=" font-semibold cursor-pointer">News Image</label>{" "}
            <br />
            <input
              autoComplete="off"
              required
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full border-purple-200 p-3 mt-3"
              // onBlur={handleInputBlur}
            />
            <br />
          </div>
          <div className="mt-6">
            <label className=" font-semibold cursor-pointer">
              News Descripton
            </label>{" "}
            <br />
            <textarea
              onChange={handleInput}
              className="border p-4 w-full mt-3"
              placeholder="message"
              name="description"
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="flex justify-end my-10">
            <button
              type="submit"
              className="flex justify-center btn items-center bg-[#282B35] hover:bg-[#3B95B0] rounded-none py-3 px-8 text-[#F5F5F5]"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBcsNews;
