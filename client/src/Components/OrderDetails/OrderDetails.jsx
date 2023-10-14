import React, { useEffect, useState, useRef } from "react";
// Adjust the import path
import { useParams } from "react-router-dom";
import Invoice from "../Invoice/Invoice";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const OrderDetails = () => {
  const [orderData, setOrderData] = useState({});
  const { id } = useParams();
  const invoiceRef = useRef(null);

  useEffect(() => {
    getOrder();
  }, [id]);

  const getOrder = async () => {
    try {
      const res = await fetch(`${apiUrl}/order/single/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        // console.log(data);
        setOrderData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-10/12 mx-auto mt-5">
      <div id="print">
        <Invoice order={orderData} />
      </div>
    </div>
  );
};

export default OrderDetails;
