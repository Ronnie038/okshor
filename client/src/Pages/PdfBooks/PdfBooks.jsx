import { Icon } from "@iconify/react";
import pdfImage from "../../assets/Home/pdfImg.png";
import { useEffect, useState } from "react";
import { setDocumentTitle } from "../../Components/UseDocumentTitle/UseDocumentTitle";
const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const PdfBooks = () => {
  const [categories, setCategories] = useState([]);

  const [pdfData, setPdfData] = useState([]);
  const [pdfFilteredData, setPdfFilteredData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const handleDownload = async (pdf) => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/pdf/download?pdf=${pdf.pdfUrl}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdf.title; // Set the desired download filename
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setPdfFilteredData(
      pdfData.filter((item) => item.category == activeCategory)
    );
  }, [activeCategory]);

  setDocumentTitle(`অক্ষর | ${pdfFilteredData[0]?.category}`);
  useEffect(() => {
    fetch(`${apiBaseUrl}/pdf`)
      .then((res) => res.json())
      .then((data) => {
        setPdfData(data.data);
        setActiveCategory(data.categories[0]);
        setCategories(data.categories);
        setPdfFilteredData(
          data.data.filter((item) => item.category == data.categories[0])
        );
      });
  }, []);

  return (
    <div>
      <div>
        <div className="flex justify-center mt-8 gap-4 font-bold">
          {categories?.map((news, index) => (
            <div key={index} className="cursor-pointer">
              {" "}
              <div
                onClick={() => setActiveCategory(news)}
                className={` ${
                  activeCategory === news
                    ? "text-[#C21820] font-extrabold border-b-2 border-[#C21820]"
                    : "text-gray-500 font-extrabold border-gray-400"
                } `}
              >
                <p>{news}</p>
              </div>
            </div>
          ))}
        </div>

        {pdfFilteredData?.map((pdf) => (
          <div
            key={pdf._id}
            className="sm:flex-row flex flex-col  gap-10 mx-auto border rounded mt-7 p-4 w-10/12 bg-gray-200 "
          >
            <div className="w-[20%] mx-auto sm:mx-0">
              <img src={pdfImage} className="w-full" alt="" />
            </div>
            <div className=" w-full sm:w-[50%] flex flex-col justify-center items-center">
              <h2 className=" sm:text-start  mb-3 font-bold uppercase">
                {pdf.title}
              </h2>
              <p className="">{pdf.description}</p>
            </div>
            <div className="sm:w-[30%] w-full flex justify-center items-center">
              {" "}
              <button
                onClick={() => handleDownload(pdf)}
                className="bg-indigo-900   text-white gap-1 items-center font-bold p-2 flex rounded"
              >
                <span>Download</span>{" "}
                <Icon icon="ic:round-download" className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfBooks;
