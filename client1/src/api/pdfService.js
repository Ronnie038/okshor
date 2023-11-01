const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const createPdfService = async (
	formDataObj,
	setLoading,
	toast,
	form,
	setSelectedPdf
) => {
	try {
		const res = await fetch(`${apiUrl}/pdf`, {
			method: 'POST',
			body: formDataObj,
			credentials: 'include',
		});
		if (!res.ok) {
			toast.error('pdf upload faild');
		} else {
			toast.success('pdf uploaded');
			form.reset();
			setSelectedPdf([]);
		}
	} catch (error) {
		console.log(error.message);
	} finally {
		setLoading(false);
	}
};

export { createPdfService };
