import { createContext, useReducer } from 'react'
export const DataContext = createContext()

export const DataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_Data': 
      return {
        Data: action.payload
      }
    case 'CREATE_Data':
      return {
        Data: [action.payload, ...state.Data]
      }
    case 'DELETE_Data':
      return {
        Data: state.Data.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, {
    Data: null
  })

  return (
    <DataContext.Provider value={{...state, dispatch}}>
      { children }
    </DataContext.Provider>
  )
}
