const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const createNewsService = (
	formData,
	setLoading,
	toast,
	form,
	selectedImages
) => {
	const create = async () => {
		const dataType = typeof formData;
		// console.log({ dataType, formData });
		// return;
		try {
			let res;
			if (dataType !== 'string') {
				res = await fetch(`${apiUrl}/news`, {
					method: 'POST',
					credentials: 'include',
					body: formData,
				});
			} else {
				res = await fetch(`${apiUrl}/news`, {
					method: 'POST',
					headers: {
						'Content-Type': 'Application/json',
					},
					credentials: 'include',
					body: formData,
				});
			}
			if (res.ok) {
				toast.success('service added');
				form.reset();
				selectedImages([]);
			}
			const data = await res.json();

			console.log(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	create();
};

export { createNewsService };
