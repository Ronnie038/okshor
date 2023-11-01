import React, { useEffect, useState } from "react";
// import NewsTable from "./PdfTable";
import PdfTable from "./PdfTable";
// import { newsCategory } from "../../../api/fakeData/fakedata";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AdminPdf = () => {
  const [pdf, setPdf] = useState([]);
  // const [category, setCategory] = useState(newsCategory[0].category);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    fetch(`${apiUrl}/pdf`)
      .then((res) => res.json())
      .then((data) => setPdf(data.data))
      .catch((error) => console.log(error));
  }, [refetch]);
  return (
    <div className="w-11/12 mx-auto">
      <p className="text-3xl my-8 font-semibold"> Pdf</p>
      <div className="flex gap-10">
        <div className="border text-center border-green-500 rounded-lg w-[200px] py-8 px-5">
          <p>Total News</p>
          <p className="text-4xl mt-3 font-semibold">{pdf?.length}</p>
        </div>
      </div>
      <div className="mt-8 md:grid-cols-2 grid-cols-1">
        <PdfTable pdfs={pdf} setRefetch={setRefetch} />
      </div>
    </div>
  );
};

export default AdminPdf;
