export const initialState = JSON.parse(window.localStorage.getItem('cart')) || [];

const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case 'ADD_TO_CART': {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)
      // verificamos si el producto ya esta en el carrito
      // si esta, incrementamos la cantidad
      if (productInCartIndex >= 0) {
        const newState = structuredClone(state)
        newState[productInCartIndex].quantity += 1
        updateLocalStorage(newState)
        return newState
      }
      // si no esta, lo agregamos al carrito
      const newState = [...state, { ...actionPayload, quantity: 1 }]
      updateLocalStorage(newState)
      return newState
    }

    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload
      const newState = state.filter(item => item.id !== id)
      updateLocalStorage(newState)
      return newState
    }

    case 'CLEAR_CART': {
      window.localStorage.removeItem('cart')
      updateLocalStorage([])
      return []
    }
  }
  return state
}