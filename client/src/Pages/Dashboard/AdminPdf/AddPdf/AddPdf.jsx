import React, { useState } from "react";
import { createPdfService } from "../../../../api/pdfService";
import toast from "react-hot-toast";

const AddPdf = () => {
  const [formData, setFormData] = useState({});
  const [selectedPdf, setSelectedPdf] = useState([]);
  const [loading, setLoading] = useState([]);
  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setLoading(true);
    const newFormData = {
      ...formData,
    };

    const formDataObj = new FormData();
    formDataObj.append("pdfData", JSON.stringify(newFormData));
    formDataObj.append("pdf", selectedPdf[0]);

    // console.log(formDataObj);
    createPdfService(formDataObj, setLoading, toast, form, setSelectedPdf);
  };

  const handlePdfChange = (e) => {
    let files = e.target.files;
    // console.log({ files });
    const imageList = [];

    setSelectedPdf([...files]);
  };

  return (
    <div className="w-11/12 mx-auto">
      {" "}
      <h1 className="text-3xl my-8 font-bold">Add PdfNewses</h1>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <div className="w-full mt-5">
            <div className="flex  gap-6">
              <div className="w-full">
                <label className=" font-bold cursor-pointer">Pdf</label> <br />
                <input
                  autoComplete="off"
                  required
                  type="file"
                  name="pdf"
                  onChange={handlePdfChange}
                  className="w-full border-purple-200 p-3 mt-3"
                  // onBlur={handleInputBlur}
                />
                <br />
              </div>
            </div>
            {/* Image box    */}
          </div>
          <div className="w-full mt-3 flex gap-5">
            <label className="font-bold cursor-pointer" htmlFor="category">
              Category
            </label>{" "}
            <br />
            <select
              required
              name="category"
              onChange={(e) => {
                handleInput(e);
              }}
              className="border py-1 px-5"
              id=""
            >
              <option value="">Select Category</option>
              <option value="সরকারী চাকরি">সরকারী চাকরি PDF</option>
              <option value="বেসরকারী চাকরি">বেসরকারী চাকরি PDF</option>
              <option value="এনজিও চাকরি">এনজিও চাকরি PDF</option>
            </select>
          </div>
          <div className="w-full mt-5">
            <label className="font-bold cursor-pointer" htmlFor="title">
              Pdf Title
            </label>{" "}
            <br />
            <input
              onChange={handleInput}
              className="border w-full border-purple-200 mt-3 p-3 "
              type="text"
              name="title"
              placeholder="আপনার পি ডি এফ-এর টাইটেল দেন..."
              id="title"
              required={true}
            />
          </div>

          <div className="mt-6">
            <label className=" font-bold cursor-pointer">
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

export default AddPdf;
