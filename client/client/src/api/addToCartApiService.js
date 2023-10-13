const addToCart = async () => {
    try {
      const response = await axios.post('/cart/add-to-cart', {
        userId: 'user_id_here',
        productId: 'product_id_here',
        quantity: 1,
      });
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Example function to update a cart item's quantity
  const updateCartItem = async (itemId, newQuantity) => {
    try {
      const response = await axios.put(/cart/update-cart/`${itemId}`, {
        newQuantity,
      });
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  // Example function to remove a cart item
  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.delete(/cart/remove-from-cart/`${itemId}`);
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  // Example function to get user's cart
  const getUserCart = async (userId) => {
    try {
      const response = await axios.get(/cart/user-cart/`${userId}`);
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error getting user cart:', error);
    }
  };

/*   useEffect(() => {
    // Example usage: fetch user's cart on component mount
    getUserCart('user_id_here');
  }, []);
 */