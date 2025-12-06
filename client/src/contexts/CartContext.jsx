import {createContext, useCallback, useEffect, useMemo, useState} from "react";
import {toast} from "react-toastify";

// 1. Crear el Contexto
export const CartCotext = createContext();

// Clave para localStorage
const STORAGE_KEY = "aura_home_cart";

// 2. Crear el Proveedor del Contexto
export const CartProvider = ({children}) => {
  // Inicializar el estado de forma perezosa desde localStorage
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    try {
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return [];
    }
  });

  // 3. Efecto para persistir el carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // 4. Funciones de Manipulación del Carrito (usando useCallback para memorización)

  // AÑADIR UN ITEM AL CARRITO
  const addItem = useCallback((product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex > -1) {
        // Si el producto ya existe, actualizamos la cantidad
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;

        // Limitar por stock
        if (newQuantity > product.stock) {
          toast.error(`Stock máximo alcanzado para ${product.name}`);
          return prevItems;
        }

        updatedItems[existingItemIndex].quantity = newQuantity;
        toast.success(`${quantity} x ${product.name} añadido al carrito.`);
        return updatedItems;
      } else {
        // Si es un producto nuevo, lo añadimos
        const newItem = {...product, quantity: quantity};
        toast.success(`${product.name} añadido al carrito.`);
        return [...prevItems, newItem];
      }
    });
  }, []);

  // ELIMINAR UN ITEM DEL CARRITO
  const removeItem = useCallback((productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item._id === productId);
      if (itemToRemove) {
        toast.info(`${itemToRemove.name} eliminado del carrito.`);
      }
      return prevItems.filter((item) => item._id !== productId);
    });
  }, []);

  // ACTUALIZAR LA CANTIDAD DE UN ITEM
  const updateQuantity = useCallback(
    (productId, newQuantity) => {
      if (newQuantity <= 0) {
        return removeItem(productId);
      }

      setCartItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item._id === productId ? {...item, quantity: newQuantity} : item
        );
        return updatedItems;
      });
    },
    [removeItem]
  );

  // VACIAR EL CARRITO
  const clearCart = useCallback(() => {
    setCartItems([]);
    toast.info("El carrito ha sido vaciado.");
  }, []);

  // 5. Cálculos derivados (usando useMemo)
  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  // 6. Memorizar el valor del contexto
  const contextValue = useMemo(
    () => ({
      cartItems,
      totalItems,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isCartEmpty: cartItems.length === 0,
    }),
    [
      cartItems,
      totalItems,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ]
  );

  return (
    <CartCotext.Provider value={contextValue}>{children}</CartCotext.Provider>
  );
};
