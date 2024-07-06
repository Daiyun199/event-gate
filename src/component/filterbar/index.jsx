import React from 'react'
import "./index.scss"

function FilterBar() {
    return (
        <div className="filter-bar">
            <div className="filter-item">
                <label htmlFor="search-event">Search Event</label>
                <input id="search-event" type="text" placeholder="Konser Jazz" />
            </div>
            <div className="filter-item">
                <label htmlFor="club">Club</label>
                <input id="club" type="text" placeholder="FBK" />
            </div>
            <div className="filter-item">
                <label htmlFor="time">Time</label>
                <select id="time">
                    <option value="any">Any date</option>
                    {/* Add more options as needed */}
                </select>
            </div>
        </div>
    )
}

export default FilterBar
