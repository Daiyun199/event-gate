import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt, faPlus, faBell } from '@fortawesome/free-solid-svg-icons';
import "./index.scss"
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div className="sidebar">
            <div className="sidebar__user">
                <img
                    src="https://via.placeholder.com/50"
                    alt="User Avatar"
                    className="sidebar__avatar"
                />
                <div>
                    <h4>Junnie</h4>
                    <p>junniehoang321@gmail.com</p>
                </div>
            </div>

            <div className="sidebar__search">
                <FontAwesomeIcon icon={faSearch} />
                <input type="text" placeholder="Search..." />
            </div>

            <nav className="sidebar__nav">
                <a href="#" className="sidebar__link">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>Event Schedule</span>
                </a>
                <Link to="/create-event" >
                    <a href="#" className="sidebar__link">
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Create Event</span>
                    </a>
                </Link >
                <a href="#" className="sidebar__link">
                    <FontAwesomeIcon icon={faBell} />
                    <span>Notifications</span>
                </a>
            </nav>
        </div>
    )
}

export default Menu
