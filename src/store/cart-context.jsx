import React from 'react';

const CartContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (title) => {},
  clearCart: () => {}
});

export default CartContext;
