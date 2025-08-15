import { useContext } from "react";
import { CartContext } from "../context/cart";

export const useCart = () => {
  const context = useContext(CartContext)

  // si donde se usa el hook no hay un provider, lanzar error
  if (context === undefined){
    throw new Error('useCart debe usarse dentro de un CartProvider')
  }

  return context
}