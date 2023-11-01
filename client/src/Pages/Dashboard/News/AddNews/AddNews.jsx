import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import ReactQuill from "react-quill";

import { modules, newsCategory } from "../../../../api/fakeData/fakedata";

import toast from "react-hot-toast";
import { createNewsService } from "../../../../api/newsService";

const AddNews = () => {
  const [mainDescription, setMainDescription] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [video, setVideo] = useState("");
  const isVideo = newsCategory[selectedCategoryIndex - 1]?.category == "video";
  // console.log(mainDescription);
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
      category: newsCategory[selectedCategoryIndex - 1].category,
    };

    if (video) {
      newFormData["video"] = video;
      return createNewsService(
        JSON.stringify(newFormData),
        setLoading,
        toast,
        form,
        setSelectedImages
      );
    }

    const formDataObj = new FormData();
    formDataObj.append("news", JSON.stringify(newFormData));
    formDataObj.append("images", selectedImages[0]);

    // console.log(formDataObj);
    createNewsService(
      formDataObj,
      setLoading,
      toast,
      form,
      setSelectedImages,
      setMainDescription
    );
  };

  const handleImageChange = (e) => {
    let files = e.target.files;
    // console.log({ files });
    const imageList = [];
    const newLength = files.length + selectedImages.length;

    const isImageQuantityValid =
      files.length > 4 || selectedImages.length > 4 || newLength > 4;

    if (isImageQuantityValid) {
      setSelectedImages([]);
      e.target.value = "";
      return alert("image cannot be more than 5 ");
    }

    setSelectedImages([...files]);
  };
  const handleRemoveSelectedImage = (index) => {
    const images = [...selectedImages];
    const deletedImage = images.splice(index, 1);
    setSelectedImages(images);
  };

  return (
    <div className="w-11/12 mx-auto">
      {" "}
      <h1 className="text-3xl my-8 font-semibold">Add News</h1>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <div className="w-full">
            <label className="font-bold cursor-pointer" htmlFor="title">
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
            />
          </div>
          <div className="flex mt-5 font-bold">
            <div className="w-full mt-3 flex gap-5">
              <label className="font-bold cursor-pointer" htmlFor="category">
                Category
              </label>{" "}
              <br />
              <select
                required
                name="categoryTitle"
                onChange={(e) => {
                  handleInput(e);
                  setSelectedCategoryIndex(e.target.selectedIndex);
                }}
                className="mb-2 border py-1 px-5 font-normal"
                id=""
              >
                <option value="">Select Category</option>
                {newsCategory.map((item, index) => (
                  <option value={item.categoryTitle} key={index}>
                    {item.categoryTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {!isVideo && (
            <div className="w-full mt-5">
              <div className="flex  gap-6">
                <div className="w-full">
                  <label className=" font-bold cursor-pointer">Image</label>{" "}
                  <br />
                  <input
                    autoComplete="off"
                    required
                    type="file"
                    name="images"
                    // accept='image/*'
                    onChange={handleImageChange}
                    className="w-full border-purple-200 p-3 mt-3"
                    // onBlur={handleInputBlur}
                  />
                  <br />
                </div>
              </div>
              {/*//^ Image box    */}

              <div className="flex flex-wrap w-full min-h-[83px] mt-6">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        margin: "5px",
                      }}
                    />
                    <Icon
                      icon="lucide:delete"
                      className="text-xl text-red-700 absolute cursor-pointer top-0 right-0"
                      onClick={() => handleRemoveSelectedImage(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {isVideo && (
            <div className="w-full">
              <label className="font-bold cursor-pointer" htmlFor="title">
                Video Link
              </label>{" "}
              <br />
              <input
                onChange={(e) => {
                  setVideo(e.target.value);
                  setSelectedImages([]);
                }}
                className="border w-full border-purple-200 mt-3 p-3 "
                type="text"
                name="video"
                placeholder="video link here"
                id="title"
                required={true}
              />
            </div>
          )}
          <div>
            <label
              htmlFor="shortDesc"
              className="cursor-pointer my-2 inline-block font-bold"
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
              className="border w-full p-5"
              placeholder="write here ..."
            ></textarea>
          </div>

          <div className="mt-6">
            <label className=" font-bold  cursor-pointer">
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
              className="flex justify-center btn items-center bg-primary hover:bg-secondary rounded-none py-3 px-8 text-[#F5F5F5]"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNews;
