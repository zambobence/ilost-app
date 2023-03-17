import React from 'react'
import { useContext } from 'react'
import LostToggler from './LostToggler'
import { colorArray, typeArray } from '../data/itemColorType'
import { ItemDataContext } from '../context/ItemDataContext'


function DefaultForm() {
    const {color, setColor, type, setType, radius, setRadius, date, setDate} = useContext(ItemDataContext)

    return (
        <div>
            <div className='input-cont'>
                <label htmlFor='color'>Color</label>
                <select name='color' value={color} onChange={(e)=> setColor(e.target.value)}>
                    {colorArray.map((color, index) => <option key={index} value={color}>{color}</option>)}
                </select>
            </div>
            <div className='input-cont'>
                <label htmlFor='type'>Type</label>
                <select name='type' value={type} onChange={(e)=> setType(e.target.value)}>
                    {typeArray.map((type, index) => <option key={index} value={type}>{type}</option>)}
                </select>
            </div>
            <div className='input-cont'>
                <label htmlFor='radius'>Radius</label>
                    <input name='radius' type='range' min='500' max='10000' step='100' value={Number(radius)} onChange={(e) => setRadius(Number(e.target.value))}/>
                <span>{Number(radius/1000).toFixed(2)} km</span>
            </div>
            <div className='input-cont'>
                <label htmlFor='date'>Date</label>
                <input type='date' name='date' value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
        </div>
  )
}

export default DefaultForm