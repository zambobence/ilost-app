import {sumOfRadius} from "./sumOfRadius"
import {calculateDistance} from "./getDistance"

export const filterOverlaps = (itemArray, rad, coord) => {

    let extendedItemArray =  itemArray.map((e) => {
        let distance = calculateDistance(e?.loc, coord)
            return {...e, distance: distance}
    })
    return extendedItemArray.filter((e) => sumOfRadius(e.radius, rad) > e.distance)
}