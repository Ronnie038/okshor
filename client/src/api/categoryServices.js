const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const getCategoryByName = (categoryName, setFilteredCategory, setLoading) => {
	const getData = async () => {
		try {
			const res = await fetch('../../public/file2.json');
			const data = await res.json();

			const categoryData = data?.find((category) =>
				category.name?.toLowerCase().includes(categoryName?.toLowerCase())
			);
			setFilteredCategory({ ...categoryData });
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	getData();
};

const getAllCategoryService = (setCategories) => {
	const getData = async () => {
		try {
			const res = await fetch(`${apiBaseUrl}/category`);
			const data = await res.json();
			// console.log(data);
			if (res.ok) {
				setCategories(data.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	getData();
};

const createCategoryService = (categoryObj, toast, setRefetch) => {
	const create = async () => {
		try {
			const res = await fetch(`${apiBaseUrl}/category`, {
				method: 'POST',
				// headers: { 'Content-Type': 'application/json' },
				body: categoryObj,
				credentials: 'include',
			});
			const data = await res.json();
			if (res.ok) {
				setRefetch((prev) => !prev);
				toast.success('category added');
			}
		} catch (error) {
			console.log(error);
		}
	};
	create();
};

const deleteCategoryService = async (id, category, toast, setRefetch) => {
	try {
		// Construct the API endpoint URL
		const apiUrl = `${apiBaseUrl}/category/${id}`;

		// Configure the HTTP request
		const requestOptions = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(category),
		};

		// Send the DELETE request to the API
		const response = await fetch(apiUrl, requestOptions);

		// Parse the response data as JSON
		const responseData = await response.json();

		if (response.ok) {
			// If the response status is OK, trigger a data refetch and show a success message
			setRefetch((prevRefetch) => !prevRefetch);
			toast.success('Subcategory deleted successfully.');
		} else {
			// If the response status is not OK, handle the error gracefully
			throw new Error(`Failed to delete category: ${responseData.message}`);
		}
	} catch (error) {
		// Handle any network or unexpected errors
		console.error('An error occurred while deleting the subcategory:', error);
		toast.error(
			'An error occurred while deleting the subcategory. Please try again.'
		);
	}
};

export {
	getCategoryByName,
	getAllCategoryService,
	createCategoryService,
	deleteCategoryService,
};
