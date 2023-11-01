import { Icon } from "@iconify/react";

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
        swal("Your news item is safe!");
      }
    });
  };

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                pdf Id
              </th>
              {/* {!pdfs[0]?.video && (
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
              )} */}

              <th scope="col" className="px-6 py-3">
                Title
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Category
              </th> */}

              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {pdfs?.map((news) => (
              <tr
                key={news._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {news._id}
                </th>

                <td className="px-6 py-4">{news.title}</td>

                <td className="px-6 py-4">
                  <Icon
                    onClick={() => handleDelete(news._id)}
                    icon="fluent-mdl2:delete"
                    className="text-3xl text-red-700"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PdfTable;
