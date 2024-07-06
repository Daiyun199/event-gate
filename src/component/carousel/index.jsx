import React, { useEffect, useState } from 'react'

import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import "./index.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';

function Carousel() {
    const [datas, setData] = useState([]);
    async function fetchData() {
        const response = await axios.get("https://eventgateapi.azurewebsites.net/api/event");
        console.log(response.data);
        setData(response.data);
    }
    useEffect(() => {
        fetchData()
            ;
    }, []);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate(); // Gets the day of the month
        const month = monthNames[date.getMonth()]; // Gets the month (0-based, so add 1)
        const year = date.getFullYear(); // Gets the full year
        return { day, month, year };
    }

    return (

        <div className="carousel">
            {/* <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                <SwiperSlide>
                    <img src="https://i.pinimg.com/564x/68/a1/f8/68a1f8fccb15710f9bfa7186c4542db6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.pinimg.com/564x/64/10/7b/64107b75a08bb628a6b6303e19b3ed84.jpg" />
                </SwiperSlide>

            </Swiper> */}
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Autoplay, Pagination]}
                className="mySwiper"
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {datas.map((data) => {
                    const { day, month, year } = formatDate(data.startDate);
                    return (
                        <SwiperSlide key={data.eventId}>
                            <Link to={`/detail/${data.eventId}`} style={{ textDecoration: 'none', color: 'white' }}>
                                <img src={data.posterImage} />
                                <div className="event-details">
                                    <div className="event-details__left">
                                        <div className="event-details__left__top">
                                            {`${month}`}
                                        </div>
                                        <div className="event-details__left__bot">
                                            {`${day}`}
                                        </div>
                                    </div>
                                    <div className="event-details__right">
                                        <div className="event-details__right__top">{data.eventName}</div>
                                        <div className="event-details__right__bot">{data.content}</div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
}

export default Carousel
