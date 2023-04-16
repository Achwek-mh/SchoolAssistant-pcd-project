import { DataContext } from '../shared/DataContext'
import { useContext } from 'react'

export const useDataContext = () => {
  const context = useContext(DataContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}