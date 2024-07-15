import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faUserCog,
    faQuestionCircle,
    faMoon, faArrowUp,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import "./index.scss";
import { logout } from '../../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [avatar, setAvatar] = useState([]);
    async function fetchData() {
        try {
            // Assume user object is available and has the structure user.user.avatar
            const avatar = user.user.avatar;

            // Check if avatar is null or undefined
            if (avatar) {
                setAvatar(avatar);
            } else {
                setAvatar(null); // Explicitly set avatar to null if it's null or undefined
            }

        } catch (error) {
            console.error("Error fetching data:", error);
            // Optionally handle setting avatar to null in case of an error
            setAvatar(null);
        }
    }
    useEffect(function () {
        fetchData();
    }, []);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        dispatch(logout());

        // Xóa thông tin người dùng khỏi Local Storage
        localStorage.removeItem('user');

        // Điều hướng người dùng đến trang đăng nhập
        navigate('/login');
        // Xử lý các thao tác cần thiết sau khi đăng xuất, ví dụ điều hướng trang
    };
    return (
        <div className="dropdown">
            <button className="dropdown__button" onClick={toggleDropdown}>
                <img src={avatar} alt="User Avatar" className="dropdown__avatar" /> {/* Replace with your avatar */}
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {isOpen && (
                <div className="dropdown__content">
                    <div className="dropdown__user">
                        <img src={avatar} alt="User Avatar" className="dropdown__avatar" /> {/* Replace with your avatar */}
                        <div>
                            <span>{user.user.userName}</span> <span className="badge">PRO</span>
                            <p>{user.user.gmail}</p>
                        </div>
                    </div>
                    <a href="#"><FontAwesomeIcon icon={faUserCog} /> Profile Settings </a>
                    <a href="#"><FontAwesomeIcon icon={faQuestionCircle} /> Help Center </a>
                    <a href="#"><FontAwesomeIcon icon={faMoon} /> Dark Mode </a>
                    <a href="#"><FontAwesomeIcon icon={faArrowUp} /> Upgrade Plan </a>
                    <a href="#" onClick={handleLogout} ><FontAwesomeIcon icon={faSignOutAlt} /> Sign Out </a>
                </div>
            )}
        </div>
    )
}

export default Dropdown
