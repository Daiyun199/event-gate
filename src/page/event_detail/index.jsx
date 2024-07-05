/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import "./index.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../component/footer';
import Button from '../../component/button';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Detail({ role = 'customer', id }) {
    const [eventDetailData, setEventDetailData] = useState([]);
    const params = useParams();
    async function fetchData() {
        try {
            const response = await axios.get("https://eventgateapi.azurewebsites.net/api/event/" + params.id);
            console.log(response.data);
            setEventDetailData([response.data]); // Đảm bảo eventDetailData là mảng chứa một đối tượng
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }
    function handleCheck() {
        console.log(eventDetailData);
    }
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("https://6677babf0bd45250561c5a4c.mockapi.io/event_detail/1");
    //             console.log("Fetched data:", response.data);

    //             // Cập nhật state với dữ liệu mới
    //             setEventDetailData(prevData => [...prevData, response.data]); // Nếu response.data là mảng
    //             // Hoặc setEventDetailData(prevData => [...prevData, response.data]); // Nếu response.data là object
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    useEffect(function () {
        fetchData();
    }, []);
    // useEffect(() => {
    //     console.log("Updated eventDetailData:", eventDetailData);
    // }, [eventDetailData]); // Chạy khi eventDetailData thay đổi
    const eventDetails = eventDetailData.length > 0 ? eventDetailData[0] : { event_name: 'Loading...', location: 'Loading...', date_time: 'Loading...' };
    return (
        <div>
            <div className="event-card">
                <div className="event-card__info">
                    {/* Kiểm tra xem eventDetailData có dữ liệu hay không */}
                    {eventDetailData.length > 0 ? (
                        <>
                            <h1>{eventDetailData[0]?.eventName}</h1> {/* Sử dụng Optional Chaining để truy cập thuộc tính */}
                            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {eventDetailData[0]?.location} &nbsp; | &nbsp; <FontAwesomeIcon icon={faCalendarAlt} /> {eventDetailData[0]?.date_time}</p>
                            <p><strong>Event Type:</strong> {eventDetailData[0].eventTypeName}</p>
                            <p><strong>Club:</strong>{eventDetailData[0].clubName} </p>
                            <p><strong>Description:</strong>{eventDetailData[0].content}</p>
                            <p><strong>Link Stream:</strong> <a href="https://www.facebook.com/">{eventDetailData[0].linkStream}</a></p>

                            <div className="event-card__buttons">
                                <div>
                                    <p><strong>Price:</strong>{eventDetailData[0].price} $</p>
                                </div>
                                <div>
                                    {role === 'admin' ? (
                                        <>
                                            <Button className="delete-button" variant='custom2' buttonText="Delete" customColor="black" />
                                            <Button className="edit-button" variant='custom2' buttonText={`\u00A0Edit\u00A0`} customColor="black" />
                                        </>
                                    ) : (
                                        <Link to="/buying-ticket">
                                            <Button className="book-ticket-button" variant='custom2' buttonText="Book Ticket" customColor="black" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <h1></h1>
                    )}
                </div>
                <div className="event-card__image">
                    {eventDetailData.length > 0 && eventDetailData[0].posterImage ? (
                        <img src={eventDetailData[0].posterImage} alt="Event Poster" />
                    ) : (
                        <p>Loading image...</p> // Hiển thị một thông báo hoặc một placeholder khi dữ liệu đang được tải
                    )}
                </div>
            </div>

        </div>

    )
}

export default Detail
