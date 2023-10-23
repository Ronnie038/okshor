const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const createBcsService = (
	formData,
	setLoading,
	toast,
	form,
	selectedImages,
	setDescription
) => {
	const create = async () => {
		try {
			const res = await fetch(`${apiUrl}/bcsNews`, {
				method: 'POST',
				// headers: {
				// 	'Content-Type': 'Application/json',
				// },
				credentials: 'include',
				body: formData,
			});
			if (res.ok) {
				toast.success('service added');
				form.reset();
				setDescription('');
				selectedImages([]);
			}
			const data = await res.json();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	create();
};

const getSingleBcsService = async (id, setBcsService, setDescription) => {
	try {
		const res = await fetch(`${apiUrl}/bcsNews/${id}`);
		const data = await res.json();
		if (res.ok) {
			setDescription(data.data.description);
			setBcsService(data.data);
		}
	} catch (error) {
		console.log(error);
	}
};
const updateBcsServiceById = async (id, bcsData, toast) => {
	try {
		const res = await fetch(`${apiUrl}/bcsNews/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'Application/json',
			},
			body: JSON.stringify(bcsData),
			credentials: 'include',
		});
		const data = (await res).json();
		if (res.ok) {
			toast.success('update successfull');
		}
	} catch (error) {
		console.log(error);
	}
};

export { createBcsService, getSingleBcsService, updateBcsServiceById };
