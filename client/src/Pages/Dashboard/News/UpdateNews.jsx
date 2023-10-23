import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import ReactQuill from "react-quill";

import { modules, newsCategory } from "../../../api/fakeData/fakedata";

import toast from "react-hot-toast";
import {
  createNewsService,
  getSingeNewsService,
  updateNewsService,
} from "../../../api/newsService";
import { useParams } from "react-router-dom";

const UpdateNews = () => {
  const { id } = useParams();

  const [news, setNews] = useState({});

  const [mainDescription, setMainDescription] = useState("");

  const [formData, setFormData] = useState({});

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
      mainDescription,
    };
    // return console.log(newFormData);
    updateNewsService(id, JSON.stringify(newFormData), setLoading, toast);
  };

  console.log(formData);

  useEffect(() => {
    getSingeNewsService(id, setNews, setMainDescription);
  }, [id]);

  return (
    <div className="w-11/12 mx-auto">
      {" "}
      <h1 className="text-3xl my-8 font-semibold">Add News</h1>
      <form action="" onSubmit={handleSubmit}>
        <div>
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
              placeholder="আপনার খবরের টাইটেল দেন..."
              id="title"
              required={true}
              defaultValue={news?.title}
            />
          </div>
          <div className="flex m-5 font-bold">
            <div className="w-full mt-3">
              <h4 className="bg-slate-400 text-center">{news.categoryTitle}</h4>
            </div>
          </div>

          <div>
            <label
              htmlFor="shortDesc"
              className=" font-semibold  cursor-pointer"
            >
              Short Description
            </label>{" "}
            <br />
            <textarea
              required
              onChange={handleInput}
              name="description"
              id="shortDesc"
              cols="30"
              rows="3"
              defaultValue={news?.description}
              className="border w-full p-5"
              placeholder="write here ..."
            ></textarea>
          </div>
          <div className="mt-6">
            <label className=" font-semibold  cursor-pointer">
              Main Description
            </label>{" "}
            <br />
            <div className="quill-container mt-3">
              <ReactQuill
                theme="snow"
                value={mainDescription}
                onChange={setMainDescription}
                modules={modules}
                className=""
              />
            </div>
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

export default UpdateNews;
