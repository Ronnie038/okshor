import { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Icon } from "@iconify/react";
// import image1 from '../../../assets/KidsNewItems/img2.png';
// import icon1 from '../../../assets/Fav icon/Rectangle 284.png';
import swal from "sweetalert";
import { Link } from "react-router-dom";
const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const ProductTable = ({ products, setReload }) => {
  // ! ====> Delet Product
  const handleDelete = (id) => {
    console.log("delet id", id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`${apiBaseUrl}/products/${id}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              setReload((prev) => !prev);
            }
          });
        // ! ====> Aleart
        swal("Your product item has been deleted !", {
          icon: "success",
        });
      } else {
        swal("Your product item is safe!");
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
      <Scrollbars style={{ width: 1400, height: 600 }}>
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-center table-auto  dark:text-gray-400">
            <thead className="font-serif  text-white text-xs  bg-[#E52D27] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SN
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3">
                  Regular Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Offer Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Discount
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => (
                <tr
                  key={product._id}
                  className={`border-b text-black  dark:bg-gray-800 dark:border-gray-700 hover:bg-[#1F2659] dark:hover:bg-gray-600 hover:text-white duration-300  ${
                    index % 2 === 0 ? "even-row" : "odd-row"
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-whitewhitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td>{product._id}</td>
                  <td>{formatDate(product.updatedAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <div className="h-16 w-16 rounded-md overflow-hidden">
                        <img
                          src={product.image}
                          alt="Image"
                          className="object-cover object-center h-full w-full"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">{product.regularPrice}৳</td>
                  <td className="px-6 py-4">{product.offerPrice}৳</td>
                  <td className="px-6 py-4">{product.offerPercentage}%</td>
                  <td className="px-6 py-4  ">
                    <Link to={`/dashboard/updateProduct/${product._id}`}>
                      <Icon
                        icon="bx:edit"
                        className="text-3xl text-green-500"
                      />
                    </Link>
                  </td>
                  <td className="px-6 py-4 ">
                    <Icon
                      onClick={() => handleDelete(product._id)}
                      icon="fluent-mdl2:delete"
                      className="text-3xl cursor-pointer  text-red-700 "
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

export default ProductTable;
