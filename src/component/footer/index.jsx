import React from 'react'
import "./index.scss"
import {
    FacebookOutlined,
    TwitterOutlined,
    LinkedinOutlined
} from '@ant-design/icons';
function Footer() {
    return (
        <div className='footer'>
            <div className="wrapper">
                <div className="footer__section__corner">
                    <div className="footer__section__corner__logo">
                        <img
                            src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.15752-9/446045608_2189961618037846_5238267145574346834_n.png?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHQVF3QQbh2AjEcHW3NaUxvhiG1Y6omHtCGIbVjqiYe0FSBvSxX5WJnJdtOg_7DJ8JjcfGJBYcy_AuGBdAIMutc&_nc_ohc=yVbEEML6oIkQ7kNvgG08BmA&_nc_ht=scontent.fsgn19-1.fna&oh=03_Q7cD1QFu_HIRpSnjbNXTmklfXYJy-vcsQSGZEZtP9YN25SHaKw&oe=6690B5D6"
                            alt="" />
                    </div>
                    <p>Eventick is a global self-service ticketing platform for live experiences that allows anyone to create, share, find and attend events that fuel their passions and enrich their lives.</p>
                    <div className="footer__section__corner__icon">
                        <FacebookOutlined style={{ fontSize: '30px', color: ' #ffffff' }} />
                        <TwitterOutlined style={{ fontSize: '30px', color: ' #ffffff' }} />
                        <LinkedinOutlined style={{ fontSize: '30px', color: ' #ffffff' }} />
                    </div>
                </div>
                <div className="footer__section__between">
                    <h3>Plan Events</h3>
                    <ul>
                        <li><a href="#">Create and Set Up</a></li>
                        <li><a href="#">Book Tickets</a></li>
                        <li><a href="#">Online RSVP</a></li>
                    </ul>
                </div>
                <div className="footer__section__between">
                    <h3>Eventick</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">How It Works</a></li>
                        <li><a href="#">Privacy Terms</a></li>
                    </ul>
                </div>
                <div className="footer__section__corner">
                    <h3>Stay In The Loop</h3>
                    <p>Join our mailing list to stay in the loop with our newest for event and concert.</p>
                    {/* <form className="footer__section__corner__newsletter">
                        <input className="footer__section__corner__newsletter__input" type="email" placeholder="Enter your email address" required></input>
                        <button className="footer__section__corner__newsletter__button" type="submit">Subscribe Now</button>
                    </form> */}
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyright &copy; 2022 Avi Yamash</p>
            </div>
        </div>
    )
}

export default Footer

