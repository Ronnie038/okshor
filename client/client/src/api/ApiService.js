// import { useDispatch } from "react-redux";
// import { addCategories } from "../store/slices/CategorySlices";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// const dispatch = useDispatch();

const getCategory = async () => {
  try {
    const res = await fetch("../../public/file2.json");

    // console.log(FormData);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getIems = () => {
  const Items = fetch("../../public/file.json")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
  return Items;
};

// const fetchData = createAsyncThunk("data/fetchData", async () => {
//   try {
//     const response = await fetch("your-data-url");
//     const jsonData = await response.json();
//     return jsonData;
//   } catch (error) {
//     throw error;
//   }
// });

const getSingleItem = (id) => {
  const Items = fetch("../../public/file.json")
    .then((res) => res.json())
    .then((data) => {
      return data.find((item) => item.id == id);
    })
    .catch((err) => console.log(err));
  return Items;
};
export { getCategory, getSingleItem, getIems };
