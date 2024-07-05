import React from 'react'
import "./index.scss"
import { Link } from 'react-router-dom'
import Button from '../button'
import Dropdown from '../dropdown'
function Header({ showRight, backgroundColor, position }) {

    const headerStyle = {
        background: backgroundColor || 'transparent',
        position: position,

    }
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
                        <li>
                            <Link to>Schedule </Link>
                        </li>
                        <li>
                            <Link to >Ticket</Link>
                        </li>
                        <li>
                            <Link to>Contact</Link>
                        </li>
                        <li>
                            <Link to="/login">
                                <Button variant='custom' buttonText='Login' />
                            </Link>
                            {/* <Dropdown /> */}
                        </li>
                        <li>
                            <Link to="/sign_up">
                                <Button variant='custom' buttonText='Sign Up' />
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Header
