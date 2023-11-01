import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import swal from "sweetalert";
import { setTimeformat } from "../../../api/setTimeFormat";

const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const NewsTable = ({ newses, setRefetch }) => {
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
        fetch(`${apiBaseUrl}/news/${id}`, {
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
      <Scrollbars style={{ width: 1400, height: 600 }}>
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full font-serif text-black text-left dark:text-gray-400">
            <thead className="text-xs text-white  bg-[#E52D27] dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SN
                </th>
                {/* {!newses[0]?.video && (
								<th scope='col' className='px-6 py-3'>
									Image
								</th>
							)} */}
                <th scope="col" className="px-6 py-3">
                  Date
                </th>

                <th scope="col" className="px-6 py-3">
                  Title
                </th>

                <th scope="col" className="px-6 py-3">
                  Category
                </th>

                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {newses?.map((news, index) => (
                <tr
                  key={news._id}
                  className={`border-b text-black  dark:bg-gray-800 dark:border-gray-700 hover:bg-[#1F2659] dark:hover:bg-gray-600 hover:text-white duration-300 ${
                    index % 2 === 0 ? "even-row" : "odd-row"
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {setTimeformat(news?.updatedAt)}
                  </td>

                  <td className="px-6 py-4">{news.title}</td>

                  <td className="px-6 py-4">{news.categoryTitle}</td>

                  <td className="px-6 py-4">
                    <Icon
                      onClick={() => handleDelete(news._id)}
                      icon="fluent-mdl2:delete"
                      className="text-3xl text-red-700 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/dashboard/updateNews/${news._id}`}>
                      <Icon
                        icon="bx:edit"
                        className="text-3xl text-green-700"
                      />
                    </Link>
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

export default NewsTable;
