import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faUserCog,
    faQuestionCircle,
    faMoon, faArrowUp,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import "./index.scss";
function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="dropdown">
            <button className="dropdown__button" onClick={toggleDropdown}>
                <img src="https://via.placeholder.com/30" alt="User Avatar" className="dropdown__avatar" /> {/* Replace with your avatar */}
                Crimson <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {isOpen && (
                <div className="dropdown__content">
                    <div className="dropdown__user">
                        <img src="https://via.placeholder.com/40" alt="User Avatar" className="dropdown__avatar" /> {/* Replace with your avatar */}
                        <div>
                            <span>Sardor</span> <span className="badge">PRO</span>
                            <p>sardor@mail.com</p>
                        </div>
                    </div>
                    <a href="#"><FontAwesomeIcon icon={faUserCog} /> Profile Settings </a>
                    <a href="#"><FontAwesomeIcon icon={faQuestionCircle} /> Help Center </a>
                    <a href="#"><FontAwesomeIcon icon={faMoon} /> Dark Mode </a>
                    <a href="#"><FontAwesomeIcon icon={faArrowUp} /> Upgrade Plan </a>
                    <a href="#"><FontAwesomeIcon icon={faSignOutAlt} /> Sign Out </a>
                </div>
            )}
        </div>
    )
}

export default Dropdown
