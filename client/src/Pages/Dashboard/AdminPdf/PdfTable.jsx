import { Icon } from "@iconify/react";
import { Scrollbars } from "react-custom-scrollbars-2";
import swal from "sweetalert";

const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const PdfTable = ({ pdfs, setRefetch }) => {
  // ! ====> Delet Product
  const handleDelete = (id) => {
    console.log("delet id", id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this news!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`${apiBaseUrl}/pdf/${id}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              setRefetch((prev) => !prev);
            }
          });
        // ! ====> Aleart
        swal("Your news item has been deleted !", {
          icon: "success",
        });
      } else {
        swal("Your PDF file is secure.");
      }
    });
  };

  function formatDate(dateString) {
    const dateOptions = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    return formattedDate;
  }

  return (
    <>
      <Scrollbars style={{ width: 1200, height: 600 }}>
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full font-serif text-center  text-black  dark:text-gray-400">
            <thead className=" text-white bg-[#E52D27] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SN
                </th>
                <th scope="col" className="px-6 py-3">
                  pdf Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>

                <th scope="col" className="px-6 py-3">
                  Title
                </th>

                <th scope="col" className="px-6 py-3 cursor-pointer">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {pdfs?.map((news, index) => (
                <tr
                  key={news._id}
                  className={` border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-[#1F2659] dark:hover:bg-gray-600 hover:text-white duration-500  ${
                    index % 2 == 0 ? "even-row" : "odd-row"
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4  whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4   whitespace-nowrap dark:text-white"
                  >
                    {news._id}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4   whitespace-nowrap dark:text-white"
                  >
                    {formatDate(news.updatedAt)}
                  </th>

                  <td className="px-6 py-4 dark:text-white">{news.title}</td>

                  <td className="px-6 py-4 flex justify-center ">
                    <Icon
                      onClick={() => handleDelete(news._id)}
                      icon="fluent-mdl2:delete"
                      className="text-3xl text-red-700 cursor-pointer "
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Scrollbars>
    </>
  );
};

export default PdfTable;
