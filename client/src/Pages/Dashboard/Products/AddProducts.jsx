import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { createProduct } from "../../../api/ProductsServices";
import toast from "react-hot-toast";

const AddProducts = () => {
  const [size, setSize] = useState("");
  const [sizeServices, setSizeServices] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [offerPrice, setOfferPrice] = useState(0);
  const [offerPercentage, setOfferPercentage] = useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedSubcategoryIndex, setSelectedSubcategoryIndex] = useState(0);
  const [newest, setNewest] = useState(false);
  const [formData, setFormData] = useState({});
  const [freeDelevary, setFreeDelivery] = useState(false);

  const [loading, setLoading] = useState(false);

  // dynamic category data
  // const categories = useSelector((state) => state.categories.data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setLoading(true);
    const newFormData = {
      ...formData,

      offerPrice,
      offerPercentage,
      discountPrice,
      newest,
    };

    const formDataObj = new FormData();
    formDataObj.append("product", JSON.stringify(newFormData));
    selectedImages.forEach((image) => {
      formDataObj.append("images", image);
    });
    // console.log(formDataObj);
    createProduct(formDataObj, setLoading, toast, form, selectedImages);
  };

  const handleAddSizeService = (e) => {
    e.preventDefault();
    if (!size) return;
    setSizeServices([...sizeServices, size]);
    setSize("");
  };

  const handleRemoveSizeService = (index) => {
    const service = [...sizeServices];
    service.splice(index, 1);
    setSizeServices(service);
  };

  const handleSizeValue = (e) => {
    const sizeValue = e.target.value;
    setSize(sizeValue);
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleImageChange = (e) => {
    let files = e.target.files;
    // console.log({ files });
    const imageList = [];
    const newLength = files.length + selectedImages.length;

    const isImageQuantityValid =
      files.length > 4 || selectedImages.length > 4 || newLength > 4;

    if (isImageQuantityValid) {
      setSelectedImages([]);
      e.target.value = "";
      return alert("image cannot be more than 5 ");
    }

    setSelectedImages([...selectedImages, ...files]);
  };

  const handleCategoryChange = (event) => {
    const newIndex = event.target.selectedIndex;

    // console.log({ newIndex });
    setSelectedCategoryIndex(newIndex);
    setSelectedSubcategoryIndex(0); // Reset subcategory index when category changes
  };

  const handleSubcategoryChange = (event) => {
    const newIndex = event.target.selectedIndex;
    setSelectedSubcategoryIndex(newIndex);
  };

  const handleRemoveSelectedImage = (index) => {
    const images = [...selectedImages];
    const deletedImage = images.splice(index, 1);
    setSelectedImages(images);
  };

  // Initialize variables
  let newPrice = 0;
  let percentage;
  let discountPrice = 0;
  const handleDiscount = (e) => {
    const { name, value } = e.target;

    // Get input elements by their IDs
    let discountPriceInput = document.getElementById("discountPrice");
    let offerPercentageInput = document.getElementById("offerPercentage");
    let regularPriceInput = document.getElementById("regularPrice");
    let totalInput = document.getElementById("offerPrice");

    // Convert regularPriceInput value to a number
    let regularPrice = Number(regularPriceInput.value);

    // Check if regularPrice is a valid number
    if (!regularPrice || isNaN(regularPrice)) {
      alert("Please provide a valid regular price");
      return;
    }

    if (name === "offerPercentage") {
      newPrice = regularPrice - (regularPrice * Number(value)) / 100;
      discountPrice = regularPrice - newPrice;

      // Update discountPriceInput and totalInput values
      discountPriceInput.value = Math.round(discountPrice);
      totalInput.value = Math.round(newPrice);

      // Set values in the formData object (assuming formData is defined elsewhere)
      formData.discountPrice = Math.round(discountPrice);
      formData.offerPrice = Math.round(newPrice);
      formData.offerPercentage = Number(value);

      // Update state variables (setOfferPrice and setOfferPercentage)
      // Assuming you have functions to update state variables
      setOfferPrice(newPrice);
      setOfferPercentage(Number(value));
    } else if (name === "discountPrice") {
      newPrice = regularPrice - Number(value);
      percentage = (value / regularPrice) * 100;

      // Update offerPercentageInput and totalInput values
      offerPercentageInput.value = Math.round(percentage);
      totalInput.value = Math.round(newPrice);

      // Set values in the formData object (assuming formData is defined elsewhere)
      formData.discountPrice = Math.round(value);
      formData.offerPrice = Math.round(newPrice);
      formData.offerPercentage = Math.round(percentage);

      // Update state variables (setOfferPrice and setOfferPercentage)
      // Assuming you have functions to update state variables
      setOfferPrice(newPrice.toFixed(2));
      setOfferPercentage(percentage.toFixed(2));
    }

    // Check if either offerPercentage or discountPrice is 0 and set newPrice to 0 accordingly
    if (value == 0) {
      newPrice = 0;
      totalInput.value = 0;
      setOfferPrice(0);
    }
  };

  return (
    <div className=" w-11/12 mx-auto" style={{ userSelect: "none" }}>
      <div>
        <h1 className="text-3xl my-10 font-semibold bg-[#1F2659] text-white py-3 px-5">
          Add Products
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2  grid-cols-1 w-full gap-8">
          <div className="w-full">
            <div className="w-full">
              <label className="font-semibold cursor-pointer" htmlFor="name">
                Product title
              </label>{" "}
              <br />
              <input
                onChange={handleInput}
                className="border w-full border-purple-200 mt-3 p-3 "
                type="text"
                name="title"
                placeholder="titl here ..."
                id="name"
                required={true}
              />
            </div>

            <div className="flex w-full gap-6 mt-6">
              <div className="w-1/2">
                <label
                  htmlFor="regularPrice"
                  className="font-semibold cursor-pointer"
                >
                  Product Regular Price
                </label>{" "}
                <br />
                <input
                  min={0}
                  onChange={handleInput}
                  className="border w-full text-center border-purple-200 p-3 mt-3"
                  type="number"
                  name="regularPrice"
                  placeholder="1250 ৳ "
                  id="regularPrice"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="offerPercentage"
                  className="font-semibold cursor-pointer"
                >
                  Discount Percentage
                </label>{" "}
                <br />
                <input
                  onChange={(e) => {
                    handleInput(e);
                    handleDiscount(e);
                  }}
                  min={0}
                  className="border w-full text-center  border-purple-200 p-3 mt-3"
                  type="number"
                  name="offerPercentage"
                  placeholder="10%"
                  id="offerPercentage"
                />
              </div>
            </div>
            <div className="flex w-full gap-6 mt-6">
              <div className="w-1/2">
                <label className=" font-semibold cursor-pointer">
                  Discount Amount
                </label>{" "}
                <br />
                <input
                  onChange={(e) => {
                    handleInput(e);
                    handleDiscount(e);
                  }}
                  min={0}
                  className="border w-full border-purple-200 p-3 mt-3"
                  type="number"
                  name="discountPrice"
                  placeholder="125 ৳"
                  id="discountPrice"
                />
              </div>
              <div className="w-1/2">
                <label className=" font-semibold cursor-pointer">
                  New Discount Price (Product New Price)
                </label>{" "}
                <br />
                <input
                  className="border w-full border-purple-200 p-3 mt-3 placeholder:text-black bg-green-200"
                  type="text"
                  name="offerPrice"
                  placeholder="1125 ৳"
                  id="offerPrice"
                  disabled
                />
              </div>
            </div>
            <div className="my-3 flex gap-5 items-center">
              <label htmlFor="newest" className="cursor-pointer">
                New Product
              </label>
              <input
                onChange={(e) => {
                  setNewest(e.target.checked);
                }}
                type="checkbox"
                name="newest"
                id="newest"
                className="block p-2"
              />
            </div>
            {/* <div className='flex w-full gap-6 mt-6'>
						<div className='w-1/2'>
							<label className=' font-semibold cursor-pointer'>
								Inside Area{' '}
							</label>{' '}
							<br />
							<input
								className='border w-full border-purple-200 p-3 mt-3'
								type='text'
								name=''
								placeholder='60 ৳ '
								id=''
							/>
						</div>
						<div className='w-1/2'>
							<label className=' font-semibold cursor-pointer'>
								Out Side Area
							</label>{' '}
							<br />
							<input
								className='border w-full border-purple-200 p-3 mt-3'
								type='text'
								name=''
								placeholder='100 ৳ '
								id=''
							/>
						</div>
					</div> */}

            {/* <div className='mt-6'>
							<label className='font-semibold cursor-pointer'>
								Mega Offer Name
							</label>{' '}
							<br />
							<input
								onChange={handleInput}
								className='border w-full justify-between border-purple-200  mt-2 p-3 '
								type='text'
								name='megaOffer'
								placeholder='Eid Festival Mega offer   '
								id=''
							/>
						</div> */}
            <div className="flex w-full gap-6 mt-6">
              {/* <div className='w-1/2'>
								<label
									htmlFor='freeDelivery'
									className='font-semibold cursor-pointer'
									style={{ userSelect: 'none' }}
								>
									Free Delivery
								</label>{' '}
								<br />
								<input
									onChange={(e) => setFreeDelivery(e.target.checked)}
									className='border w-[20px]   border-purple-200 bg-gray-700 h-[20px] p-3 mt-3'
									type='checkbox'
									name='freeDelivery'
									placeholder='Free Delivery'
									id='freeDelivery'
								/>
							</div> */}
            </div>
          </div>

          {/* secon ............ */}
          <div className="w-full">
            <div className="flex  gap-6">
              <div className="w-full">
                <label className=" font-semibold cursor-pointer">
                  Product Image
                </label>{" "}
                <br />
                <input
                  autoComplete="off"
                  required
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full border-purple-200 p-3 mt-3"
                  // onBlur={handleInputBlur}
                />
                <br />
              </div>
            </div>
            {/* Image box    */}

            <div className="flex flex-wrap w-full min-h-[83px] mt-6">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      margin: "5px",
                    }}
                  />
                  <Icon
                    icon="lucide:delete"
                    className="text-xl text-red-700 absolute cursor-pointer top-0 right-0"
                    onClick={() => handleRemoveSelectedImage(index)}
                  />
                </div>
              ))}
            </div>
            <div className="flex w-full gap-6 mt-6">
              <div className="w-1/2">
                <label htmlFor="sku" className="font-semibold cursor-pointer">
                  Product SKU
                </label>{" "}
                <br />
                <input
                  onChange={handleInput}
                  className="border w-full border-purple-200 p-3 mt-3"
                  type="text"
                  name="sku"
                  placeholder="MEGA-JEWE-177-1"
                  id="sku"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="stock" className="font-semibold cursor-pointer">
                  Product Stock
                </label>{" "}
                <br />
                <input
                  min={0}
                  onChange={handleInput}
                  className="border w-full text-center border-purple-200 p-3 mt-3"
                  type="number"
                  name="stock"
                  placeholder="10,000"
                  id="stock"
                />
              </div>
            </div>

            {/* Image box end */}
            {/* <div className='w-full mt-6 '>
							<label htmlFor='brand' className=' font-semibold cursor-pointer'>
								Product Brand{' '}
							</label>{' '}
							<br />
							<input
								className='border w-full border-purple-200 p-3 mt-3'
								type='text'
								name='brand'
								placeholder='Apex,Bata'
								id='brand'
							/>
						</div> */}
            {/* <div className='flex w-full gap-6 mt-6 h-[83px]'>
							<div className='form-group mb-3'>
								<span className='mb-2 md:text-xl'>Category</span>
								<br /> */}
            {/* <select
									autoComplete='off'
									required
									onChange={(e) => {
										handleCategoryChange(e);
										handleInput(e);
									}}
									className='form-control text-xl capitalize'
									type='text'
									name='category'
								>
									<option value=''> Select Category</option>
									{categories.map((item, idx) => (
										<option key={idx} value={item.name}>
											{item.name}
										</option>
									))}
								</select> */}
            {/* </div>
					<div className='form-group mb-3'>
						<span htmlFor='subcategory' className='mb-2 mr-2'>
							Subcategory
						</span> */}

            {/* <select
									autoComplete='off'
									onChange={(e) => {
										handleSubcategoryChange(e);
										handleInput(e);
									}}
									className='form-control text-xl capitalize'
									type='text'
									name='subcategory'
									required
								>
									<option value=''>Choose subcategory</option>

									{categories[selectedCategoryIndex - 1]?.subcategories?.map(
										(item, idx) => (
											<option key={idx} value={item.title}>
												{item.title}
											</option>
										)
									)}
								</select> */}
            {/* </div>
						</div> */}

            {/* <div className='mt-6 '>
							<div className='flex w-full gap-6 mt-6'>
								<div className='w-1/2'>
									<label className=' font-semibold cursor-pointer'>
										Start Date
									</label>{' '}
									<br />
									<input
										className='border w-full border-purple-200 p-3 mt-2'
										type='date'
										name='offerStartDate'
										placeholder='12.00 am 29 July 2023  '
										id=''
									/>
								</div>
								<div className='w-1/2'>
									<label className=' font-semibold cursor-pointer'>
										Ending Date
									</label>{' '}
									<br />
									<input
										className='border w-full border-purple-200 p-3 mt-2'
										type='date'
										name='offerEndingDate'
										placeholder='12.00 am 07 Aug 2023 '
										id=''
									/>
								</div>
							</div>
						</div> */}
            {/* <div className='mt-6'>
							<div className='flex gap-8 items-center'>
								<label className='font-semibold cursor-pointer '>
									Create Size Guide
								</label>
							</div>

							<div className='flex'>
								<div className='w-full'>
									<div className='flex lg:flex-nowrap md:flex-nowrap flex-wrap items-center'>
										<div className='w-full border'>
											<div className='flex justify-center items-center'>
												<input
													onChange={(e) => handleSizeValue(e)}
													value={size}
													type='text'
													placeholder='Size'
													className='w-full p-3 rounded-none text-center'
												/>
											</div>
										</div>
									</div>
								</div>
								<div className='text-2xl flex justify-center items-center'>
									<span
										onClick={(e) => handleAddSizeService(e)}
										className='btn bg-[#282B35] text-white rounded-none hover:bg-[#3B95B0]'
									>
										<Icon icon='icomoon-free:plus' />
									</span>
								</div>
							</div>
							<div className='space-x-5'>
								{sizeServices?.map((item, index) => (
									<span key={index}>
										{item}{' '}
										<span
											onClick={() => handleRemoveSizeService(index)}
											className='btn px-2 border-l border-0 bg-transparent hover:bg-transparent rounded-none'
										>
											<Icon
												icon='lucide:delete'
												className='text-xl text-red-700'
											/>
										</span>
									</span>
								))}
							</div>
						</div> */}
          </div>
        </div>
        <div className="mt-6">
          <label className=" font-semibold cursor-pointer">
            Product Descripton
          </label>{" "}
          <br />
          <textarea
            onChange={handleInput}
            className="border p-4 w-full"
            placeholder="message"
            name="description"
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>

        <div className="flex justify-end my-10">
          <button
            type="submit"
            className="flex justify-center btn items-center bg-[#282B35] hover:bg-[#3B95B0] rounded-none py-3 px-8 text-[#F5F5F5]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
