import React, { useEffect, useState } from "react";
// import image from '../../../assets/ManNewItems/img1.png';
import OrderList from "../Orders/OrderList";

const OrderTable = ({ orders }) => {
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
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Product Price
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                update
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
							>
								645958160205045
							</th>
							<td className='px-6 py-4'>13/09/2023</td>
							<td className='px-6 py-4'>
								<div className='flex gap-1'>
									<div className='h-16 w-16 rounded-md overflow-hidden'>
										<img
											src='https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
											alt='Image'
											className='object-cover object-center h-full w-full'
										/>
									</div>
								</div>
							</td>
							<td className='px-6 py-4'>Gray Shoes</td>
							<td className='px-6 py-4'>02</td>
							<td className='px-6 py-4'>550$</td>
							<td className='px-6 py-4'>Sakibal Hasan</td>
							<td className='px-6 py-4'>01700000012</td>
							<td className='px-6 py-4'>Complete</td>
						</tr> */}
            {orders?.map((item) => (
              <OrderList order={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderTable;
