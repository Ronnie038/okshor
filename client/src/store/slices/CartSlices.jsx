import { createSlice } from '@reduxjs/toolkit';

// Constants
const DELIVERY_COST = 100;

// Retrieve cart data from localStorage
const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

// Helper function to calculate subtotal and total
const calculateSubTotalAndTotal = (cart) => {
	const subTotal = cart.reduce((total, item) => {
		if (item.offerPrice) {
			return total + item.offerPrice * item.quantity;
		}
		return total + item.regularPrice * item.quantity;
	}, 0);
	const total = subTotal + subTotal * 0.05 + DELIVERY_COST;
	return { total, subTotal };
};

// Create a cart slice
const cartSlice = createSlice({
	name: 'cartItems',
	initialState: {
		cart: initialCart,
		...calculateSubTotalAndTotal(initialCart),
	},
	reducers: {
		addToCart(state, action) {
			const data = { ...action.payload };
			const existingItemIndex = state.cart.findIndex(
				(item) => item._id === data._id
			);

			if (existingItemIndex === -1) {
				// Item does not exist in the cart, add it
				data.quantity = 1;
				data.price = data.offerPrice ? data.offerPrice : data.regularPrice;
				state.cart.push(data);
			} else {
				// Item already exists in the cart, update quantity
				state.cart[existingItemIndex].quantity += 1;
			}

			// Update localStorage and totals
			localStorage.setItem('cart', JSON.stringify(state.cart));
			const { subTotal, total } = calculateSubTotalAndTotal(state.cart);
			state.subTotal = subTotal;
			state.total = total;
		},
		removeAll(state) {
			// Remove all items from the cart
			state.cart = [];
			localStorage.removeItem('cart');

			// Reset totals
			state.subTotal = 0;
			state.total = 0;
		},
		removeSingleItem(state, action) {
			const itemIdToRemove = action.payload;
			state.cart = state.cart.filter((item) => item._id !== itemIdToRemove);

			// Update localStorage and totals
			localStorage.setItem('cart', JSON.stringify(state.cart));
			const { subTotal, total } = calculateSubTotalAndTotal(state.cart);
			state.subTotal = subTotal;
			state.total = total;
		},
		updateQuantity(state, action) {
			const { id, quantity } = action.payload;
			const itemToUpdate = state.cart.find((item) => item._id === id);

			if (itemToUpdate) {
				itemToUpdate.quantity = quantity;

				// Update localStorage and totals
				localStorage.setItem('cart', JSON.stringify(state.cart));

				const { subTotal, total } = calculateSubTotalAndTotal(state.cart);
				state.subTotal = subTotal;
				state.total = total;
			}
		},
	},
});

export const { addToCart, removeSingleItem, removeAll, updateQuantity } =
	cartSlice.actions;

export default cartSlice.reducer;
