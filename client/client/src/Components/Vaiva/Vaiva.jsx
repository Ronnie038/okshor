import React from "react";

const Vaiva = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div>
        {data?.data?.map((product, idx) => (
          <div key={idx}>{product?.text}</div>
        ))}
      </div>
    </div>
  );
};

export default Vaiva;
