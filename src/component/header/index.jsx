import React, { useEffect, useState } from 'react'
import "./index.scss"
import { Link } from 'react-router-dom'
import Button from '../button'
import Dropdown from '../dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/features/userSlice'
function Header({ showRight, backgroundColor, position }) {

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Lấy trạng thái đăng nhập từ store
    const dispatch = useDispatch();
    const headerStyle = {
        background: backgroundColor || 'transparent',
        position: position,
    }
    const userRole = useSelector((state) => state.user);
    const [role, setRole] = useState([]);
    async function fetchData() {
        try {

            // console.log(userRole.user.avatar);
            const role = userRole && userRole.user ? userRole.user.role : null;
            console.log(role);
            // Set role, default to null if not defined
            setRole(role);
            // Đảm bảo eventDetailData là mảng chứa một đối tượng
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(function () {
        fetchData();
    }, []);
    return (
        <div className='header' style={headerStyle}>
            <div className="header__left">
                <Link to="/">
                    <img
                        src='https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.15752-9/446045608_2189961618037846_5238267145574346834_n.png?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHQVF3QQbh2AjEcHW3NaUxvhiG1Y6omHtCGIbVjqiYe0FSBvSxX5WJnJdtOg_7DJ8JjcfGJBYcy_AuGBdAIMutc&_nc_ohc=yVbEEML6oIkQ7kNvgG08BmA&_nc_ht=scontent.fsgn19-1.fna&oh=03_Q7cD1QFu_HIRpSnjbNXTmklfXYJy-vcsQSGZEZtP9YN25SHaKw&oe=6690B5D6'
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
                                    <Link to="/schedule">Schedule</Link>
                                </li>
                                <li>
                                    <Link to="/ticket">Ticket</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        {!isLoggedIn && (
                            <li>
                                <Link to="/login">
                                    <Button variant='custom' buttonText='Login' />
                                </Link>
                            </li>
                        )}
                        {!isLoggedIn && (
                            <li>
                                <Link to="/sign_up">
                                    <Button variant='custom' buttonText='Sign Up' />
                                </Link>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li>
                                <Dropdown />
                            </li>
                        )}
                        {/* {isLoggedIn && (
                            <li>
                                <Button variant='custom' buttonText='Logout' onClick={handleLogout} />
                            </li>
                        )} */}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Header
