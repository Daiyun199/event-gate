import React, { useEffect, useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import Button from '../button';
import Dropdown from '../dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/userSlice';

function Header({ showRight, backgroundColor, position }) {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userRole = useSelector((state) => state.user?.user?.role);
    const dispatch = useDispatch();
    const headerStyle = {
        background: backgroundColor || 'transparent',
        position: position,
    };

    const [role, setRole] = useState(userRole);

    useEffect(() => {
        console.log(userRole);
        if (userRole) {
            setRole(userRole);
        }
    }, [userRole]);

    return (
        <div className="header" style={headerStyle}>
            <div className="header__left">
                <Link to="/">
                    <img
                        src="https://i.imgur.com/JdSEEbB.png"
                        alt="Logo"
                    />
                </Link>
            </div>
            {showRight && (
                <div className="header__right">
                    <ul>
                        {role === 'Staff' ? (
                            <>
                                <li>
                                    <Link to="/event-management">Manage Event</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/ticket">Ticket</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        {!isLoggedIn ? (
                            <>
                                <li>
                                    <Link to="/login">
                                        <Button variant="custom" buttonText="Login" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/sign_up">
                                        <Button variant="custom" buttonText="Sign Up" />
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Dropdown />
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Header;