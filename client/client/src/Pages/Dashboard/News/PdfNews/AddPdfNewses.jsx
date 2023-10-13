import React from "react";

const AddPdfNewses = () => {
  const handleInput = () => {};
  const handleImageChange = () => {};
  return (
    <div className="w-11/12 mx-auto">
      {" "}
      <h1 className="text-3xl my-8 font-semibold">Add PdfNewses</h1>
      <form action="">
        <div>
          <div className="w-full">
            <label className="font-semibold cursor-pointer" htmlFor="pdfurl">
              Pdf Url
            </label>{" "}
            <br />
            <input
              onChange={handleInput}
              className="border w-full border-purple-200 mt-3 p-3 "
              type="text"
              name="pdfurl"
              placeholder="1696595525155-476634918-farhan-suvo.pdf"
              id="pdfurl"
              required={true}
            />
          </div>
          <div className="w-full">
            <label className="font-semibold cursor-pointer" htmlFor="title">
              Pdf Title
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

          <div className="mt-6">
            <label className=" font-semibold cursor-pointer">
              PdfNews Descripton
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

export default AddPdfNewses;
