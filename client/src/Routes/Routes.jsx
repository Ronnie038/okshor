import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import SingleProductDetails from "../Pages/SingleProductDetails/SingleProductDetails";
import JobCircular from "../Pages/JobCircular/JobCircular";
import BcsCategory from "../Pages/BcsCategory/BcsCategory";
import SingleNewsDetails from "../Pages/NewsBd/SingleNewsDetails/SingleNewsDetails";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import AllNews from "../Pages/NewsBd/AllNews/AllNews";
// import OrderDetails from "../components/OrderDetails/OrderDetails";
import UpdateOrder from "../pages/Dashboard/Orders/UpdateOrder";
import SingleVideoNews from "../Pages/NewsBd/VideosNews/SingleVideoNews/SingleVideoNews";
import AllVideosNews from "../Pages/NewsBd/VideosNews/AllVideosNews/AllVideosNews";
import Cart from "../Pages/Cart/Cart";
// import ProductPurchaseSection from "../Pages/Cart/ProuductPurchaseSection/ProudctPurchaseSection";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import DashboardDetails from "../Pages/Dashboard/DashboardDetails";
import Orders from "../Pages/Dashboard/Orders/Orders";
// import AddCategory from "../pages/Dashboard/Category/AddCategory";
import Delivery from "../pages/Dashboard/Delivery";
import AddProducts from "../pages/Dashboard/Products/AddProducts";
import ContactDetails from "../pages/Dashboard/ContactDetails";
import Products from "../pages/Dashboard/Products/Products";
import Faq from "../pages/Dashboard/Faq";
import UpdateProduct from "../pages/Dashboard/Products/UpdateProduct";
import AddNews from "../Pages/Dashboard/News/AddNews/AddNews";
import AddBcsNews from "../Pages/Dashboard/BcsNews/AddBcsNews/AddBcsNews";

import PdfBooks from "../Pages/PdfBooks/PdfBooks";
// import Login from "../Auth/Login/Login";
import SignUp from "../Auth/SignUp/SignUp";
// import LoginPage from "../Auth/LoginPage/LoginPage";
// import DemoLogin from "../Auth/DemoLogin/DemoLogin";
import LoginPage from "../Auth/LoginPage/LoginPage";
import Checkout from "../Pages/Checkout/Checkout";
import AdedAdress from "../Pages/AddNewAddress/AdedAdress";
import UserProfile from "../Pages/UserProfile/UserProfile";
import OrderDone from "../Pages/OrderDone/OrderDone";
import OrderDetails from "../Components/OrderDetails/OrderDetails";
import AddPdf from "../Pages/Dashboard/AdminPdf/AddPdf/AddPdf";
import AddBanner from "../Pages/Dashboard/Banner/AddBanner";
import AdminBanners from "../Pages/Dashboard/Banner/AdminBanners";
import BcsNewses from "../Pages/Dashboard/BcsNews/BcsNewses";
import Newses from "../Pages/Dashboard/News/Newses";
import AdminPdf from "../Pages/Dashboard/AdminPdf/AdminPdf";
import UpdateNews from "../Pages/Dashboard/News/UpdateNews";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import ForgetPasswordRequest from "../Pages/ForgetPassword/ForgetPasswordRequest";
import UpdateBcsNews from "../Pages/Dashboard/BcsNews/UpdateBcs";
import SingleBcsNews from "../Pages/BcsCategory/SingleBcsNews";
// import Pdf from "../Pages/Dashboard/Pdf/Pdf";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jobcircular",
        element: <JobCircular />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/products/:_id/:name",
        element: <SingleProductDetails />,
      },
      {
        path: "/ভিডিও/:categorytitle",
        element: <AllVideosNews />,
      },
      {
        path: "/ভিডিও/:title/:_id",
        element: <SingleVideoNews />,
      },

      {
        path: "খবর/:categorytitle",
        element: <AllNews />,
      },
      {
        path: "খবর/:title/:_id",
        element: <SingleNewsDetails />,
      },
      {
        path: "/bcs/:category",
        element: <BcsCategory />,
      },
      {
        path: "singleBcsNews/:id",
        element: <SingleBcsNews />,
      },
      {
        path: "/বই-সমাবেশ",
        element: <PdfBooks />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "userProfile",
        element: <UserProfile />,
      },
      {
        path: "orderDone",
        element: <OrderDone />,
      },

      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/Signup",
        element: <SignUp />,
      },
      {
        path: "/user/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/user/forgetPasswordRequest",
        element: <ForgetPasswordRequest />,
      },
      {
        path: "/adedAddress",
        element: <AdedAdress></AdedAdress>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,

    children: [
      {
        path: "",
        index: true,
        element: <DashboardDetails></DashboardDetails>,
      },
      {
        path: "dashboard",
        element: <DashboardDetails></DashboardDetails>,
      },

      {
        path: "orders",
        element: <Orders></Orders>,
      },
      {
        path: "orders/:id",
        element: <UpdateOrder></UpdateOrder>,
      },
      {
        path: "products",
        element: <Products></Products>,
      },
      {
        path: "addproducts",
        element: <AddProducts></AddProducts>,
      },
      {
        path: "updateProduct/:id",
        element: <UpdateProduct />,
      },
      {
        path: "addnews",
        element: <AddNews />,
      },
      {
        path: "allnews",
        element: <Newses />,
      },
      {
        path: "updateNews/:id",
        element: <UpdateNews />,
      },
      {
        path: "addbcsnews",
        element: <AddBcsNews />,
      },
      {
        path: "updateBcsNews/:id",
        element: <UpdateBcsNews />,
      },
      {
        path: "bcsnewses",
        element: <BcsNewses />,
      },
      {
        path: "addpdfnews",
        element: <AddPdf />,
      },
      {
        path: "adminPdf",
        element: <AdminPdf />,
      },
      {
        path: "addBanner",
        element: <AddBanner />,
      },
      {
        path: "addminBanner",
        element: <AdminBanners />,
      },
      {
        path: "delivery",
        element: <Delivery></Delivery>,
      },
      {
        path: "contact",
        element: <ContactDetails></ContactDetails>,
      },
      {
        path: "faq",
        element: <Faq></Faq>,
      },
    ],
  },
  {
    path: "order/:id",
    element: <OrderDetails />,
  },
]);

export default router;
