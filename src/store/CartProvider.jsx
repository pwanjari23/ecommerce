import React, { useState, useEffect, useContext } from 'react';
import CartContext from './cart-context';
import AuthContext from './auth-context';

// Fresh CrudCrud API unique endpoint (expires in 24 hours)
const CRUDCRUD_BASE_URL = 'https://crudcrud.com/api/848fc77a84484a39b184e522a7fc3048';

// Decode Firebase JWT token to retrieve the logged-in user's email
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// Clean email to conform to CrudCrud URL requirements (removing @ and .)
const getCleanedEmail = (token) => {
  if (!token) return '';
  const decoded = parseJwt(token);
  const email = decoded ? decoded.email : '';
  return email.replace(/[@.]/g, '');
};

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const authCtx = useContext(AuthContext);

  // Fetch cart items from CrudCrud on login/startup
  useEffect(() => {
    const cleanedEmail = getCleanedEmail(authCtx.token);

    if (cleanedEmail) {
      const fetchCartItems = async () => {
        try {
          const response = await fetch(`${CRUDCRUD_BASE_URL}/cart${cleanedEmail}`);
          if (response.ok) {
            const data = await response.json();
            
            // Merge items with the same title, accumulating quantity and original CrudCrud _ids
            const merged = [];
            data.forEach((fetchedItem) => {
              const existing = merged.find((item) => item.title === fetchedItem.title);
              if (existing) {
                existing.quantity += fetchedItem.quantity;
                existing._ids.push(fetchedItem._id);
              } else {
                merged.push({
                  id: fetchedItem.id,
                  title: fetchedItem.title,
                  price: fetchedItem.price,
                  imageUrl: fetchedItem.imageUrl,
                  quantity: fetchedItem.quantity,
                  _ids: [fetchedItem._id]
                });
              }
            });
            
            setItems(merged);
          }
        } catch (err) {
          console.error('Error fetching cart from crudcrud:', err);
        }
      };

      fetchCartItems();
    } else {
      // Clear cart items from local state when user logs out
      setItems([]);
    }
  }, [authCtx.token]);

  const addItemToCartHandler = async (item) => {
    // Update local state instantly for positive UX
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.title === item.title);
      const existingItem = prevItems[existingItemIndex];
      let updatedItems;

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = prevItems.concat({ ...item, quantity: 1, _ids: [] });
      }

      return updatedItems;
    });

    // Persist to CrudCrud if logged in
    const cleanedEmail = getCleanedEmail(authCtx.token);
    if (cleanedEmail) {
      try {
        const response = await fetch(`${CRUDCRUD_BASE_URL}/cart${cleanedEmail}`, {
          method: 'POST',
          body: JSON.stringify({
            id: item.id,
            title: item.title,
            price: item.price,
            imageUrl: item.imageUrl,
            quantity: 1
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        // Save generated document _id locally to allow deletions later
        if (response.ok && data && data._id) {
          setItems((prevItems) => {
            const index = prevItems.findIndex((i) => i.title === item.title);
            if (index > -1) {
              const updatedItems = [...prevItems];
              const existingIds = updatedItems[index]._ids || [];
              updatedItems[index] = {
                ...updatedItems[index],
                _ids: [...existingIds, data._id]
              };
              return updatedItems;
            }
            return prevItems;
          });
        }
      } catch (err) {
        console.error('Error saving item to crudcrud:', err);
      }
    }
  };

  const removeItemFromCartHandler = async (title) => {
    const itemToRemove = items.find((item) => item.title === title);

    // Update local state instantly
    setItems((prevItems) => {
      return prevItems.filter((item) => item.title !== title);
    });

    // Delete documents from CrudCrud
    const cleanedEmail = getCleanedEmail(authCtx.token);
    if (cleanedEmail && itemToRemove && itemToRemove._ids) {
      for (const id of itemToRemove._ids) {
        try {
          await fetch(`${CRUDCRUD_BASE_URL}/cart${cleanedEmail}/${id}`, {
            method: 'DELETE'
          });
        } catch (err) {
          console.error('Error deleting item from crudcrud:', err);
        }
      }
    }
  };

  const clearCartHandler = async () => {
    const itemsToClear = [...items];

    // Clear local state
    setItems([]);

    // Delete all cart documents in CrudCrud
    const cleanedEmail = getCleanedEmail(authCtx.token);
    if (cleanedEmail) {
      for (const item of itemsToClear) {
        if (item._ids) {
          for (const id of item._ids) {
            try {
              await fetch(`${CRUDCRUD_BASE_URL}/cart${cleanedEmail}/${id}`, {
                method: 'DELETE'
              });
            } catch (err) {
              console.error('Error clearing cart items from crudcrud:', err);
            }
          }
        }
      }
    }
  };

  const cartContext = {
    items: items,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
