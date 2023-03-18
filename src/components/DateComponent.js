import React from 'react'
import {format , formatDistanceToNow, } from 'date-fns'

function DateComponent({date}) { 
    
    if(date){
        const now = Date.now()
        
        if (now - date < 86400000) {
            const isoDate = formatDistanceToNow(date, { addSuffix: true })
            return <span>{isoDate}</span>
        }
        else {
            const formattedDate = format(date, 'yyyy-MM-dd')
            return (
            <p>
                <i aria-label='date' className="fa-solid fa-calendar"></i>
                {formattedDate}
            </p>
            )    
    }
    }   
}

export default DateComponent