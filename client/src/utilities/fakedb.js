const addToUserAddress = (address) => {
	localStorage.setItem('userAddres', JSON.stringify(address));
};
const getToUserAddress = () => {
	let shoppingCart = {};

	//get the shopping cart from local storage
	const storedCart = localStorage.getItem('userAddres');
	if (storedCart) {
		shoppingCart = JSON.parse(storedCart);
	}

	return shoppingCart;
};

export { addToUserAddress, getToUserAddress };
