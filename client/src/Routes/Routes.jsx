import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import Shop from '../Pages/Shop/Shop';
import SingleProductDetails from '../Pages/SingleProductDetails/SingleProductDetails';
import JobCircular from '../Pages/JobCircular/JobCircular';
import BcsCategory from '../Pages/BcsCategory/BcsCategory';
import SingleNewsDetails from '../Pages/NewsBd/SingleNewsDetails/SingleNewsDetails';
import Contact from '../Pages/Contact/Contact';
import About from '../Pages/About/About';
import AllNews from '../Pages/NewsBd/AllNews/AllNews';
// import OrderDetails from "../components/OrderDetails/OrderDetails";
import UpdateOrder from '../pages/Dashboard/Orders/UpdateOrder';
import SingleVideoNews from '../Pages/NewsBd/VideosNews/SingleVideoNews/SingleVideoNews';
import AllVideosNews from '../Pages/NewsBd/VideosNews/AllVideosNews/AllVideosNews';
import Cart from '../Pages/Cart/Cart';
import ProductPurchaseSection from '../Pages/Cart/ProuductPurchaseSection/ProudctPurchaseSection';
import Dashboard from '../Pages/Dashboard/Dashboard/Dashboard';
import DashboardDetails from '../Pages/Dashboard/DashboardDetails';
import Orders from '../Pages/Dashboard/Orders/Orders';
// import AddCategory from "../pages/Dashboard/Category/AddCategory";
import Delivery from '../pages/Dashboard/Delivery';
import AddProducts from '../pages/Dashboard/Products/AddProducts';
import ContactDetails from '../pages/Dashboard/ContactDetails';
import Products from '../pages/Dashboard/Products/Products';
import Faq from '../pages/Dashboard/Faq';
import UpdateProduct from '../pages/Dashboard/Products/UpdateProduct';
import AddNews from '../Pages/Dashboard/News/AddNews/AddNews';
import AddBcsNews from '../Pages/Dashboard/BcsNews/AddBcsNews/AddBcsNews';
import AddPdfNewses from '../Pages/Dashboard/News/PdfNews/AddPdfNewses';
import PdfBooks from '../Pages/PdfBooks/PdfBooks';
const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/jobcircular',
				element: <JobCircular />,
			},
			{
				path: '/shop',
				element: <Shop />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/contact',
				element: <Contact />,
			},

			{
				path: '/products/:_id',
				element: <SingleProductDetails />,
			},
			{
				path: '/ভিডিও/:categorytitle',
				element: <AllVideosNews />,
			},
			{
				path: '/ভিডিও/:title/:_id',
				element: <SingleVideoNews />,
			},

			{
				path: 'খবর/:categorytitle',
				element: <AllNews />,
			},
			{
				path: 'খবর/:title/:_id',
				element: <SingleNewsDetails />,
			},
			{
				path: '/bcs/:category',
				element: <BcsCategory />,
			},

			{
				path: '/বই-সমাবেশ',
				element: <PdfBooks />,
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/checkout',
				element: <ProductPurchaseSection></ProductPurchaseSection>,
			},
		],
	},
	{
		path: '/dashboard',
		element: <Dashboard></Dashboard>,

		children: [
			{
				path: '',
				index: true,
				element: <DashboardDetails></DashboardDetails>,
			},
			{
				path: 'dashboard',
				element: <DashboardDetails></DashboardDetails>,
			},

			{
				path: 'orders',
				element: <Orders></Orders>,
			},
			{
				path: 'orders/:id',
				element: <UpdateOrder></UpdateOrder>,
			},
			{
				path: 'products',
				element: <Products></Products>,
			},
			{
				path: 'addproducts',
				element: <AddProducts></AddProducts>,
			},
			{
				path: 'updateProduct/:id',
				element: <UpdateProduct />,
			},
			{
				path: 'addnews',
				element: <AddNews />,
			},
			{
				path: 'addbcsnews',
				element: <AddBcsNews />,
			},
			{
				path: 'addpdfnews',
				element: <AddPdfNewses />,
			},
			{
				path: 'delivery',
				element: <Delivery></Delivery>,
			},
			{
				path: 'contact',
				element: <ContactDetails></ContactDetails>,
			},
			{
				path: 'faq',
				element: <Faq></Faq>,
			},
		],
	},
	// {
	//   path: "order/:id",
	//   element: <OrderDetails />,
	// },
]);

export default router;
