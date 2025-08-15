import {render, screen, fireEvent} from '@testing-library/react'
import {Products} from '../components/Products'
import {CartContext} from '../context/cart'
import {jest, test, expect} from '@jest/globals'
import {renderHook} from '@testing-library/react'
import {FiltersContext} from '../context/filters'
import {useFilters} from '../hooks/useFilters'

const mockProducts = [
  {id: 1, title: 'Producto 1', price: 100, thumbnail: 'img1', category: 'all'},
  {id: 2, title: 'Producto 2', price: 200, thumbnail: 'img2', category: 'laptops'},
  {id: 3, title: 'Producto 3', price: 300, thumbnail: 'img3', category: 'groceries'},
  {id: 4, title: 'Producto 4', price: 350, thumbnail: 'img4', category: 'laptops'},
  {id: 5, title: 'Producto 5', price: 80 , thumbnail: 'img5', category: 'laptops'}
]

const cartProviderMock = {
  cart: [],
  addToCart: jest.fn(),
  clearCart: jest.fn(),
  removeFromCart: jest.fn(),
}

// Valida que el componente Products
// renderice los productos recibidos por props
test('renderiza productos correctamente', () => {
  render(
    <CartContext.Provider value={cartProviderMock}>
      <Products products={mockProducts} />
    </CartContext.Provider>
  )
  expect(screen.getByText('Producto 1')).toBeInTheDocument()
  expect(screen.getByText('Producto 2')).toBeInTheDocument()
})

// Valida que al hacer click en el boton de agregar al carrito
// se llame a la función addToCart del contexto CartContext
test('agrega producto al carrito al hacer click', () => {
  render(
    <CartContext.Provider value={cartProviderMock}>
      <Products products={mockProducts} />
    </CartContext.Provider>
  )
  const botones = screen.getAllByRole('button')
  fireEvent.click(botones[0])
  expect(cartProviderMock.addToCart).toHaveBeenCalled()
})

// Valida que al hacer click en el botón de eliminar del carrito
// se llame a la función removeFromCart del contexto CartContext
test('llama a removeFromCart si el producto ya está en el carrito', () => {
  const cartProviderWithProduct = {
    ...cartProviderMock,
    cart: [{id: 1}],
    removeFromCart: jest.fn(),
  }
  render(
    <CartContext.Provider value={cartProviderWithProduct}>
      <Products products={mockProducts} />
    </CartContext.Provider>
  )
  const boton = screen.getAllByRole('button')[0]
  fireEvent.click(boton)
  expect(cartProviderWithProduct.removeFromCart).toHaveBeenCalledWith(
    mockProducts[0]
  )
})

// Valida que el hook useFilters filtre correctamente
test('filtra productos por precio mínimo y categoría', () => {
  const wrapper = ({children}) => (
    <FiltersContext.Provider
      value={{
        filters: {minPrice: 100, category: 'laptops'},
        setFilters: () => {},
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
  const {result} = renderHook(() => useFilters(), {wrapper})
  const filteredProducts = result.current.filterProducts(mockProducts)
  expect(filteredProducts).toEqual([
    {id: 2, title: 'Producto 2', price: 200, thumbnail: 'img2', category: 'laptops'},
    {id: 4, title: 'Producto 4', price: 350, thumbnail: 'img4', category: 'laptops'},
  ])
})
