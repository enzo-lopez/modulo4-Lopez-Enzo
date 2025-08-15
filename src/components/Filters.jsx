import { useFilters } from '../hooks/useFilters'
import './Filters.css'
export function Filters() {
	const { filters, setFilters } = useFilters() // estado global

	const handleChangeMinPrice = (event) => {
		setFilters(prevState => ({
			...prevState,
			minPrice: event.target.value,
		}))
	}

	const handleChangeCategory = (event) => {
		setFilters(prevState => ({
			...prevState,
			category: event.target.value
		}))
	}

	return (
		<section className='filters'>

			<div>
				<label htmlFor='price'>Precio</label>
				<input
					type="range"
					id='price'
					min='0'
					max='2000'
					onChange={handleChangeMinPrice}
					value={filters.minPrice}
				/>
				<span>${filters.minPrice}</span>
			</div>

			<div>
				<label htmlFor='category'>Categoría</label>
				<select id='category' onChange={handleChangeCategory}>
					<option value="all">Todas</option>
					<option value="beauty">Belleza</option>
					<option value="furniture">Muebles</option>
					<option value="groceries">Comida</option>
					<option value="kitchen-accessories">Cocina</option>
					<option value="mens-shirts">Remeras</option>
					<option value="laptops">Laptops</option>
				</select>
			</div>

		</section>
	)
}