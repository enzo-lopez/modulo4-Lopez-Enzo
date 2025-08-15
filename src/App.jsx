//import { products as initialProducts } from './mocks/products.json'
import { ProductLoader } from './components/ProductLoader.jsx'
import { Header } from './components/Header.jsx'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/cart.jsx'
import { FiltersProvider } from './context/filters.jsx'
function App() {
  
  return (
    <>
      <FiltersProvider> 
      <CartProvider>

        <Header />
        <Cart />
        <ProductLoader />
        
      </CartProvider>
      </FiltersProvider>
    </>

  )
}

export default App
