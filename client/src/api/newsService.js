const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const createNewsService = (
	formData,
	setLoading,
	toast,
	form,
	selectedImages,
	setMainDescription
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
				setMainDescription('');
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

const updateNewsService = (id, formData, setLoading, toast) => {
	const update = async () => {
		try {
			let res = await fetch(`${apiUrl}/news/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'Application/json',
				},
				credentials: 'include',
				body: formData,
			});

			if (res.ok) {
				toast.success('news updated');
			}
			const data = await res.json();

			console.log(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	update();
};

const getSingeNewsService = async (id, setNews, setMainDesc) => {
	try {
		const res = await fetch(`${apiUrl}/news/${id}`);
		const data = await res.json();
		if (res.ok) {
			setNews(data.data);
			setMainDesc(data.data?.mainDescription);
		} else {
			console.log(data.message);
		}
	} catch (error) {
		console.log(error);
	}
};
export { createNewsService, updateNewsService, getSingeNewsService };
