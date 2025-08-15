export function CartItem({thumbnail, title, price, quantity, addToCart}) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>Cant: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}