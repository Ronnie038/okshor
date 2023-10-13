import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
// import {
// 	BarChart,
// 	Bar,
// 	Cell,
// 	XAxis,
// 	YAxis,
// 	CartesianGrid,
// 	Tooltip,
// 	Legend,
// 	ResponsiveContainer,
// 	LineChart,
// 	Line,
// } from 'recharts';

const Chart = () => {
  const [divWidth, setDivWidth] = useState(0);

  useEffect(() => {
    // Function to update the div width
    const updateDivWidth = () => {
      const divElement = document.getElementById("chart"); // Replace with your div's ID
      if (divElement) {
        const width = divElement.getBoundingClientRect().width;
        setDivWidth(width);
      }
    };

    // Attach the event listener
    window.addEventListener("resize", updateDivWidth);

    // Initial width calculation
    updateDivWidth();

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", updateDivWidth);
    };
  }, []);

  // console.log(divWidth);
  const data = [
    {
      name: "Jan",

      pv: 0,
      amt: 5,
    },
    {
      name: "Feb",

      pv: 0,
      amt: 4,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 0,
      amt: 3,
    },
    {
      name: "April",
      uv: 2780,
      pv: 0,
      amt: 2,
    },
    {
      name: "May ",
      uv: 1890,
      pv: 0,
      amt: 2.5,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 0,
      amt: 3,
    },
    {
      name: "July",
      uv: 2390,
      pv: 0,
      amt: 3,
    },
    {
      name: "August",
      uv: 2390,
      pv: 0,
      amt: 3,
    },
    {
      name: "September",
      uv: 2390,
      pv: 0,
      amt: 3,
    },
    {
      name: "October",
      uv: 2390,
      pv: 0,
      amt: 3,
    },
    {
      name: "November",
      uv: 2390,
      pv: 0,
      amt: 3,
    },
    {
      name: "December",
      uv: 2390,
      pv: 0,
      amt: 3,
    },
  ];

  return (
    <div
      className="border border-green-600 flex-1  rounded-2xl w-full"
      id="chart"
    >
      <div className="flex justify-between lg:px-4 mt-4">
        <p className="text-2xl font-semibold">Claims Over the Years</p>
        <div>
          <p className="text-[#5041BC] flex gap-2 text-xl font-semibold items-center">
            <Icon icon="icon-park-outline:dot" /> Total Sales
          </p>
          <p className="text-[#EA8F95] flex gap-2 text-xl font-semibold items-center">
            <Icon icon="icon-park-outline:dot" /> Total Income
          </p>
        </div>
      </div>
      <div className="">
        <BarChart width={divWidth} height={300} data={data}>
          <XAxis dataKey="name"></XAxis>
          <YAxis />
          <Tooltip></Tooltip>
          <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default Chart;
