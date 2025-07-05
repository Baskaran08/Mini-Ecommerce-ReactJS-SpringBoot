// CartContext.js
import { createContext, useState } from "react";

// Create the context
export const CartContext = createContext();

// Create a Provider component
export const CartProvider = ({ children }) => {
  const [AllCartItems, setAllCartItems] = useState([]); // shared cart state

  return (
    <CartContext.Provider value={{ AllCartItems, setAllCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
