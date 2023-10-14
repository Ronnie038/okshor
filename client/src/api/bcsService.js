const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const createBcsService = (
	formData,
	setLoading,
	toast,
	form,
	selectedImages
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

export { createBcsService };
