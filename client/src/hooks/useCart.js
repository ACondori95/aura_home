import {useContext} from "react";
import {CartCotext} from "../contexts/CartContext";

// Hook personalizado para consumir el contexto del carrito
export const useCart = () => {
  const context = useContext(CartCotext);

  if (context === undefined) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }

  return context;
};
