import React, { useState } from "react";
import { Helmet } from "react-helmet";
// import DownloadMobile from '../../components/DownloadMobile/DownloadMobile';
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import { getToUserAddress } from "../../utilities/fakedb";
import AddressModal from "../../components/AddressModal/AddressModal";
import bkashPopup from "../../assets/icons/PaymentIcons/bkash.png";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { LoaderIcon } from "react-hot-toast";
// import Loading from "../../components/Loading/Loading";
// import f from "../../"
import cashOnDeliveryImg from "../../assets/icons/PaymentIcons/img1.png";
import Loading from "../../Components/Loading/Loading";

const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AdedAdress = () => {
  const { user, status, error } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState();
  const [openPayModal, setOpenPayModal] = useState();

  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState(
    location.state?.paymentMethod
  );

  const [paymentImage, setPaymentImage] = useState(
    location.state?.paymentImage
  );

  const {
    cart: products,
    total,
    subTotal,
  } = useSelector((state) => {
    return state.cartItems;
  });
  const userAddressData = getToUserAddress();
  const [order, setOrder] = useState({ ...userAddressData });

  const orderNow = async (e) => {
    e.preventDefault();

    setLoading(true);
    order.products = products;
    order.userId = user?._id;
    order.customer = user?.name;
    order.email = user?.email;
    order.price = total;

    // order.categories = productsCategoris;
    order.vat = Number(subTotal * 0.05);
    order.deliveryFee = 100;

    e.preventDefault();
    // console.log(order);

    swal({
      title: "Are you sure?",
      text: "You want to buy this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`${apiBaseUrl}/order`, {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify(order),
          credentials: "include",
        })
          .then((res) => {
            if (res.ok) {
              localStorage.removeItem("cart");
              window.open(`/orderDone`, "_self");
              window.history.pushState({}, "", "/userProfile");
            }
          })

          .catch((err) => console.log(err))
          .finally(() => {
            setLoading(false);
          });

        swal("Your order has been placed!", {
          icon: "success",
        });
      } else {
        setLoading(false);
        swal("Your order has been canceled!");
      }
    });
  };

  // address
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // payment
  const handleOpenPaymentModal = () => {
    setOpenPayModal(true);
  };
  const handleClosePaymentModal = () => {
    setOpenPayModal(false);
  };

  console.log(products);
  return (
    <div className="relative">
      <Fade>
        <Helmet>
          <title>UrbanUtopia | Address Edit</title>
        </Helmet>
        <div className="bg-[#C8C2BF] py-20">
          <div className="lg:w-7/12 md:w-10/12 w-[90%] mx-auto">
            <div className=" flex-col lg:flex-row-reverse">
              <div className="xl:max-w-full lg:max-w-3xl md:max-w-2xl max-w-sm flex-shrink-0 rounded-md shadow-md bg-white mx-1 md:mx-0 lg:mx-0 xl:mx-0 ">
                <div className="card-body lg:px-12 md:px-20 px-[16px] space-y-5 py-16">
                  {/* added address  */}
                  <div className="border p-5">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold">Address</h3>
                      <div>
                        {userAddressData ? (
                          <Link>
                            <Icon
                              onClick={() => handleOpenModal()}
                              icon="tabler:edit"
                              className="text-4xl text-[#4A53A1]"
                            />
                          </Link>
                        ) : (
                          <Link onClick={() => handleOpenModal()} to="">
                            <Icon
                              className="text-4xl text-[#4A53A1]"
                              icon="gala:add"
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                    {userAddressData ? (
                      <>
                        <hr className="mt-2" />
                        <div className="mt-5">
                          <div className="space-y-5">
                            <p>
                              <span className="font-medium">Name:</span>{" "}
                              {user?.name}
                            </p>
                            <p>
                              <span className="font-medium">Email:</span>{" "}
                              {user?.email}
                            </p>
                            <p>
                              <span className="font-medium">Mobile:</span>{" "}
                              {user?.phone}
                            </p>
                            <p>
                              <span className="font-medium">Address:</span>{" "}
                              {userAddressData?.address}
                            </p>
                            <p>
                              <span className="font-medium">Area:</span>{" "}
                              {userAddressData?.area}
                            </p>
                            <p>
                              <span className="font-medium">City:</span>{" "}
                              {userAddressData?.city}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/* Payment Method  */}
                  <div className="border p-5">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold">Payment Method</h3>
                      <div>
                        {/* <Link>
													<Icon
														icon='tabler:edit'
														className='text-4xl text-[#4A53A1]'
													/>
												</Link> */}
                      </div>
                    </div>
                    <hr className="my-3" />
                    <div>
                      <fieldset className="space-y-5">
                        <div className="flex justify-between items-center">
                          <li className="list-none flex lg:gap-5 gap-5 items-center">
                            <input
                              id="nagad"
                              className="peer/draft w-6 h-6"
                              type="checkbox"
                              name="status"
                              checked
                            />
                            <label
                              htmlFor="nagad"
                              className="peer-checked/draft:text-sky-500 text-xl font-medium flex items-center gap-5"
                            >
                              Cash On Delivery
                              <div className="">
                                <img
                                  src={cashOnDeliveryImg}
                                  className="w-full"
                                  alt=""
                                />
                              </div>
                            </label>
                          </li>
                          <span className="text-2xl font-medium">
                            {total} ৳
                          </span>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                  <div className="flex mt-10 gap-5 lg:mx-auto">
                    {/* <Link
											to='/orderDone'
											className='btn bg-[#0C4E67] text-white mt-4 normal-case text-[16px] px-10 h-16 rounded-none hover:bg-[#3B95B0]'
										>
											Confirm
										</Link> */}
                    <button
                      onClick={(e) => {
                        // handleOpenPaymentModal();
                        orderNow(e);
                      }}
                      disabled={loading}
                      className="btn bg-[#0C4E67] text-white mt-4 normal-case text-[16px] px-10 h-16 rounded-none hover:bg-[#3B95B0]"
                    >
                      {loading ? <Loading /> : "Order now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <DownloadMobile></DownloadMobile> */}
      </Fade>

      {openModal ? <AddressModal setOpenModal={setOpenModal} /> : <></>}

      {openPayModal ? (
        <div className="bg-black bg-opacity-70 fixed top-0 left-0 right-0 z-50 w-full p-4 h-screen">
          <div className="relative lg:w-6/12 w-10/12 mx-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 mt-10">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between lg:px-12 md:px-20 px-[20px] py-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Payment
                </h3>
                <button
                  onClick={() => handleClosePaymentModal()}
                  className="text-black hover:text-red-600 rounded-lg text-sm "
                >
                  <Icon className="text-4xl" icon="carbon:close-outline" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="py-10 bg-[#F7F7F7]">
                <img
                  src={bkashPopup}
                  className="w-6/12 mx-auto text-center shadow-lg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdedAdress;
