import React from 'react'
import { createContext, useContext, useState } from 'react'
const ItemDataContext = createContext()

function ItemDataContextProvider({children}) {

    const [lost, setLost] = useState(true)
    const [color, setColor] = useState('Color')
    const [type, setType] = useState('Type')
    const [radius, setRadius] = useState(1000)
    const [date, setDate] = useState('')
    

    const toggleLost = () => {
        setLost(prevState => !prevState)
    }
    
  return (
    <ItemDataContext.Provider value={{lost, toggleLost, color, setColor, type, setType, radius, setRadius, date, setDate}}>
        {children}
    </ItemDataContext.Provider>
  )
}

export  {ItemDataContext, ItemDataContextProvider}