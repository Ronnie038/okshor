import React, { useEffect, useState } from 'react';
import ProductTable from '../Table/ProductTable';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const Products = () => {
	const [products, setProduct] = useState([]);
	// const {Description,category,name,new-price,quantity}=product
	const [reload, setReload] = useState(false);

	const fetchData = () => {
		fetch(`${apiUrl}/products/displayProducts`)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data.data);
				setProduct(data.data);
			});
	};
	//data fecthing
	useEffect(() => {
		fetchData();
	}, [reload]);
	return (
		<div className='w-11/12 mx-auto'>
			<p className='text-3xl my-8 font-semibold'>Products</p>
			<div className=''>
				<div className='border text-center border-green-500 rounded-lg w-[200px] py-8 px-5'>
					<p>Total products</p>
					<p className='text-4xl mt-3 font-semibold'>{products.length}</p>
				</div>
			</div>
			<div className='mt-8 md:grid-cols-2 grid-cols-1'>
				<ProductTable products={products} setReload={setReload}></ProductTable>
			</div>
		</div>
	);
};

export default Products;
