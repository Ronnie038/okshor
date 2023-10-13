import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
// import image1 from '../../../assets/KidsNewItems/img2.png';
// import icon1 from '../../../assets/Fav icon/Rectangle 284.png';
// import swal from "sweetalert";
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
              console.log(reload);
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

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product Id
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
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
                Edit Product
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product._id}
                </th>
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
                <td className="px-6 py-4">
                  <Link to={`/dashboard/updateProduct/${product._id}`}>
                    <Icon icon="bx:edit" className="text-3xl text-[#3B95B0]" />
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Icon
                    onClick={() => handleDelete(product._id)}
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

export default ProductTable;
