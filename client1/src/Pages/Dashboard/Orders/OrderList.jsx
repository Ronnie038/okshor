import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const OrderList = ({ order, index }) => {
  const {
    address,
    user,
    email,
    _id,
    contactNumber,
    price,
    products,
    paidStatus,
    orderStatus,
    updatedAt,
  } = order;
  //   [
  //     //   "Order Placed",
  //     "Processing",
  //     "Shipped",
  //     "Delivered",
  //     "canceled",
  //   ];
  const [statusColor, setStatusColor] = useState("");

  useEffect(() => {
    if (orderStatus === "Delivered") {
      setStatusColor("bg-green-400");
    } else if (orderStatus === "canceled") {
      setStatusColor("bg-red-400");
    } else if (orderStatus === "Processing") {
      setStatusColor("bg-[#54b7d3]");
    } else if (orderStatus == "Shipped") {
      setStatusColor("bg-[#1e91cf]");
    } else {
      setStatusColor("bg-[#f3a638]");
    }
  }, []);

  //   const date = new Date();
  function formatDate(dateString) {
    const dateOptions = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    return formattedDate;
  }

  // console.log(statusColor);
  //   className="py-10 text-center"
  return (
    <>
      <tr
        className={`py-5  hover:bg-[#1F2659] border-b  hover:text-white duration-500 ${
          index % 2 === 0 ? "even-row" : "odd-row"
        }`}
      >
        <td>{index}</td>
        <td>{_id}</td>
        {/* <td>{date.toLocaleDateString("en-US", updatedAt)}</td> */}
        <td>{formatDate(updatedAt)}</td>

        <td className="py-6 text-center">
          {products?.map((item, idx) => (
            <img key={idx} src={item.image} className="h-20" alt="" />
          ))}
        </td>
        <td className="py-6 text-center">
          {products?.map((item) => (
            <>
              <p>{item.title}</p>
            </>
          ))}
        </td>

        <td scope="row">
          {products?.map((item) => (
            <>
              <p>{item.quantity}</p>
            </>
          ))}
        </td>
        <td scope="row">
          {products?.map((item) => (
            <>
              <p>{item.price}</p>
            </>
          ))}
        </td>
        <td>{price}</td>

        <td>{user?.name}</td>
        <td>{contactNumber}</td>

        <td>
          <span
            className={`${statusColor} text-white p-2 rounded-md mx-2 font-bold`}
          >
            {orderStatus}
          </span>
        </td>

        <td>
          <Link to={`${order?._id}`} className=" font-bold">
            <div className="flex items-center ">
              <span>Edit</span>{" "}
              <Icon
                icon="mingcute:edit-line"
                className="text-3xl text-green-500"
              />
            </div>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default OrderList;
