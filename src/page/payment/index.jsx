import React, { useEffect, useState } from 'react'
import "./index.scss"
import Button from '../../component/button'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import QRCode from 'qrcode';
function Payment(id) {
    const params = useParams();
    const [eventData, setEventData] = useState(null); // Initialize as null
    const [orderData, setOrderData] = useState(null); // Initialize as null
    const [userData, setUserData] = useState(null);
    const [orderDetailData, setOrderDetailData] = useState(null);
    const [qrData, setQrData] = useState(''); // State to hold QR code data
    const [showQr, setShowQr] = useState(false); // 
    const navigate = useNavigate();
    async function fetchData() {
        try {
            const orderResponse = await axios.get(`https://eventgateapi.azurewebsites.net/api/Order/byId/${params.id}`);
            const eventResponse = await axios.get(`https://eventgateapi.azurewebsites.net/api/Event/${orderResponse.data.eventID}`);
            const userReposnse = await axios.get(`https://eventgateapi.azurewebsites.net/api/User/${orderResponse.data.userID}`);
            console.log(orderResponse.data);
            console.log(eventResponse.data);
            console.log(userReposnse.data);
            console.log(orderResponse.data.orderDetails);
            setOrderDetailData(orderResponse.data.orderDetails);
            setEventData(eventResponse.data);
            setOrderData(orderResponse.data);
            setUserData(userReposnse.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    const handleCheckout = async () => {
        if (eventData && orderData && userData) {
            try {
                const qrCodes = await Promise.all(orderDetailData.map(async (ticket) => {
                    try {
                        const ticketDataResponse = await axios.get("https://eventgateapi.azurewebsites.net/api/Ticket/" + ticket.ticketID);
                        console.log('Ticket Data Response:', ticketDataResponse.data);

                        const data = {
                            Event_Name: eventData.eventName,
                            Description: eventData.content,
                            Gmail: eventData.gmailContact,
                            Location: eventData.Location,
                            paymentMethod: orderData.paymentMethod,
                            userName: userData.userName,
                            seat: `${ticketDataResponse.data.row}${ticketDataResponse.data.number}`,
                            totalPrice: ticketDataResponse.data.price,
                            Event_date: eventData.startDate
                        };

                        const canvas = document.createElement('canvas');
                        await QRCode.toCanvas(canvas, JSON.stringify(data), { errorCorrectionLevel: 'H' })
                            .then(async () => {
                                const qrCodeBase64 = canvas.toDataURL().split(',')[1]; // Lấy phần Base64 của chuỗi dataURL

                                await axios.put(`https://eventgateapi.azurewebsites.net/api/Ticket/${ticket.ticketID}/QRcode`, {
                                    QRCodeBase64: qrCodeBase64,

                                });
                                const ticketCheck = await axios.get("https://eventgateapi.azurewebsites.net/api/Ticket/" + ticket.ticketID);
                                console.log('Ticket Check:', ticketCheck.data);
                            })
                            .catch(error => {
                                console.error('Error generating QR code:', error);
                            });
                    } catch (error) {
                        console.error('Error fetching ticket data or updating QR code:', error);
                    }
                }));

                setQrData(qrCodes);
                setShowQr(true);
            } catch (error) {
                console.error('Error in handleCheckout:', error);
            }
        }
        navigate("/ticket/" + params.id);
    }

    return (
        <div className="payment-page">
            <h1>PAYMENT</h1>
            <div className="payment-page__content">
                <div className="payment-page__details">
                    <h2>Transaction Detail</h2>
                    <div className="table-container">
                        <table>
                            <tbody>
                                {eventData && orderData && userData && (
                                    <>
                                        <tr>
                                            <td>Event Name</td>
                                            <td>{eventData.eventName}</td>
                                        </tr>
                                        {/* <tr>
                                            <td>Price</td>
                                            <td>{orderData.totalPrice}</td>
                                        </tr> */}
                                        <tr>
                                            <td>Payment Method</td>
                                            <td>{orderData.paymentMethod}</td>
                                        </tr>
                                        <tr>
                                            <td>User Name</td>
                                            <td>{userData.userName}</td>
                                        </tr>
                                        <tr>
                                            <td>Gate</td>
                                            <td>HOJUDU2412</td>
                                        </tr>
                                        <tr>
                                            <td>Total Price</td>
                                            <td>{orderData.totalPrice}</td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="payment-page__terms">
                        <label>
                            <input type="checkbox" required />
                            By continuing, you agree to the <a href="#terms">Terms of use</a> and <a href="#privacy">Privacy Policy</a>.
                        </label>
                    </div>
                    <Button customColor="black" variant="custom2" buttonText="Checkout" onClick={handleCheckout} />
                </div>
                <div className="payment-page__qr">
                    <img src="https://toanhocbactrungnam.vn/uploads/news/2019_11/1573006985.png" alt="QR Code" />
                </div>
            </div>
        </div>
    )
}

export default Payment
