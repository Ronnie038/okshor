const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const signIn = async (userInfo) => {
	return fetch(`${apiUrl}/user/login`, {
		method: 'POST',
		headers: {
			'Content-type': 'Application/json',
		},
		body: JSON.stringify(userInfo),
		credentials: 'include',
	});
};

const userRegister = (
	userInfo,
	setError,
	Swal,
	setSuccess,
	setLoading,
	reset
) => {
	const signUp = async () => {
		try {
			setError('');
			setSuccess('');
			setLoading(true);
			const res = await fetch(`${apiUrl}/user/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/json',
				},
				body: JSON.stringify(userInfo),
			});

			const data = await res.json();
			if (!res.ok) {
				setError(data.message);
			}
			if (res.ok) {
				reset();
				setSuccess(data.message);
				Swal.fire({
					position: 'top',
					icon: 'success',
					title: 'Your account has been created',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} catch (error) {
			console.log(error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	signUp();
};

const logOut = () => {
	fetch(`${apiUrl}/user/logout`, {
		headers: {
			'Content-Type': 'Application/json',
		},
		credentials: 'include',
	})
		.then((res) => {
			if (res.ok) {
				window.open('/login', '_self');
			}
			return res.json();
		})
		.then((data) => {
			// console.log(data);
			window.open('/login', '_self');
		})
		.catch((error) => console.log(error));
};

const getProfile = () => {};

const googleLogin = () => {
	window.open(`${apiUrl}/user/google/callback`, '_self');
};
const facebookLogin = () => {
	window.open(`${apiUrl}/user/facebook/callback`, '_self');
};

export { userRegister, signIn, googleLogin, facebookLogin, getProfile, logOut };
