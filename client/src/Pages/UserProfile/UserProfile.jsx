import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// import { Link } from 'react-router-dom';
// import MainLoading from '../../components/Loading/MainLoading';
import { useDispatch } from "react-redux";
// import Order from "./Order";
import toast from "react-hot-toast";
import { fetchUserProfile } from "../../store/slices/UserSlices";
import Order from "./Order";
import MainLoading from "../../Components/Loading/MainLoading";
const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const UserProfile = () => {
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);
  const { user, status } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [orders, setOrders] = useState([]);
  // const {user,status} =user
  const [image, setImage] = useState();

  const handleEditOpenModal = () => {
    setOpenEditModal(true);
  };
  const handleEditCloseModal = () => {
    setOpenEditModal(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    let formDataObj = new FormData();

    formDataObj.append("profile", JSON.stringify(data));

    if (image) {
      formDataObj.append("image", image);
    }

    // console.log(profileData);

    try {
      let response;
      if (image && image.name) {
        response = await fetch(`${apiBaseUrl}/user/${user?._id}`, {
          method: "PUT",
          body: formDataObj,
          credentials: "include",
        });
      } else {
        response = await fetch(`${apiBaseUrl}/user/${user?._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
          credentials: "include",
        });
      }

      const data = await response.json();

      if (response.ok) {
        reset();
        toast.success("Profile updated successfully");
        setOpenEditModal(false);
        dispatch(fetchUserProfile());
        // Reset form and image state or perform other actions
      } else {
        alert("Update failed");
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Error uploading data and images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfileData({ ...profileData, [name]: value });
  };

  useEffect(() => {
    fetch(`${apiBaseUrl}/order/${user?._id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.data));
  }, [status]);

  if (status === "loading") return <MainLoading />;

  return (
    <>
      <div className="container mx-auto my-10">
        <div className="flex items-center justify-center lg:flex-nowrap md:flex-wrap flex-wrap gap-16">
          <div className="">
            <div className="rounded-full h-72 w-72 overflow-hidden">
              {user.image ? (
                <img src={user?.image} alt="Image" className="w-full h-full" />
              ) : (
                <Icon icon="zondicons:user" className=" h-full w-full" />
              )}
            </div>
          </div>
          <div className="h-52 lg:block md:hidden hidden">
            <div className="border-l h-full border-gray-300 mx-4"></div>
          </div>
          <div className="space-y-5">
            <h2 className="lg:text-5xl md:text-4xl text-3xl font-bold text-[#0C4E67] flex items-center gap-5">
              {user?.name}{" "}
              <span>
                <button
                  onClick={handleEditOpenModal}
                  className="link text-blue-600 text-3xl"
                >
                  <Icon icon="bxs:edit" />
                </button>
              </span>
            </h2>
            <p className="flex items-center gap-3 lg:text-xl">
              <Icon icon="mi:email" className="text-3xl text-[#0C4E67]" />{" "}
              {user?.email}
            </p>
            <p className="flex items-center gap-3 lg:text-xl">
              <Icon
                icon="solar:phone-bold"
                className="text-3xl text-[#0C4E67]"
              />{" "}
              {user?.phone}
            </p>
          </div>
        </div>
        <div className="my-20 xl:mx-0 lg:mx-5 md:mx-5 mx-5 px-10 md:px-20">
          <h2 className="text-2xl font-bold my-3 rounded-lg px-6 py-2 text-white bg-[#3B95B0]">
            Your Orders
          </h2>
          {/* <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
						<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
							<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
								<tr>
									<th scope='col' className='px-6 py-3'>
										Order #
									</th>
									<th scope='col' className='px-6 py-3'>
										Placed On
									</th>
									<th scope='col' className='px-6 py-3'>
										Items
									</th>
									<th scope='col' className='px-6 py-3'>
										Total
									</th>
									<th scope='col' className='px-6 py-3'>
										<span className='sr-only'>Edit</span>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
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
									<td className='px-6 py-4'>290৳</td>
									<td className='px-6 py-4 text-right'>
										<a
											href='#'
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
										>
											MANAGE
										</a>
									</td>
								</tr>
								<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
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
													src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
													alt='Image'
													className='object-cover object-center h-full w-full'
												/>
											</div>
										</div>
									</td>
									<td className='px-6 py-4'>290৳</td>
									<td className='px-6 py-4 text-right'>
										<a
											href='#'
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
										>
											MANAGE
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div> */}
          <div className="">
            {orders?.map((order, index) => (
              <Order order={order} key={index} />
            ))}
          </div>
        </div>
      </div>

      {/* edit profile  */}
      {openEditModal ? (
        <div className="bg-black   bg-opacity-70 fixed top-0 left-0 right-0 z-20 w-full  p-4">
          <div className="lg:w-6/12 w-10/12 mx-auto ">
            {/* <!-- Modal content --> */}

            <Fade>
              <div className="   bg-white rounded-lg shadow-md dark:bg-gray-700 my-5">
                {/* <!-- Modal header --> */}
                <div className="flex  items-center justify-between lg:px-12 md:px-20 px-[20px] py-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Edit Porfile
                  </h3>
                  <button
                    onClick={() => handleEditCloseModal()}
                    className="text-black hover:text-red-600 rounded-lg text-sm "
                  >
                    <Icon className="text-4xl" icon="carbon:close-outline" />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="card-body lg:px-12 md:px-20 px-[20px] "
                >
                  <div className="form-control ">
                    <div className=" flex flex-col-reverse gap-5 items-center text-center justify-center">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <span className="label-text text-xl font-medium">
                          Select Your Profile Photo
                        </span>
                      </label>
                      <label
                        className="rounded-full h-22 w-22 overflow-hidden cursor-pointer border-2 border-gray-500"
                        htmlFor="large_size"
                        title="Edit Your Profile Photo"
                      >
                        {user?.image ? (
                          <img
                            src={user?.image}
                            alt=""
                            className="object-cover object-center h-[100px] w-[100px]"
                          />
                        ) : (
                          <Icon
                            className=" z-50 h-full w-full"
                            icon="zondicons:user"
                          />
                        )}
                      </label>
                      <input
                        onChange={(e) => setImage(e.target.files[0])}
                        placeholder="Your Full Name*"
                        className="hidden w-full text-xl text-gray-900 border border-gray-300 rounded-none p-3 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="large_size"
                        type="file"
                        name="image"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <label htmlFor="name" className="font-semibold w-[10%]">
                      Name :
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={user?.name}
                      onChange={handleInputChange}
                      className=" border border-black border-opacity-75 rounded outline-none py-2 px-1  w-[90%]"
                    />
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <label htmlFor="name" className="font-semibold w-[10%]">
                      Email :
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={user?.email}
                      onChange={handleInputChange}
                      className=" border border-black w-[90%] border-opacity-75 rounded outline-none py-2 px-1  flex-1"
                    />
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <label htmlFor="name" className="font-semibold w-[10%]">
                      Phone :
                    </label>
                    <input
                      type="text"
                      name="phone"
                      defaultValue={user?.phone}
                      onChange={handleInputChange}
                      className=" border w-[90%] border-black border-opacity-75 rounded outline-none py-2 px-1  flex-1"
                    />
                  </div>

                  <button
                    className="p-3 w-[89%] bg-indigo-900 text-white font-bold  uppercase ml-[11%] rounded"
                    type="submit"
                  >
                    submit
                  </button>
                </form>
              </div>
            </Fade>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserProfile;
