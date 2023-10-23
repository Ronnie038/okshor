import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import logo from "../../assets/logo/main_logo.png";
const Invoice = ({ order }) => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  const invoiceRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };
  console.log(order);
  return (
    <div className="bg-white">
      <div className="max-w-screen-2xl mx-auto  p-8 rounded-lg shadow-md border ">
        <div>
          <div className="text-right">
            <button
              onClick={handlePrint}
              className="mt-4 flex justify-center font-semibold gap-2 items-center ml-auto bg-indigo-900 text-white px-4 py-2 rounded
           "
            >
              Print Invoice <Icon icon="material-symbols:download" />
            </button>
          </div>
        </div>
        <div className="" id="print-section" ref={invoiceRef}>
          <div className="py-5 flex justify-between gap-5 border-b-2">
            <div>
              <img src={logo} alt="" className="md:w-80 w-60 -ml-6" />
              <div className="pt-5 font-bold">
                {/* <p> Time : {date.toLocaleTimeString()}</p> */}
                <p> Date : {date.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="py-5 flex justify-between gap-5 border-b-2">
            <div>
              <h1 className="font-bold text-xl py-2">Bill From:</h1>
              {/* <p className="font-bold text-xl p-2 text-white inline-block bg-gray-500">
                অক্ষর
              </p> */}
              <div>
                {" "}
                <img src={logo} alt="logo" className="w-40 -ml-3" />
              </div>
              <p>
                10 Taher Tower Shopping Center,Shop#219,(1st Floor), <br />
                Gulshan-2,Dhaka-1212., Dhaka, Bangladesh
              </p>
              <p>0123542235</p>
            </div>
            <div>
              <h1 className="font-bold text-xl py-2">Bill To:</h1>
              <p>{order?.user?.name}</p>
              <p>{order?.contactNumber}</p>
              <p>
                {order?.address}, {order?.area}, {order?.city}
              </p>
            </div>
          </div>
          <div className="mb-4 my-5">
            <p>
              <strong>
                {order?.transactionId ? "Transaction ID" : "Order ID"}:
              </strong>{" "}
              {order.transactionId ? order?.transactionId : order._id}
            </p>
            <p className="pt-2">
              <strong>Order Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white uppercase  py-2 text-center bg-gray-500 ">
              Products
            </h3>
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="text-center font-extrabold">Name</th>
                  <th className="text-center font-extrabold">Quantity</th>
                  <th className="text-right font-extrabold pr-5">Price</th>
                </tr>
              </thead>
              <tbody>
                {order?.products?.map((product) => (
                  <tr key={product.id}>
                    <td className="text-center font-bold ">{product.title}</td>
                    <td className="text-center font-bold ">
                      {product.quantity}
                    </td>
                    <td className="text-right pr-3 font-bold justify-end flex items-center">
                      {" "}
                      {product.price}
                      <Icon icon="mdi:currency-bdt" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            {" "}
            <div>
              <p className="my-2 font-bold">
                Delivery Fee : {order.deliveryFee}
              </p>
              <p className="my-2 font-bold">Vat/Tax 5% : {order.vat}</p>
              <div className="mt-6 ">
                <span className="text-lg font-bold items-center bg-green-300 text-black inline-flex rounded-md   px-3 py-2">
                  Total:
                  <Icon icon="mdi:currency-bdt" />
                  {order?.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
