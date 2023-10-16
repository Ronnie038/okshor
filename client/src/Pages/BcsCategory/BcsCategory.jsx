import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import Prili from "../../Components/Prili/Prili";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchBcsNewses,
  getFilteredBcsNewses,
} from "../../store/slices/bcsNewsSlices";
import Prili from "../../Components/Prili/Prili";

const BcsCategory = () => {
  const dispatch = useDispatch();
  const { status, subcategory, filteredData } = useSelector(
    (state) => state.bcsNewses
  );
  const [activeSubcategory, setActiveSubcategory] = useState(subcategory[0]);

  const { category } = useParams();
  console.log(category);
  useEffect(() => {
    // Set the active subcategory
    setActiveSubcategory(subcategory[0]);
  }, [subcategory]);

  useEffect(() => {
    dispatch(getFilteredBcsNewses(activeSubcategory));
  }, [activeSubcategory]);

  useEffect(() => {
    // Fetch bcsNewses when the category changes
    dispatch(fetchBcsNewses(category));

    // Cleanup function for the subscription (if necessary)
    return () => {
      // Implement any necessary cleanup here (e.g., canceling ongoing requests)
    };
  }, [category, dispatch]);
  if (status === "loading")
    return (
      <div className=" fixed h-full w-full flex justify-center items-center">
        <span className="text-3xl">loading...</span>
      </div>
    );
  return (
    <div>
      <div>
        <div>
          <div className="w-10/12 mx-auto ">
            <div className="flex justify-center mt-8 gap-4 font-bold">
              {subcategory?.map((news, index) => (
                <div key={index} className="cursor-pointer">
                  {" "}
                  <div
                    onClick={() => setActiveSubcategory(news)}
                    className={` ${
                      activeSubcategory === news
                        ? "text-[#C21820] font-extrabold border-b-2 border-[#C21820]"
                        : "text-gray-500 font-extrabold border-gray-400"
                    } px-6   py-3  `}
                  >
                    <p className="font-extrabold">{news}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Prili data={filteredData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BcsCategory;
