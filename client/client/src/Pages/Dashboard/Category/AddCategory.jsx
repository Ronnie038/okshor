import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
// import {
// 	createCategoryService,
// 	deleteCategoryService,
// 	getAllCategoryService,
// } from '../../../Api/categoryServices';
// import Category from "../../../components/PageCategories/Category";
import toast from "react-hot-toast";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);

  const [image, setImage] = useState({});
  const [category, setCategory] = useState({});
  const [refetch, setRefetch] = useState(false);

  const handleImageChange = (e) => {
    let files = e.target.files;
    setImage(files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryObj = new FormData();
    categoryObj.append("category", JSON.stringify(category));

    categoryObj.append("images", image);

    createCategoryService(categoryObj, toast, setRefetch);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCategory({ ...category, [name]: value });
  };

  const handleDeleteDeleteCategory = (index, subIndex) => {
    const confirm = window.confirm("Are you sure to delete this item");
    if (!confirm) return;
    const copiedCategories = [...categories];
    const newSubcategories = copiedCategories[index].subcategories;
    newSubcategories.splice(subIndex, 1);
    setCategories(copiedCategories);
    const updatedCategory = copiedCategories[index];
    deleteCategoryService(
      updatedCategory._id,
      updatedCategory,
      toast,
      setRefetch
    );
  };

  useEffect(() => {
    getAllCategoryService(setCategories);
  }, [refetch]);
  return (
    <div className="w-11/12 mx-auto p-10">
      <h2 className="text-3xl font-semibold my-10 "> Categories</h2>

      <div className="flex">
        {categories?.map((category, idx) => (
          <div key={category._id} className="flex-1 border ">
            <h3 className=" text-2xl font-bold capitalize px-4 border-b-2">
              {category.name}
            </h3>

            {category.subcategories?.map((sub, subIndex) => (
              <div
                key={sub.id}
                className="my-5 p-5 relative flex items-center gap-5"
              >
                <img
                  height={50}
                  width={50}
                  className=" "
                  src={sub.image}
                  alt=""
                />
                <span className="text-lg font-bold capitalize">
                  {sub.title}
                </span>
                <Icon
                  onClick={() => handleDeleteDeleteCategory(idx, subIndex)}
                  icon="material-symbols:delete-outline"
                  className="text-2xl absolute top-0 right-5 text-red-500"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="my-5">
        <form className="border p-5 flex " onSubmit={handleSubmit}>
          <div className="flex-1">
            <label htmlFor="" className="font-semibold">
              Category Image
            </label>
            <input
              autoComplete="off"
              required
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border-purple-200 p-3 mt-3"

              // onBlur={handleInputBlur}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="" className="font-semibold">
              Sections
            </label>
            <br />
            <select onChange={handleInputChange} name="name" id="" required>
              <option value="">Select Section</option>
              <option value="men">Men</option>
              <option value="women">women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="" className="font-semibold my-2">
              SubCategory
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              name="title"
              className="border p-2 rounded-sm outline-blue-500"
              placeholder="subcategory"
              required
            />
          </div>
          <button className="btn bg-blue-950 bg-opacity-80 text-white ">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
