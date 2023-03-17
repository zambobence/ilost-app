import React, { useState, useEffect, useContext } from "react"
import { ItemDataContext } from "../context/ItemDataContext"
import { filterOverlaps } from "../functions/filterOverlaps"

function useFilterItems({itemArray, coordinates}) {
    const [filteredItemList, setFilteredItemList] = useState([])
    const {color, type, lost, radius} = useContext(ItemDataContext)

    const filterItems = () => {
		const allOverlappingItems = filterOverlaps(itemArray, radius, coordinates)
		const filteredOverlapppingItemsLostFound = allOverlappingItems.filter(
			(e) => e.lost === !lost
		)

		if (color !== 'Color' && type !== 'Type') {
			const filteredItemList = filteredOverlapppingItemsLostFound
				.filter((e) => e.color === color)
				.filter((e) => e.type === type)
			setFilteredItemList(filteredItemList)
		} 
		else if (color !== 'Color' && type === 'Type') {
			const filteredItemList = filteredOverlapppingItemsLostFound.filter(
				(e) => e.color === color
			)
			setFilteredItemList(filteredItemList)
		} 
		else if (type !== 'Type' && color === 'Color') {
			const filteredItemList = filteredOverlapppingItemsLostFound.filter(
				(e) => e.type === type
			)
			setFilteredItemList(filteredItemList)
		} 
		else {
			setFilteredItemList(filteredOverlapppingItemsLostFound)
		}
	}

    useEffect(() => {
        filterItems()
    }, [color, type, lost, radius, coordinates, itemArray])

    return {filteredItemList}
}


export default useFilterItems