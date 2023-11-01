import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import image from "../../assets/Home/book1.png";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
// import { Icon } from '@iconify/react';
import { toast } from "react-hot-toast";

import { addToCart } from "../../store/slices/CartSlices";
import { useDispatch } from "react-redux";
import { getSingleProduct } from "../../api/ProductsServices";
import SingleProduct from "../../Components/SingleProduct/SingleProduct";

const SingleProductDetails = () => {
  const user = true;
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { _id } = useParams();
  const [product, setProduct] = useState(); // Initialize products as null

  const notify = () =>
    toast.success("Your Product Added Successfull", {
      style: {
        backgroundColor: "#0C4E67",
        color: "white",
      },
      className: "bg-black",
    });
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    if (user) {
      notify();
    }
  };

  const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiBaseUrl}/products`)
      .then((res) => res.json())
      .then((data) => {
        // setFilteredProducts(data.products);
        setProducts(data.products.slice(0, 8));
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getSingleProduct(_id, setProduct, setImages);
  }, [_id]);

  return (
    <div>
      {product ? (
        <>
          <div>
            <div className="container mx-auto py-20 px-4 lg:px-0">
              <div className="lg:flex justify-center relative">
                <div className="flex flex-col lg:flex-row justify-center items-center lg:mx-5 lg:items-start gap-8 lg:gap-10 ">
                  <div className="w-full lg:w-4/12 md:w-10/12">
                    <ImageGallery
                      showPlayButton={false}
                      slideOnThumbnailOver={true}
                      showFullscreenButton={false}
                      slideDuration={400}
                      items={images}
                    />
                  </div>
                  <div className="w-full lg:w-4/12 md:w-9/12 space-y-2">
                    <h2 className="lg:text-3xl md:text-4xl text-3xl font-semibold">
                      {product.title}
                    </h2>
                    <div className="flex flex-wrap lg:gap-5 md:gap-5 gap-3 items-center">
                      <p className="text-xl font-semibold">
                        <del className="text-[#757575]">
                          {product.regularPrice}৳
                        </del>
                      </p>
                      <p className="text-2xl font-semibold">
                        <ins className="no-underline">
                          {product.offerPrice}৳
                        </ins>
                      </p>
                      <h4 className="bg-[#DE2121] px-3 py-1 text-sm text-white font-semibold text-center">
                        {product?.offerPercentage}% Off
                      </h4>
                    </div>
                    <hr />
                    <div className="space-y-4">
                      <p className="py-5">{product.description}</p>
                      <div className="flex gap-5 w-full p-1">
                        <button
                          onClick={() => {
                            handleAddToCart(product);
                          }}
                          className="border-black border w-full lg:px-8 px-4 lg:py-1 md:py-1 py-3  text-xl font-semibold"
                        >
                          Add to Cart
                        </button>
                      </div>
                      <div>
                        <Link
                          to="/cart"
                          onClick={() => handleAddToCart(product)}
                        >
                          <button className="border-black border w-full px-8 text-xl font-semibold py-3 bg-[#0C4E67] text-white">
                            Purchase
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-10/12 mx-auto">
            <div className="">
              <div className="text-center gap-1 flex items-center justify-center">
                {" "}
                <span className="h-1 w-16 inline-block bg-indigo-600"></span>
                <p className="text-2xl text-center font-bold pb-3 inline-block ">
                  Newest Products
                </p>
                <span className="h-1 w-16 inline-block bg-indigo-600"></span>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-5 mt-6">
                {products?.map((product, index) => (
                  <Link key={index} to={`/products/${product?._id}`}>
                    {" "}
                    <SingleProduct product={product}></SingleProduct>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default SingleProductDetails;
