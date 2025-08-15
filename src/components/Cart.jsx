import {CartIcon, ClearCartIcon} from '../utils/Icons'
import {useId} from 'react'
import './Cart.css'
import {useCart} from '../hooks/useCart'
import { CartItem } from './CartItem'


export function Cart() {
  const cartCheckBoxId = useId()
  const {cart, clearCart, addToCart} = useCart()
  return (
    <>
      <label className='cart-button' htmlFor={cartCheckBoxId}>
        <CartIcon />
      </label>
      <input id={cartCheckBoxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>

        <button className='clear-cart-button' onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}
