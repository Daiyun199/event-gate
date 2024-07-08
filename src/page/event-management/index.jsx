import React from 'react'
import "./index1.scss"
import Menu from '../../component/menu'
import Button from '../../component/button'
import Carousel from '../../component/carousel'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
function EventManagement() {
    return (
        <div>
            <div className="container">
                <div className="container__top">Manage Event</div>
                <div className="container__bottom">
                    <div className="container__bottom__left">
                        <Menu />
                    </div>
                    <div className="container__bottom__right">
                        <div className="container__bottom__right__top">
                            <Button variant='custom2' buttonText="All" customColor="#F5167E" width="160px" height="50px" padding="7px 2px" borderStyle="15px" />
                            <Button variant='custom2' buttonText="On Going" customColor="#9867C9" width="160px" height="50px" padding="7px 2px" borderStyle="15px" />
                            <Button variant='custom2' buttonText="Closed" customColor="#9867C9" width="160px" height="50px" padding="7px 2px" borderStyle="15px" />
                            <Button variant='custom2' buttonText="Pending" customColor="#9867C9" width="160px" height="50px" padding="7px 2px" borderStyle="15px" />
                        </div>
                        <div className="container__bottom__right__bottom">

                        </div>
                    </div>
                </div>
            </div>
            <Carousel />
        </div>
    )
}

export default EventManagement
