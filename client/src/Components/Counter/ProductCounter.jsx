import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../store/slices/CartSlices";
// import { updateQuantity } from '../store/slices/CartSlices';

const ProductCounter = ({ item }) => {
  const dispatch = useDispatch();
  const [itemQuantity, setItemQuantity] = useState(
    item?.quantity ? item?.quantity : 1
  );

  const handleDcrement = () => {
    if (itemQuantity < 2) {
      return;
    }
    setItemQuantity((prevState) => prevState - 1);
    // console.log(itemQuantity);
  };

  const handleIncrement = () => {
    setItemQuantity((prevState) => prevState + 1);
  };

  useEffect(() => {
    dispatch(updateQuantity({ id: item?._id, quantity: itemQuantity }));
  }, [itemQuantity]);

  return (
    <>
      <div className="flex">
        <button
          onClick={() => handleDcrement()}
          className="border-black border px-5 py-3 text-2xl font-semibold"
        >
          -
        </button>
        <input
          value={itemQuantity}
          type="text"
          disabled
          className=" border-y w-28 bg-white focus:outline-none  border-black py-2 text-center text-xl"
          defaultValue="0"
        />
        <button
          onClick={() => handleIncrement()}
          className="border-black border px-5 py-3 text-2xl font-semibold"
        >
          +
        </button>
      </div>

      {/* <div className="flex items-center w-52">
      <input
        type="text"
        Value={quantity}
        // disabled
        // onClick={updateQuantity}
        className="text-center text-2xl disabled font-semibold w-full input rounded-none border-black focus:outline-none"
      />
      <div className="flex flex-col-reverse gap-1 border-y-[1px] border-r-[1px] border-black py-[5px] px-4">
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
    </div> */}
    </>
  );
};

export default ProductCounter;
