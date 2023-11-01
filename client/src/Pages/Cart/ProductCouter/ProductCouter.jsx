import React, { useState } from "react";
import { Icon } from "@iconify/react";

const ProductCouter = ({ quantity, setQuantity }) => {
  // const [quantity, setQuantity] = useState(1);

  const updateCount = (action) => {
    if (action === "increment") {
      setQuantity((quantity) => quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="flex items-center w-52 gap-2">
      <input
        type="text"
        Value={quantity}
        // disabled
        // onClick={updateQuantity}
        className="text-center text-2xl disabled font-semibold w-1/2 border input rounded-none border-black "
      />
      <div className="flex flex-col-reverse gap-1 border-y-[1px] border-x-[1px] border-black py-[5px] px-4">
        <button
          onClick={() => updateCount("decrement")}
          className=" bg-transparent border-none"
        >
          <Icon icon="teenyicons:down-solid" />
        </button>
        <button
          onClick={() => updateCount("increment")}
          className=" bg-transparent border-none"
        >
          <Icon icon="teenyicons:up-solid" />
        </button>
      </div>
    </div>
  );
};

export default ProductCouter;
