import {useState, useEffect} from 'react'
import {getProducts} from '../utils/products.jsx'
import {Products} from './Products.jsx'
import {useFilters} from '../hooks/useFilters.jsx'

// ProductLoader carga productos a traves de una API y los filtra
// utilizando el hook useFilters antes de pasarlos al componente Products
// Puede ser utilizado para mostrar un estado de carga o error
// mientras se obtienen los productos
export function ProductLoader() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { filterProducts } = useFilters()

  useEffect(() => {
    setLoading(true)
    setError(null)
    getProducts()
      .then(setProducts)
      .catch(() => setError('Error al cargar los productos'))
      .finally(() => setLoading(false))
  }, [])

  const filteredProducts = filterProducts(products)

  return (
    <>
      {loading ?
        <p>Cargando productos...</p> : 
        <Products products={filteredProducts} />
      }
      {error && <p>{error}</p>}
    </>
  )
}
